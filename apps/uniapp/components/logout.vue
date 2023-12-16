<template>
  <view class="bg" v-if="isVisible">
    <view class="container">
      <!-- 标题 -->
      <view class="title">
        <text>一又半</text>
        <text>你的昵称、头像</text>
      </view>

      <!-- 选择头像 -->
      <view class="choose-avatar-row">
        <image class="avatar" :src="avatar"></image>
        <text>{{ username }}</text>
      </view>

      <!-- 按钮 -->
      <view class="login-row">
        <button @click="submit">退出登录</button>
        <button class="default" @click="emit('update:isVisible', false)">
          关闭
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String
  },
  username: {
    type: String
  }
})

const emit = defineEmits(['submit', 'update:isVisible'])

// 登录按钮点击事件
const submit = () => {
  uni.removeStorageSync('avatar')
  uni.removeStorageSync('username')
  emit('update:isVisible', false)
  emit('submit')
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
  .title {
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

  .choose-avatar-row {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
    margin: 10px 0;
    font-size: 16px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;

    .avatar {
      width: 45px;
      height: 45px;
      margin: 0 20px;
      padding: 0;
      border-radius: 50%;

      ::after {
        border: 0;
      }
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
:deep(button:after) {
  border: 0 !important;
}
</style>
