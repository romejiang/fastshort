const config = {
  port: 3000,
  app: {
    port: 3000,
    host: 'http://localhost:3000'
  },
  jwt: {
    secret: 'fengkuang365'
  },
  mongodb: {
    host: 'mongodb://localhost',
    db: 'shorttv'
  },
  s3: {
    accountid: '9c5aee4853df53354e5b6c4459a99042',
    key: '32492f0f20236047d19f58e1ed5da466',
    secret: '9669eeaf084029230c11c13fe061dfe6b8a9558280a2b914763189de57ecd436',
    bucket: 'shorttv',
    endpoint:
      'https://9c5aee4853df53354e5b6c4459a99042.r2.cloudflarestorage.com',
    token: 'FklcI9RH-PNz-XCJhLZam7buykcgAghF698GxxFg',
    site: 'https://tv.ai2app.xyz/'
  },
  mp: {
    appId: 'wx6bdb871fd12a1dc0',
    appSecret: '38c830960ff466a7372a0c44572a1570'
  },
  redis: {
    url: 'redis://:FcyUp202166c90496@59.110.229.203:6379/10'
  }
}

export default config
