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
        <uni-forms-item label="Repassword" name="repassword">
          <uni-easyinput
            v-model="user.repassword"
            type="password"
            placeholder="repassword"
          />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit('baseForm')">Register</button>
      <view class="register" >
        <view @click="login">Sign In</view>
        <view @click="lastPassword">Last Password</view>
      </view>
    </view>
  </view>
</template>

<script>
import request from '@/common/request'
import store from '@/store/index.js'
import { mapState } from 'vuex'

export default {
  name: 'login',
  components: {},
  data() {
    return {
      user: {
        _id: null,
        username: '',
        password: '',
        repassword: ''
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
              errorMessage: 'The password cannot be empty'
            },
            {
              minLength: 6,
              maxLength: 20,
              errorMessage:
                'The password must be between {minLength} and {maxLength}'
            }
          ]
        },
        repassword: {
          rules: [
            {
              required: true,
              errorMessage: 'The repassword cannot be empty'
            },
            {
              minLength: 6,
              maxLength: 20,
              errorMessage:
                'The repassword must be between {minLength} and {maxLength}'
            }
          ]
        }
      }
    }
  },
  computed: {
    ...mapState({
      userinfo: (state) => state.user,
    }),
  },
  methods: {
    async submit(form) {
      this.$refs[form]
        .validate()
        .then(async () => {
          if (this.userinfo && this.userinfo.guest) {
            this.user._id = this.userinfo._id
          }
          const res = await request.post('/public/register', this.user)
          // console.log(res)
          const { token, user } = res

          store.commit('token', token)
          store.commit('user', user)

          uni.setStorageSync('token', token)
          uni.setStorageSync('user', JSON.stringify(user))

          uni.switchTab({
            url: '/pages/index/index'
          })
        })
        .catch((err) => {
          console.log('表单错误信息：', err)
        })
    },
    login() {
      uni.navigateTo({
        url: '/pages/profile/login'
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
  button {
    line-height: 2.3;
    margin: 0 50px;
    height:30pt;
    border-radius: 6pt;
  }
}
.register {
  padding: 20px 50px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
