import KoaJoiRouter from '@koa-better-modules/joi-router'
import loadModule from './loadModule.js'

const router = new KoaJoiRouter()
router.prefix('/api')

// 循环遍历每个功能模块，模块名字需要自定义
const routersAdmin = await loadModule(
  [
    'auth', // 管理端的登录，等不需要鉴权的方法
    'user', // 用户
    'admin', // 管理员

    'comment', // 评论
    'category', // 分类
    'episode', // 剧集，包含第几集
    'series' // 电视剧，包含第几季
  ],
  '/admin'
)
router.route(routersAdmin)

// 循环遍历每个功能模块，模块名字需要自定义
const routers = await loadModule(
  [
    'init'
    // 'user',
    // 'profile'
  ],
  '/app'
)
router.route(routers)

const profilePublic = await loadModule(['profile'])
router.route(profilePublic)

const routersPublic = await loadModule(['public'])
router.route(routersPublic)

const oauthPublic = await loadModule(['oauth'])
router.route(oauthPublic)

export default router
