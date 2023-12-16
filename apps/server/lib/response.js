import jwt from 'jsonwebtoken'
import config from '#@/config/index.js'

function success(ctx, data) {
  ctx.body = { data: data, code: 200, message: 'ok' }
}

function fail(ctx, msg) {
  ctx.body = { message: msg, code: 201 }
}

function jwtoken(ctx, user) {
  const data = {
    token: jwt.sign(
      { _id: user._id, username: user.username },
      config.jwt.secret,
      {
        expiresIn: '30d'
      }
    ),
    user: user
  }

  success(ctx, data)
}

export { success, fail, jwtoken }
