import store from '@/store/index.js'

let url = 'http://192.168.1.4:3000/api'
// let url = 'http://127.0.0.1:3000/api'
if (process.env.NODE_ENV == 'production') {
  url = 'https://api.fastshort.top/api'
}

export const BASE_URL = url

const post = async (url, postData, storeObj = null) => {
  const data = Object.assign(postData ? postData : {}, {
    timestamp: new Date().getTime()
  })

  let storeTemp = storeObj || store

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method: 'POST',
      data: data,
      header: {
        clientType: 'h5',
        Authorization: 'Bearer ' + storeTemp.state.token
      },
      success(result) {
        if (result.statusCode == 401) {
          storeTemp.commit('logout')
          uni.switchTab({
            url: '/pages/profile/profile'
          })
          reject(result.statusCode)
        } else if (result.data && result.data.code != 200) {
          if (result.data.message) {
            uni.showToast({
              title: result.data.message,
              icon: 'error'
            })
          }
          reject(result.data.message)
        } else {
          resolve(result.data.data)
        }
      },
      fail(event) {
        reject(event)
      }
    })
  })
}

const get = async (url, getData, storeObj = null) => {
  const data = Object.assign(getData ? getData : {}, {
    timestamp: new Date().getTime()
  })
  let storeTemp = storeObj || store

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method: 'GET',
      data: data,
      header: {
        clientType: 'h5',
        Authorization: 'Bearer ' + storeTemp.state.token
      },
      success(result) {
        if (result.statusCode == 401) {
          storeTemp.commit('logout')
          uni.switchTab({
            url: '/pages/profile/profile'
          })
          reject(result.statusCode)
        } else {
          resolve(result.data.data)
        }
      },
      fail(event) {
        reject(event)
      }
    })
  })
}
const upload = async (filePath) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: BASE_URL + '/public/upload',
      filePath: filePath,
      name: 'file',
      success: (uploadFileRes) => {
        if (uploadFileRes.statusCode == 200) {
          const res = JSON.parse(uploadFileRes.data)
          resolve(res.data)
        } else {
          reject(uploadFileRes)
        }
      },
      fail(e) {
        reject(e)
        console.log('fail', e)
      }
    })
  })
}

export default {
  post,
  get,
  upload
}
