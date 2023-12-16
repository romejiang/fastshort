<template>
  <swiper
    :current="current"
    circular
    :autoplay="autoplay"
    :interval="interval"
    :duration="duration"
    @change="imgChange"
    :previous-margin="itemMargin + 'rpx'"
    :next-margin="itemMargin + 'rpx'"
  >
    <swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
      <view
        class="item"
        :class="current == index ? 'imgActive' : ''"
        @click="clickSwiper(item)"
      >
        <image :src="item.cover[0]" mode=""></image>
        <view class="title">{{ item.name }}</view>
      </view>
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },

    autoplay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 3000
    },
    duration: {
      type: Number,
      default: 1000
    },
    itemMargin: {
      type: Number,
      default: 30
    },
    circular: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  methods: {
    imgChange(e) {
      this.current = e.detail.current
    },
    clickSwiper(item) {
      // #ifdef APP
      uni.navigateTo({
        url: `/pages/player/app/series?id=${item._id}`
      })
      // #endif
      // #ifndef APP
      uni.navigateTo({
        url: `/pages/player/web/series?id=${item._id}`
      })
      // #endif
    }
  }
}
</script>

<style lang="scss" scoped>
swiper {
  height: 560rpx;
  margin-bottom: 10px;

  swiper-item {
    height: 560rpx;

    .item {
      width: 100%;
      height: 100%;
      transform: scale(0.8);
      opacity: 0.2;
      animation: reduced 1s ease 1;
      image {
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
      }
      .title {
        position: relative;
        bottom: 50px;
        height: 50px;
        padding-top: 6px;
        width: 100%;
        text-align: center;
        font-size: 1rem;
        background-color: #00000050;
      }
    }
    .imgActive {
      animation: zoomin 1s ease 1;
      transform: scale(1);
      opacity: 1;
    }

    @keyframes reduced {
      from {
        transform: scale(1);
        opacity: 1;
      }
      to {
        transform: scale(0.8);
        opacity: 0.2;
      }
    }
    @keyframes zoomin {
      from {
        transform: scale(0.8);
        opacity: 0.2;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
}
</style>
