import mongo from '#@/lib/mongo.js'
import { success, fail } from '#@/lib/response.js'
import { readFile } from 'fs/promises'

const getCategory = async (name) => {
  const query = {
    name
  }
  const res = await mongo
    .col('category')
    .findOneAndUpdate(query, { $set: query }, { upsert: true })
  const category = res.value
  return category
}

export default {
  // 随机短视频
  async episode(ctx) {
    const options = { upsert: true }
    const query = {
      name: 'Broken Love'
    }
    const res = await mongo
      .col('category')
      .findOneAndUpdate(query, { $set: query }, options)
    const category = res.value

    console.log(category)

    const title = 'Attack on Titan'
    const eDoc = {
      category: category._id,
      categoryname: category.name,

      username: '阿斯达达',
      href: '/static/covers/3.jpg',
      title,
      msg: ' mankind',
      state: 'pause',
      like: 0,
      like_n: 0,
      sms_n: 0,
      src: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-bdb24c6d-8c19-4f80-8e7e-c9c9f037f131/e53e1b6d-ef43-47ec-bad8-d67020621ed9.mp4',
      playNumber: 0,
      pinlun: [],
      playIng: false,
      isShowimage: false,
      isShowProgressBarTime: false,
      isplay: true,
      userID: 'abcdefghijklmn67891'
    }

    const episode = await mongo
      .col('episode')
      .findOneAndUpdate({ title }, { $set: eDoc }, options)

    try {
      success(ctx, episode.value)
    } catch (error) {
      fail(ctx, '服务器错误')
    }
  },
  // 导入剧集
  async batch(ctx) {
    const options = { upsert: true }
    const categoryList = [
      'Broken Love',
      'Modern Romance',
      'New Drama Selection'
    ]

    const data = JSON.parse(
      await readFile(new URL('./post.json', import.meta.url))
    )
    const list = data.data
    for (const item of list) {
      const category = await getCategory(
        categoryList[Math.floor(Math.random() * 3)]
      )

      item.category = category._id
      item.categoryname = category.name
      item.recommend = Math.floor(Math.random() * 3)
      delete item._id
      delete item.pinlun

      const title = item.title
      const episode = await mongo
        .col('episode')
        .updateOne({ title }, { $set: item }, options)
      console.log(episode)
      // console.log(item)
    }

    success(ctx, {})
  }
}
