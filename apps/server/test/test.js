// process.env.PLATFORM = 'PROD';
import moment from 'moment'

import mongo from '../lib/mongo.js'
import redis from '../lib/redis.js'
import config from '../config/index.js'
import got from 'got'
import jwt from 'jsonwebtoken'

var token = jwt.sign({ foo: 'bar' }, config.jwt.secret, { expiresIn: '1h' })
console.log(token)
