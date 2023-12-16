import { createClient } from 'redis'

import config from '../config/index.js'

class Redis {
  async init() {
    if (!this.client) {
      this.client = createClient({ url: config.redis.url })
      await this.client.connect()
      console.log('redis连接成功')

      this.client.on('error', function (err) {
        console.log(err)
      })
      this.client.close = async () => {
        await client.quit()
        console.log('>QUIT REDIS')
      }
    }
  }
  async close() {
    await client.quit()
  }
}
const redis = new Redis()
export default redis
