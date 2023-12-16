import mongo from '#@/lib/mongo.js'
import { success, fail, jwtoken } from '#@/lib/response.js'
import { MiniProgram } from 'wechat-jssdk'
import config from '#@/config/index.js'
import { ObjectId } from 'mongodb'

export default {
  // 微信小程序的登录
  async wechatmp(ctx, next) {
    const { code } = ctx.request.body
    let { _id } = ctx.query
    const type = 'wechatmp'

    //手动实例化 MiniProgram
    const miniProgram = new MiniProgram({
      miniProgram: {
        appId: config.mp.appId,
        appSecret: config.mp.appSecret
      }
    })
    const session = await miniProgram.getSession(code)
    if (!session) {
      fail(ctx, '微信登陆失败')
      return
    }

    if (_id) {
      // 有匿名用户，就绑定
      console.log('有匿名用户，就绑定', type, _id)

      session['user'] = _id
      session['type'] = type

      await mongo.col('oauth').updateOne(
        {
          user: _id,
          type,
          openid: session.openid
        },
        { $set: session },
        { upsert: true }
      )
    } else {
      // 没有匿名用户，就查询 & 登录
      const isOAuth = await mongo
        .col('oauth')
        .findOne({ type, openid: session.openid })
      if (isOAuth) {
        _id = isOAuth.user
        console.log('没有匿名用户，就查询 & 登录', type, _id)
      } else {
        // 登录信息都没有，就注册
        const newUser = await mongo.col('user').insertOne({
          username: '微信用户',
          avatar: '/static/avatar.jpg',
          guest: false,
          pass: true,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime()
        })
        _id = newUser.insertedId
        session['user'] = _id
        session['type'] = type
        await mongo.col('oauth').insertOne(session)
        console.log('登录信息没有，就注册', type, _id)
      }
    }
    // 将openid和用户绑定，然后登录
    const ret = await mongo
      .col('user')
      .findOneAndUpdate(
        { _id: new ObjectId(_id) },
        { $set: { openid: session['openid'], guest: false } },
        { returnDocument: 'after', returnNewDocument: true }
      )
    user = ret.value

    jwtoken(ctx, user)
  },
  // 谷歌登录
  async google(ctx) {
    try {
      let { _id } = ctx.query
      const session = ctx.request.body
      const type = 'google'

      if (!session.openid) {
        fail(ctx, 'Parameter error')
        return
      }

      if (_id) {
        // 有匿名用户，就绑定
        console.log('有匿名用户，就绑定', type, _id)
        const query = {
          user: _id,
          type,
          openid: session.openid
        }

        session['user'] = _id
        session['type'] = type

        await mongo
          .col('oauth')
          .updateOne(query, { $set: session }, { upsert: true })
      } else {
        // 没有匿名用户，就查询 & 登录
        const isOAuth = await mongo
          .col('oauth')
          .findOne({ type, openid: session.openid })
        if (isOAuth) {
          _id = isOAuth.user
          console.log('没有匿名用户，就查询 & 登录', type, _id)
        } else {
          // 登录信息没有，就注册
          const newUser = await mongo.col('user').insertOne({
            username: session.nickname,
            avatar: session.headimgurl,
            guest: false,
            pass: true,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
          })
          _id = newUser.insertedId
          session['user'] = _id
          session['type'] = type
          await mongo.col('oauth').insertOne(session)

          console.log('登录信息没有，就注册', type, _id)
        }
      }

      const res = await mongo.col('user').findOneAndUpdate(
        { _id: new ObjectId(_id) },
        {
          $set: {
            username: session.nickname,
            avatar: session.headimgurl,
            guest: false
          }
        },
        { upsert: false, returnDocument: 'after', returnNewDocument: true }
      )

      const user = res.value
      jwtoken(ctx, user)
    } catch (error) {
      console.log(error)
      fail(ctx, '服务器错误')
    }
  },

  // facebook 登录
  async facebook(ctx) {
    try {
      let { _id } = ctx.query
      const session = ctx.request.body
      const type = 'facebook'

      if (!session.openid) {
        fail(ctx, 'Parameter error')
        return
      }

      if (_id) {
        // 有匿名用户，就绑定
        console.log('有匿名用户，就绑定', type, _id)
        const query = {
          user: _id,
          type,
          openid: session.openid
        }

        session['user'] = _id
        session['type'] = type

        await mongo
          .col('oauth')
          .updateOne(query, { $set: session }, { upsert: true })
      } else {
        // 没有匿名用户，就查询 & 登录
        const isOAuth = await mongo
          .col('oauth')
          .findOne({ type, openid: session.openid })
        if (isOAuth) {
          _id = isOAuth.user
          console.log('没有匿名用户，就查询 & 登录', type, _id)
        } else {
          // 登录信息没有，就注册
          const newUser = await mongo.col('user').insertOne({
            username: session.nickname,
            avatar: session.headimgurl,
            guest: false,
            pass: true,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
          })
          _id = newUser.insertedId
          session['user'] = _id
          session['type'] = type
          await mongo.col('oauth').insertOne(session)

          console.log('登录信息没有，就注册', type, _id)
        }
      }

      const res = await mongo.col('user').findOneAndUpdate(
        { _id: new ObjectId(_id) },
        {
          $set: {
            username: session.nickname,
            avatar: session.headimgurl,
            guest: false
          }
        },
        { upsert: false, returnDocument: 'after', returnNewDocument: true }
      )

      const user = res.value
      jwtoken(ctx, user)
    } catch (error) {
      console.log(error)
      fail(ctx, '服务器错误')
    }
  },

  // APPLE 登录
  async apple(ctx) {
    try {
      let { _id } = ctx.query
      const session = ctx.request.body
      const type = 'apple'

      if (!session.openid) {
        fail(ctx, 'Parameter error')
        return
      }

      if (_id) {
        // 有匿名用户，就绑定
        console.log('有匿名用户，就绑定', type, _id)
        const query = {
          userid: _id,
          type,
          user: session.user
        }

        session['userid'] = _id
        session['type'] = type

        await mongo
          .col('oauth')
          .updateOne(query, { $set: session }, { upsert: true })
      } else {
        // 没有匿名用户，就查询 & 登录
        const isOAuth = await mongo
          .col('oauth')
          .findOne({ type, user: session.user })
        if (isOAuth) {
          _id = isOAuth.userid
          console.log('没有匿名用户，就查询 & 登录', type, _id)
        } else {
          // 登录信息没有，就注册
          const newUser = await mongo.col('user').insertOne({
            username: session.fullName.nickName,
            avatar: '/static/avatar.jpg',
            guest: false,
            pass: true,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
          })
          _id = newUser.insertedId
          session['userid'] = _id
          session['type'] = type
          await mongo.col('oauth').insertOne(session)

          console.log('登录信息没有，就注册', type, _id)
        }
      }

      const res = await mongo.col('user').findOneAndUpdate(
        { _id: new ObjectId(_id) },
        {
          $set: {
            username: session.fullName.nickName,
            guest: false
          }
        },
        { upsert: false, returnDocument: 'after', returnNewDocument: true }
      )

      const user = res.value
      jwtoken(ctx, user)
    } catch (error) {
      console.log(error)
      fail(ctx, '服务器错误')
    }
  }
}
