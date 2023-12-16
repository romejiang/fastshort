<template>
  <view class="topbar">
    <view class="back" @click="clickBack">
      <uni-icons type="left" color="#fff" size="20"></uni-icons>
    </view>
    <text class="info">{{ title }} </text>
    <text class="ep">EP: {{ episode }}</text>
  </view>
</template>

<script>
export default {
  name: 'topbar',
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

<style lang="scss" scoped>
.topbar {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  width: 750rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 90rpx 20rpx 20rpx 20rpx;
  .back {
    margin-right: 10px;
  }
  .info {
    font-size: 12px;
    color: #ccc;
  }
  .ep {
    font-size: 12px;
    margin-left: 10px;
    color: #ccc;
  }
}
</style>
