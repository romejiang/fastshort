// import Router from 'koa-joi-router'
import KoaJoiRouter from '@koa-better-modules/joi-router'
const Joi = KoaJoiRouter.Joi

export default {
  'user/index': {
    query: {
      name: Joi.string().max(100).required().label('用户名')
    }
  },
  signup: {
    body: {
      name: Joi.string().max(100).required().label('用户名'),
      age: Joi.number(),
      email: Joi.string().lowercase().email(),
      password: Joi.string().max(100).default('123123'),
      _csrf: Joi.string().token()
    }
  }
}
