import md5 from 'md5'
import moment from 'moment/moment.js'
import util from '#@/lib/util.js'
import mongo from '#@/lib/mongo.js'
import config from '#@/config/index.js'
import { success, fail } from '#@/lib/response.js'
import { readFile } from 'fs/promises'
import jwt from 'jsonwebtoken'

export default {
  // 初始化管理员账号
  async init(ctx) {
    // const user = {
    //   username: 'admin',
    //   password: '123123'
    // }
    // "admin123"
    // "Admin"
    //     "super123"
    //     "Super"
    // "user01123"
    // "User01"
    const user = {
      username: 'romejiang',
      password: '1qazxsw2',
      userrole: 'super'
    }

    const query = {
      username: user.username
    }
    const doc = {
      username: user.username,
      avatar: './avatar.jpg',
      userrole: user.userrole,
      password: md5(user.password + config.jwt.saltkey),
      pass: true,
      createdAt: moment().unix(),
      createdTime: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    await mongo.col('admin').updateOne(query, { $set: doc }, { upsert: true })
    success(ctx, {})
  },
  // 管理员的登录
  async signin(ctx) {
    try {
      const { username, password } = ctx.request.body
      const res = await mongo.col('admin').findOne({ username, pass: true })

      if (!res) {
        fail(ctx, '用户不存在')
        return
      }
      if (res.password !== md5(password + config.jwt.saltkey)) {
        fail(ctx, '密码错误')
        return
      }
      const session = {
        username: res.username,
        userrole: res.userrole,
        _id: res._id
      }
      success(ctx, {
        token:
          'Bearer ' + jwt.sign(session, config.jwt.secret, { expiresIn: '8d' }),
        refreshToken: '__REFRESH_TOKEN_SOYBEAN__'
      })
    } catch (e) {
      console.log(e)
      fail(ctx, '服务器错误')
    }
  },
  async getUserInfo(ctx) {
    try {
      success(ctx, ctx.state.user)
    } catch (e) {
      console.log(e)
      fail(ctx, '服务器错误')
    }
  }
}
