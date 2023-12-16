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
        .col('episode')
        .find(query)
        .sort(sort)
        .limit(pageSize)
        .skip(skip)
        .toArray()
      const total = await mongo.col('episode').countDocuments(query)
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
        sorting['episode'] = 1
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
        .col('episode')
        .find(query)
        .sort(sorting)
        .limit(pageSize)
        .skip(offset)
        .toArray()
      const total = await mongo.col('episode').countDocuments(form)
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
    if (document.video) {
      document.cover = [document.video + '.png']
    }
    if (document.series) {
      const series = await mongo.col('series').findOne({
        _id: new ObjectId(document.series)
      })
      if (series) {
        document.seriesname = series.name
      }
    }

    const ret = await mongo.col('episode').insertOne(document)
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

      const episode = await mongo
        .col('episode')
        .findOne({ _id: new ObjectId(id) })
      success(ctx, episode)
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
      if (document.video) {
        document.cover = [document.video + '.png']
      }
      if (document.series) {
        const series = await mongo.col('series').findOne({
          _id: new ObjectId(document.series)
        })
        if (series) {
          document.seriesname = series.name
        }
      }
      const ret = await mongo
        .col('episode')
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
        .col('episode')
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
      const ret = await mongo.col('episode').deleteMany({ _id: { $in: ids } })
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
      let { id } = ctx.query
      id = Number(id || 0)
      if (id == 0) {
        // 这里用query 传递数据字典的 编号，可以用一个方法实现多个字典。
        const categorys = await mongo
          .col('series')
          .find()
          .sort({
            order: 1
          })
          .toArray()
        const data = []
        for (const cat of categorys) {
          data.push({
            value: cat._id,
            label: cat.name,
            color: cat.pass ? 'success' : 'warning'
          })
        }
        success(ctx, data)
      } else if (id == 1) {
        const { series } = ctx.query
        let start = 1
        if (series) {
          const max = await mongo
            .col('episode')
            .find({
              series
            })
            .sort({ episode: -1 })
            .limit(1)
            .toArray()
          if (max.length > 0) {
            start = max[0].episode
          }
        }

        const data = []
        for (const key of Array(10).keys()) {
          data.push({
            value: start + key,
            label: `第${start + key}集`
          })
        }
        data.push({
          value: 9999,
          label: `第N集`
        })
        success(ctx, data)
      }
    } catch (error) {
      console.log(error)
      fail(ctx, '服务器错误')
    }
  }
}
