import mongo from '#@/lib/mongo.js'
import { success, fail } from '#@/lib/response.js'
import { ObjectId } from 'mongodb'
import md5 from 'md5'
import config from '#@/config/index.js'

export default {
  // 默认方法 GET
  async index(ctx) {
    try {
      let { currentPage, pageSize, search } = ctx.query
      // 分页
      const limit = Number(pageSize || 20)
      currentPage = Number(currentPage || 1)
      const offset = (currentPage - 1) * pageSize

      const sort = {
        _id: -1
      }
      let query = {}
      if (search) {
        query.name = search
      }
      if (id) {
        query.id = id
      }
      const records = await mongo
        .col('admin')
        .find(query)
        .sort(sort)
        .limit(limit)
        .skip(offset)
        .toArray()
      const total = await mongo.col('admin').countDocuments(query)
      success(ctx, {
        limit,
        offset,
        total,
        records
      })
    } catch (error) {
      console.log(error)
      fail(ctx, '服务器错误')
    }
  },
  // 返回列表，支持分页 POST
  async list(ctx) {
    try {
      const { page, query, sort } = ctx.request.body
      let { currentPage, pageSize } = page

      pageSize = Number(pageSize || 20)
      currentPage = Number(currentPage || 1)
      const offset = (currentPage - 1) * pageSize

      const records = await mongo
        .col('admin')
        .find(query)
        .sort(sort)
        .limit(pageSize)
        .skip(offset)
        .toArray()
      const total = await mongo.col('admin').countDocuments(query)
      success(ctx, {
        currentPage,
        pageSize,
        total,
        records
      })
    } catch (error) {
      console.log(error)
      fail(ctx, '服务器错误')
    }
  },
  // 增加 POST
  async create(ctx) {
    const document = ctx.request.body
    document.createdAt = new Date().getTime()
    document.updatedAt = new Date().getTime()
    if (document.passwordstr) {
      document.password = md5(document.passwordstr + config.jwt.saltkey)
      document.passwordstr = ''
    }
    const ret = await mongo.col('admin').insertOne(document)
    try {
      success(ctx, { id: ret.insertedId })
    } catch (error) {
      fail(ctx, '服务器错误')
    }
  },
  // 获取一个信息 GET
  async get(ctx) {
    try {
      const { id } = ctx.params

      const admin = await mongo.col('admin').findOne({ _id: new ObjectId(id) })
      success(ctx, admin)
    } catch (error) {
      console.log(error)
      fail(ctx, '服务器错误')
    }
  },
  // 更新 PUT
  async update(ctx) {
    try {
      const document = ctx.request.body
      document.updatedAt = new Date().getTime()

      const { _id } = document
      delete document._id

      if (document.passwordstr) {
        document.password = md5(document.passwordstr + config.jwt.saltkey)
        document.passwordstr = ''
      }
      const ret = await mongo
        .col('admin')
        .findOneAndUpdate(
          { _id: new ObjectId(_id) },
          { $set: document },
          { returnDocument: 'after', returnNewDocument: true }
        )

      if (!ret.value) {
        fail(ctx, '未找到对应记录')
        return
      }
      success(ctx, ret.value)
    } catch (error) {
      console.log(error)
      fail(ctx, '服务器错误')
    }
  },
  // 删除 DELETE
  async delete(ctx) {
    try {
      const { id } = ctx.params
      const ret = await mongo.col('admin').deleteOne({ _id: new ObjectId(id) })
      if (ret.deleteCount === 0) {
        fail(ctx, '删除失败')
        return
      }
      success(ctx, {})
    } catch (error) {
      fail(ctx, '服务器错误')
    }
  },
  // 批量删除
  async deleteMany(ctx) {
    let { ids } = ctx.request.body

    try {
      ids = ids.map((id) => new ObjectId(id))
      const ret = await mongo.col('admin').deleteMany({ _id: { $in: ids } })
      if (ret.deleteCount === 0) {
        fail(ctx, '删除失败')
        return
      }
      success(ctx, {})
    } catch (error) {
      fail(ctx, '服务器错误')
    }
  },
  // 数据字典
  async dict(ctx) {
    try {
      // 这里用query 传递数据字典的 编号，可以用一个方法实现多个字典。
      let { id } = ctx.query
      id = Number(id || 0)

      const data = [
        [
          { value: true, label: '开启', color: 'success' },
          { value: false, label: '关闭', color: 'warning' }
        ]
      ]
      success(ctx, data[id])
    } catch (error) {
      console.log(error)
      fail(ctx, '服务器错误')
    }
  }
}
