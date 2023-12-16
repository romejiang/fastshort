import BigNumber from 'bignumber.js'
const util = {
  async add(a, b) {
    return a + b
  },
  async sleep(second) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve()
      }, parseInt(second) * 1000)
    })
  },

  async color16() {
    var r = Math.floor(Math.random() * 256)
    var g = Math.floor(Math.random() * 256)
    var b = Math.floor(Math.random() * 256)
    var color = '#' + r.toString(16) + g.toString(16) + b.toString(16)
    return color
  },

  randomString(n = 4, level = 0) {
    const chars = [
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      '2345678abcdefghjkmnrstuvwxyzABCDEFGHIJKMNRSTUVWXYZ',
      '345678ACDEFGHJKMNRSTUVWXY', // 验证码，没有容易混淆的字符
      '0123456789' // 数字
    ]

    let res = ''
    for (let i = 0; i < n; i++) {
      const id = Math.ceil(Math.random() * chars[level].length - 1)
      res += chars[level].charAt(id)
    }
    return res
  },

  //10进制转52
  string10to52(str) {
    var chars = 'abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'
    var radix = chars.length
    var arr = []
    var qutient = BigNumber(str)
    while (qutient > 0) {
      var mod = qutient % radix
      arr.push(chars[mod])
      qutient = (qutient - mod) / radix
      if (qutient < radix) {
        arr.push(chars[qutient])
        qutient = 0
      }
    }
    return arr.join('')
  },

  randomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //不含最大值，含最小值
  },

  isMobile(mobile) {
    return /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(
      mobile
    )
  }
}

export default util
