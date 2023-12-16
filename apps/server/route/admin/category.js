import mongo from '#@/lib/mongo.js'
import { success, fail } from '#@/lib/response.js'
import { ObjectId } from 'mongodb'

export default {
  // 默认方法 GET
  async index(ctx) {
    const { name, id, pageNum, pageSize } = ctx.query

    try {
      pageSize = Number(pageSize || 20)
      pageNum = Number(pageNum || 1)
      const skip = (pageNum - 1) * pageSize
      const sort = {
        _id: -1
      }
      let query = {}
      if (name) {
        query.name = name
      }
      if (id) {
        query.id = id
      }
      const list = await mongo
        .col('category')
        .find(query)
        .sort(sort)
        .limit(pageSize)
        .skip(skip)
        .toArray()
      const total = await mongo.col('category').countDocuments(query)
      success(ctx, {
        total,
        list
      })
    } catch (error) {
      fail(ctx, '服务器错误')
    }
  },
  // 返回列表，支持分页 POST
  async list(ctx) {
    try {
      const { page, form, sort } = ctx.request.body
      let { currentPage, pageSize } = page

      const sorting = {}
      if (Object.keys(sort).length !== 0) {
        sorting[sort.prop] = sort.asc ? -1 : 1
      } else {
        sorting['order'] = 1
      }

      pageSize = Number(pageSize || 20)
      currentPage = Number(currentPage || 1)
      const offset = (currentPage - 1) * pageSize

      const query = {}
      for (const key in form) {
        if (Object.hasOwnProperty.call(form, key)) {
          const element = form[key]
          query[key] = { $regex: element }
        }
      }

      const records = await mongo
        .col('category')
        .find(query)
        .sort(sorting)
        .limit(pageSize)
        .skip(offset)
        .toArray()
      const total = await mongo.col('category').countDocuments(form)
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
    const ret = await mongo.col('category').insertOne(document)
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

      const category = await mongo
        .col('category')
        .findOne({ _id: new ObjectId(id) })
      success(ctx, category)
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

      const ret = await mongo
        .col('category')
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
      const ret = await mongo
        .col('category')
        .deleteOne({ _id: new ObjectId(id) })
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
      const ret = await mongo.col('category').deleteMany({ _id: { $in: ids } })
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
