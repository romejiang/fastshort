// import Router from 'koa-joi-router'
import KoaJoiRouter from '@koa-better-modules/joi-router'
const Joi = KoaJoiRouter.Joi
import fs from 'fs'

// 合并验证器规则
// model 模块名
// name 方法名
// fn 方法函数本体
// 验证配置json
const mergeValidate = (model, action, fn, json, root) => {
  let method = 'get'
  let path = `${root}/${model}`
  switch (action) {
    case 'index':
      method = 'get'
      break
    case 'get':
      method = 'get'
      path = `${path}/:id`
      break
    case 'update':
      method = 'put'
      path = `${path}/:id`
      break
    case 'delete':
      method = 'delete'
      path = `${path}/:id`
      break
    case 'create':
      method = 'post'
      break
    default:
      if (action.indexOf('get') != 0) {
        method = 'post'
      }
      path = `${path}/${action}`
      break
  }
  // 这里是joi验证器的默认值，可以在这里修改
  let validate = {
    validateOptions: {
      allowUnknown: true
    },
    output: {
      200: {
        body: {
          code: Joi.number().required(),
          message: Joi.string().allow(''),
          data: [Joi.object(), Joi.array()]
        }
      }
    }
  }
  // 合并自定义的验证器 和 默认值
  if (json) {
    validate = Object.assign(validate, json)
  }
  // console.log(
  //   `${model}.${action}`,
  //   `\t\t/api${path}`,
  //   '\t\t',
  //   method.toUpperCase(),
  //   '\t\t check:',
  //   !!json
  // )
  const logs = {
    funciton: `${model}.${action}`,
    uri: `/api${path}`,
    method: method.toUpperCase(),
    check: !!json
  }
  return {
    method,
    path,
    validate,
    handler: fn,
    logs
  }
}

export default async (modules, path = '') => {
  const res = []
  let check = {}

  try {
    const checkFile = `./check.js`
    if (!fs.existsSync(checkFile)) {
      check = (await import(checkFile)).default
    }
  } catch (error) {
    console.error('加载验证器错误：', path, checkFile)
  }
  // 循环遍历每个功能模块，返回一个路由数组
  for (const name of modules) {
    try {
      // import 模块，
      const module = (await import(`.${path}/${name}.js`)).default
      const logs = []
      // 遍历模块中的方法，get前缀的方法是 get 方法，其他默认 post
      for (const key in module) {
        if (Object.hasOwnProperty.call(module, key)) {
          const route = mergeValidate(
            name,
            key,
            module[key],
            check[`${name}/${key}`],
            path
          )
          logs.push(route.logs)
          res.push(route)
          // console.log(route.validate)
        }
      }
      console.table(logs)
      console.log('加载成功：', path, name)
    } catch (error) {
      console.log(error)
      console.error('加载错误：', path, name)
    }
  }
  return res
}
