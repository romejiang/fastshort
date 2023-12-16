<template>
  <view>
    <topback title="Top Up"></topback>

    <view class="account">
      <uni-icons
        type="icon-lipin"
        custom-prefix="iconfont"
        color="#fff"
        size="20"
      ></uni-icons>
      <text> 100 Coins | 0 Bonus</text>
    </view>
    <view class="coins">
      <view class="item" :class="{ active: i === 1 }" v-for="i in 4" :key="i">
        <view class="coin">
          <text class="main">{{ i * 100 }} Coins</text>
          <text class="give"> + {{ i * 10 }} Coins</text>
        </view>
        <view class="price">
          <text class="text"> $ {{ i * 100 }} </text>
        </view>
      </view>
    </view>
    <view class="agreement">
      Recharge means agree to the Recharge Agreement
    </view>
  </view>
</template>

<script>
import topback from '@/components/topback.vue'

export default {
  name: 'topup',
  components: {
    topback
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


.account {
  display: flex;
  justify-content: space-evenly;
  margin: 30rpx 0 20rpx;
}

.coins {
  display: flex;
  flex-direction: column;

  padding: 30rpx;
  .active{
    border: 1px solid #f66211;
  }
  .item {
    background-color: #303030;
    border-radius: 20rpx;
    margin-bottom: 30rpx;

    display: flex;
    justify-content: space-between;
    align-items: stretch;
    .price {
      background-color: #f66211;
      color: #fff;
      border-top-right-radius: 18rpx;
      border-bottom-right-radius: 18rpx;
      width: 160rpx;

      display: flex;
      justify-content: center;
      align-items: center;
      .text{
        font-size: 32rpx;
      }
    }
    .coin {
      display: flex;
      flex-direction: column;
      padding: 16rpx 30rpx;
      .main {
        font-size: 28rpx;
        color: #fff;
      }
      .give {
        color: #f66211;
      }
    }
  }
}

.agreement{
  text-align: center;
  font-size: 10px;
  font-weight: 200;
}
</style>
