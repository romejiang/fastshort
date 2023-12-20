import md5 from 'md5'
import moment from 'moment/moment.js'
import mongo from '#@/lib/mongo.js'
import { success, fail, jwtoken } from '#@/lib/response.js'
import util from '#@/lib/util.js'
import config from '#@/config/index.js'
import { readFile } from 'fs/promises'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import S3 from 'aws-sdk/clients/s3.js'
import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'
import mime from 'mime-types'
import { createHash } from 'crypto'
import ffmpeg from 'fluent-ffmpeg'

const uploadS3 = async (filepath, filename) => {
  const s3 = new S3({
    endpoint: config.s3.endpoint,
    accessKeyId: config.s3.key,
    secretAccessKey: config.s3.secret,
    signatureVersion: 'v4'
  })
  const uploadParams = { Bucket: config.s3.bucket, Key: filename }
  let url = ''
  try {
    await s3.headObject(uploadParams).promise()
    url = config.s3.site + filename
  } catch (error) {
    const fileStream = fs.createReadStream(filepath)
    fileStream.on('error', function (err) {
      console.log('File Error', err)
    })
    uploadParams.Body = fileStream

    const stored = await s3.upload(uploadParams).promise()
    url = config.s3.site + stored.key
  }
  return url
}
export default {
  async index(ctx) {
    success(ctx, {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version
    })
  },
  // 上传文件，头像，视频，等等
  async upload(ctx) {
    try {
      const start = new Date().getTime()
      const exts = ['jpg', 'jpge', 'jpeg', 'png', 'webp', 'mp4']
      const { filepath, mimetype } = ctx.request.files.file
      const fileExtension = mime.extension(mimetype)
      if (!exts.includes(fileExtension)) {
        fail(ctx, '文件类型错误')
        return
      }
      console.log(filepath, fileExtension)
      // 计算文件的md5
      const buff = fs.readFileSync(filepath)
      const hash = createHash('md5').update(buff).digest('hex')

      let url = ''

      if (fileExtension == 'mp4') {
        // 视频和截图上传
        const filename = `video/${dayjs().format(
          'YYYYMMDD'
        )}/${hash}.${fileExtension}`
        ffmpeg(filepath)
          .on('end', async function () {
            const screenshotfile = `${process.cwd()}/screenshots/${hash}.png`
            await uploadS3(screenshotfile, filename + '.png')
            fs.unlinkSync(screenshotfile)
          })
          .screenshots({
            timestamps: [0],
            filename: `${hash}.png`,
            folder: './screenshots'
          })
        url = await uploadS3(filepath, filename)
      } else {
        // 头像或者图片上传
        const filename = `avatar/${dayjs().format(
          'YYYYMMDD'
        )}/${hash}.${fileExtension}`
        url = await uploadS3(filepath, filename)
      }
      success(ctx, {
        url,
        key: hash
      })
    } catch (error) {
      console.log(error)
      fail(ctx, error.message)
    }
  },
  // 注册匿名用户
  async anonymous(ctx) {
    try {
      const username = 'Visitor' + util.randomString(4, 3)
      const password = 'iloveshorttv'
      const passwordHash = md5(password + config.jwt.saltkey)
      const document = {
        username,
        password: passwordHash,
        avatar: '/static/avatar.jpg',
        pass: true,
        guestname: username,
        guest: true,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      }
      const ret = await mongo.col('user').insertOne(document)
      const data = {
        token: jwt.sign({ _id: ret.insertedId, username }, config.jwt.secret, {
          expiresIn: '365d'
        }),
        user: document
      }

      success(ctx, data)
    } catch (err) {
      console.log(err.message)
      fail(ctx, 'Server error')
    }
  },
  // 用户注册
  async register(ctx) {
    try {
      const { username, password, repassword, mobile, _id } = ctx.request.body

      const user = await mongo.col('user').findOne({ username })

      if (user && user.username === username) {
        fail(ctx, 'The username already exists')
        return
      }
      if (password != repassword) {
        fail(ctx, 'Password and repassword are not the same')
        return
      }

      const passwordHash = md5(password + config.jwt.saltkey)
      const document = {
        username,
        password: passwordHash,
        avatar: '/static/avatar.jpg',
        guest: false,
        pass: true,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      }
      const ret = await mongo
        .col('user')
        .updateOne(
          { _id: new ObjectId(_id) },
          { $set: document },
          { upsert: true }
        )

      const userid = ret.upsertedId || _id
      document['_id'] = userid

      jwtoken(ctx, document)
    } catch (err) {
      console.log(err.message)
      fail(ctx, 'Server error')
    }
  },

  // 用户登录
  async login(ctx) {
    try {
      const { username, password } = ctx.request.body
      // console.log('/login', username, password)
      const res = await mongo.col('user').findOne({ username, pass: true })

      if (!res) {
        fail(ctx, 'The user does not exist')
        return
      }
      if (res.password !== md5(password + config.jwt.saltkey)) {
        fail(ctx, 'Wrong password')
        return
      }
      delete res.password

      jwtoken(ctx, res)
    } catch (e) {
      console.log(e)
      fail(ctx, 'Server error')
    }
  },
  // 首页推荐内容
  async home(ctx) {
    const recommend = await mongo
      .col('series')
      .find()
      // .find({
      //   recommend: {
      //     $gt: 0
      //   }
      // })
      // .sort({ recommend: -1 })
      .limit(10)
      .toArray()

    const category = await mongo
      .col('category')
      .find({
        pass: true
      })
      .toArray()
    const categorys = []
    for (const cat of category) {
      const series = await mongo
        .col('series')
        .find({
          category: cat._id.toString()
        })
        .limit(10)
        .toArray()
      if (series.length > 0) {
        categorys.push({
          name: cat.name,
          series
        })
      }
    }

    const release = await mongo
      .col('series')
      .find({
        pass: true
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray()
    const data = { recommend, categorys, release }
    success(ctx, data)
  },

  // 随机短视频
  async short(ctx) {
    const episodes = await mongo
      .col('episode')
      .aggregate([
        {
          $match: {
            // series: '656f41e0830eeb0eb93471b5'  // Oppenheimer
            // series: '6571a29ba21c5f2d89cf2d99',
            'video.0': { $exists: true },
            'cover.0': { $exists: true }
          }
        },
        {
          $limit: 10
        },
        {
          $lookup: {
            from: 'like',
            localField: 'series',
            foreignField: 'series',
            as: 'likeList',
            pipeline: [
              { $match: { user: { $eq: '65731d824b4efadf4b82a93d' } } }
            ]
          }
        },
        {
          $addFields: {
            isLike: { $toBool: { $size: '$likeList' } }
          }
        },
        // { $addFields: { video: { $first: '$video' } } },
        // { $addFields: { cover: { $first: '$cover' } } },
        {
          $project: {
            likeList: 0
          }
        }
      ])
      .toArray()

    try {
      success(ctx, episodes)
    } catch (error) {
      fail(ctx, 'Server error')
    }
  },
  // 获取某一个剧集的所有信息
  // TODO 某些没付款的信息不能返回。
  async series(ctx) {
    const { id } = ctx.request.body

    const episodes = await mongo
      .col('episode')
      .find({
        series: id
      })
      .sort({ episode: 1 })
      .toArray()

    try {
      success(ctx, episodes)
    } catch (error) {
      fail(ctx, 'Server error')
    }
  }
}
