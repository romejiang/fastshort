<template>
  <view class="pages">
    <view class="statusbar"></view>
    <view class="title"> {{ $t('profile') }} </view>

    <view class="profile">
      <view class="userinfo" @click="openMPLogin">
        <view class="">
          <image
            class="avatar"
            :src="user.avatar || '/static/default.jpg'"
          ></image>
        </view>
        <view class="">
          <view class="username">{{ user.username || 'Visitor' }}</view>
          <view class="uid" @click="handleDblClick(user._id)"
            >UID: {{ user._id }}</view
          >
        </view>
      </view>
      <view class="button" v-if="!token || (user && user.guest)">
        <view class="signin" @click="signin">{{ $t('signin') }}</view>
      </view>
    </view>

    <view class="wallet">
      <view class="wallet-item" @click="gotoWallet">
        <view class="">My Wallet</view>
        <view class="">
          <uni-icons type="forward" color="#fff" class="icon"></uni-icons
        ></view>
      </view>
      <view class="wallet-item" @click="gotoTopup">
        <text class="balance">100 Coins</text>
        <view class="">
          <view class="topup">Top Up</view>
        </view>
      </view>
    </view>
    <view class="list">
      <view
        class="menu"
        v-for="(item, index) in menu"
        :key="index"
        @click="clickMenu(index)"
      >
        <view class="info">
          <uni-icons
            custom-prefix="iconfont"
            :type="item.icon"
            color="#eee"
            class="icon"
            size="20"
          ></uni-icons>
          <view class="">
            {{ item.text }}
          </view>
        </view>
        <view class="indicator">
          <uni-icons type="forward" color="#fff" class="icon"></uni-icons>
        </view>
      </view>
    </view>

    <view class="bottom" v-if="token && !user.guest">
      <button class="logout" type="warn" @click="logout">
        {{ $t('logout') }}
      </button>
    </view>

    <uni-popup type="bottom" ref="choosingLanguage">
      <view class="choosingLanguage">
        <view class="setting">{{ $t('languagesetting') }}</view>
        <view class="option" @click="selectedLanguage('en')">
          <view class=""> {{ $t('english') }} </view>
          <view v-if="locale == 'en'">
            <uni-icons
              type="checkmarkempty"
              color="#fff"
              class="icon"
            ></uni-icons>
          </view>
        </view>
        <view class="option" @click="selectedLanguage('zh-Hans')">
          <view class="">
            {{ $t('chinese') }}
          </view>
          <view v-if="locale == 'zh-Hans'">
            <uni-icons
              type="checkmarkempty"
              color="#fff"
              class="icon"
            ></uni-icons>
          </view>
        </view>
      </view>
    </uni-popup>
    <!-- #ifdef MP-WEIXIN -->
    <MPLogin
      v-if="isOpenMP"
      @submit="uploadMP"
      @close="isOpenMP = false"
    ></MPLogin>
    <!-- #endif -->
  </view>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store/index.js'
import request from '@/common/request'
import MPLogin from '@/components/MPLogin.vue'

export default {
  name: 'profile',
  components: {
    MPLogin
  },
  data() {
    return {
      index: 0,
      timerDblClick: null,
      isOpenMP: false
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      token: (state) => state.token
    }),
    locale: function () {
      return this.$i18n.locale
    },
    menu: function () {
      return [
        {
          icon: 'icon-lipin',
          text: this.$t('rewards')
        },
        {
          icon: 'icon-xiaoxi',
          text: this.$t('feedback')
        },
        {
          icon: 'icon-shequ',
          text: this.$t('language')
        },
        {
          icon: 'icon-shezhi',
          text: this.$t('setting')
        }
      ]
    }
  },
  methods: {
    openMPLogin() {
      // #ifndef MP-WEIXIN
      // 修改头像，昵称
      // #endif

      // #ifdef MP-WEIXIN
      this.isOpenMP = true
      // #endif
    },
    async uploadMP(userinfo) {
      this.isOpenMP = false
      const user = await request.post('/profile/updateUser', userinfo)
      if (user) {
        store.commit('user', user)
        uni.setStorageSync('user', JSON.stringify(user))
      }
    },
    handleDblClick(data) {
      if (data) {
        this.index++
        if (this.timerDblClick) {
          clearTimeout(this.timerDblClick)
        }
        this.timerDblClick = setTimeout(() => {
          if (this.index >= 2) {
            this.clipboard(data)
          }
          this.index = 0
        }, 300)
      }
    },
    clipboard(data) {
      if (data) {
        uni.setClipboardData({
          data,
          success: function () {
            uni.showToast({
              title: 'Copied to clipboard',
              icon: 'none'
            })
          }
        })
      }
    },
    gotoWallet() {
      uni.navigateTo({
        url: '/pages/profile/wallet'
      })
    },
    gotoTopup() {
      uni.navigateTo({
        url: '/pages/profile/topup'
      })
    },
    clickMenu(index) {
      if (index == 0) {
        uni.navigateTo({
          url: '/pages/rewards/rewards'
        })
      } else if (index == 1) {
        uni.navigateTo({
          url: '/pages/profile/feedback'
        })
      } else if (index == 2) {
        this.$refs.choosingLanguage.open('bottom')
      } else if (index == 3) {
        uni.navigateTo({
          url: '/pages/profile/setting'
        })
      }
    },
    selectedLanguage(language) {
      uni.setLocale(language)
      this.$i18n.locale = language
      setTimeout(() => {
        this.$refs.choosingLanguage.close()
      }, 300)
    },
    signin() {
      // #ifndef MP-WEIXIN
      uni.navigateTo({
        url: '/pages/profile/login'
      })
      // #endif

      // #ifdef MP-WEIXIN
      this.oauthWechatMP()
      // #endif
    },
    logout() {
      store.commit('logout')
    },
    oauthWechatMP() {
      // #ifdef MP-WEIXIN
      uni.login({
        provider: 'weixin', //使用微信登录
        success: async function (loginRes) {
          if (loginRes.errMsg == 'login:ok') {
            const userinfo = await request.post(
              '/oauth/wechatmp?_id=' + this.user._id,
              {
                code: loginRes.code
              }
            )
            const { token, user } = userinfo

            store.commit('token', token)
            store.commit('user', user)

            uni.setStorageSync('token', token)
            uni.setStorageSync('user', JSON.stringify(user))
          } else {
            uni.showToast({
              title: '登录失败，请刷新重试',
              icon: 'none'
            })
          }
        }
      })
      // #endif
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  padding: 10px 5px 20px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.profile .avatar {
  width: 60px;
  height: 60px;
  border-radius: 100px;
  margin-right: 10px;
}
.profile .userinfo {
  display: flex;
}
.profile .userinfo .username {
  font-size: 1rem;
  font-weight: bold;
  margin: 6px 0;
}
.profile .userinfo .uid {
  font-size: 8px;
  color: #888;
}

.profile .signin {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #2b2b2b;
}

.wallet {
  width: 100%;
  background-color: #222;
  border-radius: 10px;
  .wallet-item:first-child{
    border-bottom: 1px solid #2b2b2b;
  }
  .wallet-item {
    display: flex;
    justify-content: space-between;
    padding: 30rpx ;
    .topup {
      background-color: #f66211;
      border-radius: 10rpx;
      padding: 8rpx 16rpx;
      font-size: 12px;
    }
  }
}

.list {
  padding: 10px 2px;
}
.list .menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
}
.list .menu .info {
  font-size: 1rem;
  display: flex;
}
.list .menu .info .icon {
  margin: 0 10px;
}

.choosingLanguage {
  background-color: #181818;
  padding: 10px 20px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  .setting {
    text-align: center;
    font-weight: bold;
  }
  .option {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
}
.bottom {
  padding: 10px 20px;
  button {
    line-height: 2.3;
    margin: 0 50px;
    height: 30pt;
    border-radius: 6pt;
  }
}
</style>
