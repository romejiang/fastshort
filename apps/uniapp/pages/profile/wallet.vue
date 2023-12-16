<template>
  <view>
    <topback title="My Wallet"></topback>

    <view class="top">
      <text :class="{ active: menubar == 0 }" @click="clickMenubar(0)">
        Discount
      </text>
      <text :class="{ active: menubar == 1 }" @click="clickMenubar(1)">
        Coin Record
      </text>
      <text :class="{ active: menubar == 2 }" @click="clickMenubar(2)">
        Bonus Record
      </text>
    </view>

    <view v-if="menubar == 0" class="listbox"> 0000 </view>
    <view v-if="menubar == 1" class=""> 1111 </view>
    <view v-if="menubar == 2" class=""> 2222 </view>

    <view class="agreement">
      Recharge means agree to the Recharge Agreement
    </view>
  </view>
</template>

<script>
import topback from '@/components/topback.vue'

export default {
  name: 'wallet',
  components: {
    topback
  },
  data() {
    return {
      menubar: 0
    }
  },
  methods: {
    clickMenubar(state) {
      this.menubar = state
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  font-size: 1rem;
  margin: 3px 0;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-around;
  margin: 20rpx 20rpx;
  
}
.top text {
  text-align: center;
  padding: 0 10rpx;
  padding-bottom: 8px;
}
.top .active {
  border-bottom: 2px solid orangered;
}

.agreement {
  margin-top : 100rpx;
  text-align: center;
  font-size: 10px;
  font-weight: 200;
}
</style>
