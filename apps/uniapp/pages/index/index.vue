<template>
  <view class="pages">
    <view class="statusbar"></view>

    <view>
      <piaoyiSwiper
        :list="recommend"
        :itemMargin="160"
        :autoplay="true"
        :interval="5000"
        :duration="1000"
      />

      <view>
        <view class="top">{{ $t('index1') }}</view>
        <shortlist :list="release" :top="3" />
      </view>

      <view v-for="item in categorys" :key="item.name">
        <view class="top">{{ item.name }}</view>
        <horizontal :list="item.series" />
      </view>

      <view>
        <view class="top">{{ $t('index5') }}</view>
        <shortlist :list="release" :top="3" />
      </view>
    </view>
  </view>
</template>

<script>
import piaoyiSwiper from '@/components/piaoyi-swiper/piaoyi-swiper.vue'
import horizontal from '@/components/horizontal.vue'
import shortlist from '@/components/vertical.vue'
// import userList from '../post.json'

import request from '@/common/request'

export default {
  name: 'discover',
  components: {
    piaoyiSwiper,
    horizontal,
    shortlist
  },
  data() {
    return {
      titles: [],

      recommend: [],
      categorys: [],
      release: []
    }
  },
  async onLoad(option) {
    const data = await request.get('/public')

    this.recommend = data.recommend
    this.categorys = data.categorys
    this.release = data.release
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.top {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 0 10px;
}
</style>
