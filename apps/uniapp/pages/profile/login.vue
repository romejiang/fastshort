<template>
  <view>
    <view class="logo"> Short TV </view>
    <view class="login">
      <uni-forms
        ref="baseForm"
        :model="user"
        :rules="rules"
        label-width="90px"
        label-align="right"
      >
        <uni-forms-item label="Nickname" name="username">
          <uni-easyinput v-model="user.username" placeholder="nickname" />
        </uni-forms-item>
        <uni-forms-item label="Password" name="password">
          <uni-easyinput
            v-model="user.password"
            type="password"
            placeholder="password"
          />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit('baseForm')">Sign In</button>
      <view class="register">
        <view @click="register">Sign Up</view>
        <view @click="lastPassword">Last Password</view>
      </view>
    </view>
    <!-- #ifdef APP -->
    <view class="social">
      <button class="but facebook" type="primary" @click="oauthFacebook">
        <uni-icons
          custom-prefix="iconfont"
          type="icon-facebook"
          color="#fff"
          size="30"
          class="icon"
        ></uni-icons>
        <view class=""> Login with Facebook </view>
      </button>
      <!-- #ifdef APP-IOS -->
      <button class="but apple" @click="oauthApple">
        <uni-icons
          custom-prefix="iconfont"
          type="icon-apple"
          color="#000"
          class="icon"
          size="30"
        ></uni-icons
        >Login with Apple
      </button>
      <!-- #endif -->
      <button class="but google" @click="oauthGoogle">
        <uni-icons
          custom-prefix="iconfont"
          type="icon-logo_google"
          color="#fff"
          class="icon"
          size="30"
        ></uni-icons
        >Login with Google
      </button>
    </view>
    <!-- #endif -->
    <!-- #ifdef WEB -->
    <view class="social">
      <button class="but apple">
        <uni-icons
          custom-prefix="iconfont"
          type="icon-apple"
          color="#000"
          class="icon"
          size="30"
        ></uni-icons
        >Login with WeChat
      </button>
    </view>
    <!-- #endif -->
    <view class="bottom">
      By continuing, you agree to the <br />
      <a href="https://www.baidu.com">User Agreement</a>&nbsp;and&nbsp;
      <a href="https://www.baidu.com">Privacy Policy</a>.
    </view>
  </view>
</template>

<script>
import request from '@/common/request'
import store from '@/store/index.js'

export default {
  name: 'login',
  components: {},
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: {
          rules: [
            {
              required: true,
              errorMessage: 'The username cannot be empty'
            }
          ]
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: 'The username cannot be empty'
            },
            {
              minLength: 6,
              maxLength: 20,
              errorMessage:
                'The password must be between {minLength} and {maxLength}'
            }
          ]
        }
      }
    }
  },
  methods: {
    submit(ref) {
      this.$refs[ref]
        .validate()
        .then(async (res) => {
          // console.log(res)
          const userinfo = await request.post('/public/login', this.user)
          // console.log(userinfo)
          const { token, user } = userinfo

          store.commit('token', token)
          store.commit('user', user)

          uni.setStorageSync('token', token)
          uni.setStorageSync('user', JSON.stringify(user))

          uni.switchTab({
            url: '/pages/profile/profile'
          })
        })
        .catch((err) => {
          console.log('表单错误信息：', err)
        })
    },
    async register() {
      uni.navigateTo({
        url: '/pages/profile/register'
      })
    },
    async lastPassword() {
      uni.navigateTo({
        url: '/pages/profile/login'
      })
    },
    oauthFacebook() {
      uni.login({
        provider: 'facebook',
        success: function (loginRes) {
          // 登录成功
          uni.getUserInfo({
            provider: 'facebook',
            success: async function (info) {
              // 获取用户信息成功, info.authResult保存用户信息
              console.log(info)
              const userinfo = await request.post(
                '/oauth/facebook?_id=' + (store.state.user._id || ''),
                info.userInfo
              )

              const { token, user } = userinfo
              store.commit('token', token)
              store.commit('user', user)
              uni.setStorageSync('token', token)
              uni.setStorageSync('user', JSON.stringify(user))
              uni.switchTab({
                url: '/pages/profile/profile'
              })
            }
          })
        },
        fail: function (err) {
          // 登录授权失败
          // err.code是错误码
          uni.showToast({
            title: 'Authorization failed' + err.code,
            icon: 'none'
          })
        }
      })
    },
    oauthGoogle() {
      uni.login({
        provider: 'google',
        success: function (loginRes) {
          // 登录成功
          uni.getUserInfo({
            provider: 'google',
            success: async function (info) {
              // 获取用户信息成功, info.authResult保存用户信息
              const userinfo = await request.post(
                '/oauth/google?_id=' + (store.state.user._id || ''),
                info.userInfo
              )

              const { token, user } = userinfo
              store.commit('token', token)
              store.commit('user', user)
              uni.setStorageSync('token', token)
              uni.setStorageSync('user', JSON.stringify(user))
              uni.switchTab({
                url: '/pages/profile/profile'
              })
            }
          })
        },
        fail: function (err) {
          // 登录授权失败
          // err.code是错误码
          console.log(err)
          uni.showToast({
            title: 'Authorization failed' + err.code,
            icon: 'none'
          })
        }
      })
    },
    oauthApple() {
      uni.login({
        provider: 'apple',
        success: function (loginRes) {
          // 登录成功
          uni.getUserInfo({
            provider: 'apple',
            success: async function (info) {
              // 获取用户信息成功, info.authResult保存用户信息
              console.log('apple', info)
              const userinfo = await request.post(
                '/oauth/apple?_id=' + (store.state.user._id || ''),
                info.userInfo
              )

              const { token, user } = userinfo
              store.commit('token', token)
              store.commit('user', user)
              uni.setStorageSync('token', token)
              uni.setStorageSync('user', JSON.stringify(user))
              uni.switchTab({
                url: '/pages/profile/profile'
              })
            }
          })
        },
        fail: function (err) {
          // 登录授权失败
          // err.code是错误码
          console.log(err)
          uni.showToast({
            title: 'Authorization failed' + err.code,
            icon: 'none'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin: 50px 0 20px;
}
.login {
  padding: 20px;
  padding-bottom: 0;
  button {
    line-height: 2.3;
    margin: 0 50px;
    height: 30pt;
    border-radius: 6pt;
  }
}
.register {
  padding: 20px 50px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}

.social {
  padding: 0 40px;
  font-size: 10px;
  .but {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30pt;
    // width:130pt;
    margin: 20px 30px;
    font-size: 14px;
    border-radius: 6pt;
    .icon {
      margin-right: 10px;
    }
  }
  .google {
    color: #fff;
    background-color: #ea4336;
  }
}
.bottom {
  font-size: 8px;
  text-align: center;
  color: #888;
  a {
    font-weight: bold;
    color: #fff;
    padding: 0 3px;
    text-decoration: underline;
  }
}
</style>
