import mongo from '#@/lib/mongo.js'
import { success, fail } from '#@/lib/response.js'
import { ObjectId } from 'mongodb'

export default {
  // 我的收藏，列表
  async favorite(ctx) {
    try {
      const favorite = await mongo.col('series').find().limit(3).toArray()
      const last = await mongo.col('series').find().limit(3).toArray()

      success(ctx, {
        last,
        favorite
      })
    } catch (error) {
      fail(ctx, '服务器错误')
    }
  },
  // 喜欢/收藏一个剧集
  async like(ctx) {
    try {
      const { _id } = ctx.state.user
      const { series } = ctx.request.body
      const doc = {
        series: series,
        user: _id
      }
      await mongo.col('like').updateOne(doc, { $set: doc }, { upsert: true })

      await mongo.col('series').updateOne(
        {
          _id: new ObjectId(series)
        },
        { $inc: { like: 1 } }
      )

      success(ctx, {})
    } catch (error) {
      fail(ctx, '服务器错误')
    }
  },
  // 取消喜欢，收藏
  async unlike(ctx) {
    try {
      const { _id } = ctx.state.user
      const { series } = ctx.request.body
      const doc = {
        series: series,
        user: _id
      }
      await mongo.col('like').deleteOne(doc)

      await mongo.col('series').updateOne(
        {
          _id: new ObjectId(series)
        },
        { $inc: { like: -1 } }
      )

      success(ctx, {})
    } catch (error) {
      fail(ctx, '服务器错误')
    }
  },

  async updateUser(ctx) {
    const { _id } = ctx.state.user
    const { avatar, username } = ctx.request.body

    const ret = await mongo
      .col('user')
      .findOneAndUpdate(
        { _id: new ObjectId(_id) },
        { $set: { avatar, username } },
        { upsert: false, returnDocument: 'after', returnNewDocument: true }
      )
    success(ctx, ret.value)
  }
}
