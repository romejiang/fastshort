<template>
  <view class="horizontalbox">
    <view class="horizontal">
      <view
        v-for="(item, index) in list"
        class="content"
        :key="index"
        v-if="isTop(index)"
        @click="clickItem(item)"
      >
        <image
          class="image"
          :src="item.cover[0]"
          mode="aspectFill"
          lazy-load
        ></image>
        <text class="title">{{ item.name }}</text>
      </view>
      <nothing v-if="list.length == 0" :msg="msg" />
    </view>
  </view>
</template>

<script>
import nothing from '@/components/nothing.vue'
export default {
  name: 'horizontal',
  props: {
    list: {
      type: Array,
      default: []
    },
    top: {
      type: Number,
      default: 6
    },
    msg: {
      type: String,
      default: 'Fly Beyond the Milky Way Galaxy'
    }
  },
  components: {
    nothing
  },
  methods: {
    isTop(index) {
      if (this.top === 0) {
        return true
      } else {
        return index < this.top
      }
    },
    clickItem(item) {
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
.horizontalbox {
  width: 100%;
  overflow: auto;
}
.horizontalbox::-webkit-scrollbar {
  width: 0;
}
.horizontal {
  display: flex;
  flex-direction: row;
}
.content {
  display: flex;
  padding: 8px;
  padding-bottom: 0;
  flex-direction: column;
  align-items: center;
}
.content .image {
  width: 200rpx;
  height: 280rpx;
  border-radius: 5px;
  box-shadow: 2px 2px 6px #333;
}
.content .title {
  font-size: 0.8rem;
  display: block;
  margin: 10px 0 0 0;
}

.ellip {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* degradation */
  height: 52px;
  overflow: hidden;
}
</style>
