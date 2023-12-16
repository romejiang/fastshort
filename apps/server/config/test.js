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
    host: 'mongodb://mongo0:27010,mongo1:27018,mongo2:27019/db?replicaSet=rs0',
    db: 'serverdemo'
  },
  redis: {
    url: 'redis://:FcyUp202166c90496@59.110.229.203:6379/10'
  }
}

export default config
