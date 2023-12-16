<template>
  <view class="content">
    <text class="userName">{{ title }}</text>
    <text class="words">{{ msg }} {{ test }}</text>
  </view>
</template>

<script>
export default {
  name: 'message',
  props: {
    title: String,
    msg: String,
    test: String,
  },
  methods: {}
}
</script>

<style scoped>
.content {
  width: 610rpx;
  z-index: 99;
  position: absolute;
  bottom: 30px;
  /* background-color: #007AFF; */
  /* justify-content: center; */
  padding: 15rpx;
  flex-direction: column;
  justify-content: flex-start;
  color: #ffffff;
}
.userName {
  font-size: 30rpx;
  color: #ffffff;
  margin-top: 80upx;
}
.words {
  margin-top: 10rpx;
  font-size: 30rpx;
  color: #ffffff;
}
</style>
