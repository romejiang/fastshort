import jwt from 'jsonwebtoken'
import moment from 'moment'
import chalk from 'chalk'

import config from '../config/index.js'

//处理APP路由规则
export async function parseRoute(ctx, next) {
  if (!checkPermission(ctx.path)) {
    try {
      const token = ctx.header.authorization.split(' ')[1]
      // romejiang modify
      const user = jwt.verify(token, config.jwt.secret)
      ctx.state.user = user
      await parseReSubmition(ctx)
    } catch (err) {
      ctx.response.status = 401
      return
    }
  }
  await next()
}

export async function printRequest(ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  const str1 = chalk.blue(moment().format('HH:mm:ss'))
  const str2 = chalk.green(`${ctx.url} `)
  const str3 = chalk.red(`${ms} ms`)
  console.log(str1, ctx.method, str2, str3)
}
// //处理高并发重复提交问题(同一接口同一用户某个时间段内只能提交一次)
export async function parseReSubmition(ctx) {
  if (checkReSubmition(ctx.path)) {
    const phone = ctx.state.user.user_mobile
    //1秒钟能只能请求一次
    const res = await redis.set(`INTERFACE_RESUBMITION:${path}:${phone}`, 1, {
      NX: true,
      EX: 1
    })
    if (res != 'OK') {
      ctx.response.status = 500
      return
    }
  }
}
export function checkPermission(path) {
  //不需要权限的接口
  const notNeedPermissions = []
  return notNeedPermissions.includes(path)
}
export function checkReSubmition(path) {
  //防止重复提交的接口
  const reSubmition = []
  return reSubmition.includes(path)
}
// export { parseRoute }
// export { parseRoute, printRequest }
