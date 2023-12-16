<template>
  <view class="topbar" @click="clickBack">
    <view class="back">
      <uni-icons type="left" color="#fff" size="20"></uni-icons
    ></view>
    <text class="title">{{ title }}</text>
    <view class="hold"></view>
  </view>
</template>

<script>
export default {
  name: 'topback',
  props: {
    title: String,
    episode: Number
  },
  data() {
    return {}
  },
  methods: {
    clickBack() {
      uni.navigateBack({})
    }
  }
}
</script>

<style lang="scss" scoped>.topbar {
  background-color: rgba(0, 0, 0, 0.2);
  width: 750rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx ;
  // #ifdef APP
  padding-top: 90rpx;
  // #endif
  .back {
    margin-right: 10px;
  }
  .title {
    font-size: 20px;
    color: #fff;
  }
  .hold {
    width: 60rpx;
  }
}
</style>
