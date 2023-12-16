const mongo = require('../lib/mongo')
const redis = require('../lib/redis')

let transferYuanqiFlag = false

//元气积分转账
async function transferYuanqi() {
  if (transferYuanqiFlag) {
    return
  } else {
    transferYuanqiFlag = true
  }
  try {
    transferYuanqiFlag = false
  } catch (error) {
    console.log('transferYuanqi error', error)
    transferYuanqiFlag = false
  }
}

async function startWork() {
  await mongo.init()
  await redis.init()
  startJob(transferYuanqi, '*/5 * * * * *') //5秒钟
}

function startJob(work, timer) {
  new CronJob(timer, work, null, true, 'Asia/Shanghai')
}

startWork()
