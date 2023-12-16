import { MongoClient } from 'mongodb'

import config from '../config/index.js'

class Mongo {
  async init() {
    var option = {
      maxPoolSize: 50,
      wtimeoutMS: 500,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    if (!this.db) {
      const client = await MongoClient.connect(config.mongodb.host, option)
      this.db = client.db(config.mongodb.db)
      console.log(`mongodb连接成功`)
    }
  }

  async close() {
    await this.db.close()
  }

  col(dbName) {
    return this.db.collection(dbName)
  }

  async getSession() {
    const seesion = await this.db.startSession()
    seesion.startTransaction({
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' }
    })
    return seesion
  }
}

const mongo = new Mongo()
export default mongo
