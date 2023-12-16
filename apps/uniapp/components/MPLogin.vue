<template>
  <view class="bg">
    <view class="container">
      <!-- 标题 -->
      <view class="headline">
        <text>ShortTV 申请</text>
        <text>获取你的昵称、头像</text>
      </view>

      <!-- 选择头像 -->
      <view class="choose-avatar-row">
        <text>头像</text>
        <button
          class="avatar-wrapper"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <image class="avatar" :src="avatar"></image>
        </button>
        <text>点击选择头像</text>
      </view>

      <!-- 选择昵称 -->
      <view class="choose-nickname-row">
        <text>昵称</text>
        <input
          v-model="nickname"
          type="nickname"
          placeholder="请输入昵称"
          :cursor-spacing="120"
        />
      </view>

      <!-- 按钮 -->
      <view class="login-row">
        <button
          @click="submit"
          :class="{ inactive: disabled }"
          :disabled="disabled"
        >
          登录
        </button>
        <button class="default" @click="$emit('close')">关闭</button>
      </view>
    </view>
  </view>
</template>

<script>
// 微信小程序登陆组件
import request from '@/common/request'

export default {
  name: 'MPLogin',
  props: {},
  data() {
    return {
      avatar: '/static/avatar.jpg',
      nickname: '',
      disabled: false
    }
  },
  watch: {
    nickname: function (newVal) {
      if (newVal) {
        this.disabled = false
      }
    }
  },
  methods: {
    async onChooseAvatar(e) {
      try {
        const { avatarUrl } = e.detail

        const data = await request.upload(avatarUrl)
        this.avatar = data.url
      } catch (error) {
        console.log(error)
      }
    },
    submit() {
      const userinfo = {
        avatar: this.avatar,
        username: this.nickname
      }
      this.$emit('submit', userinfo)
    }
  }
}
</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}

.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.container {
  color: #282828;
  width: 96vw;
  height: 45%;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0 2vw;
  .headline {
    width: 100%;
    height: 30%;
    font-size: 14px;
    font-weight: bold;
    padding-top: 20px;

    text:nth-child(2) {
      display: block;
      font-size: 18px;
      font-weight: bold;
      margin-top: 5px;
    }
  }

  .choose-avatar-row,
  .choose-nickname-row {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 2px;
    font-size: 16px;
    border-bottom: 1px solid #eee;

    .avatar-wrapper {
      width: 45px;
      height: 45px;
      margin: 0;
      padding: 0;
      margin-right: 10px;
      border-radius: 50%;
      .avatar {
        width: 100%;
        height: 100%;
        ::after {
          border: 0;
        }
      }
    }
    text {
      width: 45px;
      margin-right: 10px;
    }
    text:nth-child(3) {
      width: auto;
      color: gray;
    }
  }
  .login-row {
    width: 100%;
    height: 30%;
    padding-top: 20px;
    display: flex;

    button {
      font-size: 14px;
      width: 30%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-color: transparent;
      color: #fff;
      background-color: #1aad19;
    }
    .default {
      color: #000000;
      background-color: #f8f8f8;
    }
    .inactive {
      color: #ccc;
      background-color: #f8f8f8;
    }
  }
}
// :deep(button:after) {
//   border: 0 !important;
// }
</style>
