<template>
  <view class="shortlist">
    <view
      v-for="(item, index) in list"
      class="content"
      :key="index"
      v-if="isTop(index)"
      @click="clickItem(item)"
    >
      <view class="">
        <image
          class="image"
          :src="item.cover[0]"
          mode="aspectFill"
          lazy-load
        ></image>
      </view>
      <view class="info">
        <view class="">
          <text class="title">{{ item.name }}</text>
          <text class="msg ellip">{{ item.description }}</text>
        </view>
        <view class="buttonbox">
          <view class="season">{{ item.sms_n }}</view>
          <view class="playnow">
            <uni-icons
              custom-prefix="iconfont"
              type="icon-play1"
              color="#fff"
              class="icon"
              size="14"
            ></uni-icons>
            Play Now</view
          >
        </view>
      </view>
    </view>
    <nothing v-if="list.length == 0" :msg="msg" />
  </view>
</template>

<script>
import nothing from '@/components/nothing.vue'
export default {
  name: 'list',
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
      default: "Fly Beyond the Milky Way Galaxy"
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
      console.log('item: ', item._id);
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
.shortlist{
  margin-bottom: 10px;
}
.content {
  display: flex;
  padding: 8px;
}
.content .image {
  width: 200rpx;
  height: 280rpx;
  margin-right: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 6px #333;
}
.content .title {
  font-size: 1rem;
  display: block;
}

.content .msg {
  font-size: 0.8rem;
  color: #888;
  display: block;
}
.content .info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.buttonbox {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
}
.buttonbox .season {
}
.buttonbox .playnow {
  font-size: 0.8rem;
  background-color: #2b2b2b;
  border-radius: 20px;
  padding: 3px 10px;
}
.playnow .icon {
  margin-right: 3px;
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
