const config = {
  port: 3000,
  app: {
    port: 3000,
    host: 'http://localhost:3000'
  },
  jwt: {
    secret: 'dev'
  },
  mongodb: {
    host: 'mongodb://localhost',
    db: 'shorttv'
  },
  s3: {
    accountid: '',
    key: '',
    secret: '',
    bucket: '',
    endpoint: '',
    token: '',
    site: ''
  },
  mp: {
    appId: '',
    appSecret: ''
  },
  redis: {
    url: ''
  }
}

export default config
