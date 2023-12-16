import Koa from 'koa'
import jwt from 'koa-jwt'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import { koaBody } from 'koa-body'

import config from './config/index.js'
import mongo from './lib/mongo.js'
// import redis from './lib/redis.js'

import router from './route/index.js'

const app = new Koa()

// 设置允许跨域请求
app.use(cors())
// 设置上传文件大小最大限制，默认2M
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 30 * 1024 * 1024
    },
    textLimit: '1mb',
    formLimit: '5mb',
    jsonLimit: '1mb'
  })
)
// 分析http请求体
app.use(bodyParser())
//输出请求的方法，url,和所花费的时间
app.use(logger())
// jwt 登陆验证
app.use(
  jwt({ secret: config.jwt.secret, debug: true }).unless({
    path: [
      '/api/admin/auth/signin',
      '/api/admin/auth/init',
      /\/api\/public\/*/,
      /\/api\/oauth\/*/
    ]
  })
)
// 主入口
// 中间件，拦截器都在这里配置。
// 路由相关的内容放在 router/index.js 中
app.use(router.middleware())

console.log('当前环境:', process.env.PLATFORM)
//初始化redis和mongo,并监听端口
// await redis.init()
await mongo.init()
//监听端口
app.listen(config.app.port, () => {
  console.log('The server is running at http://localhost:' + config.app.port)
})
//如果是开发环境，不需要监听进程的关闭事件
if (process.env.PLATFORM != 'DEV') {
  process.send('ready')
  process.on('SIGINT', async function () {
    try {
      console.log('KOA 停止服务....')
      // await redis.close()
      await mongo.close()
      process.exit(0)
    } catch (error) {
      process.exit(1)
    }
  })
}
