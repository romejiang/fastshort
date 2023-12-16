<template>
  <view
    style="position: absolute; left: 0px; width: 750rpx; height: 100rpx"
    :style="'bottom:' + bottom + 'rpx;'"
  >
    <view
      v-if="progressing"
      style="position: absolute; width: 750rpx"
      :style="'bottom:' + progressBarBottom * 3 + 'rpx;'"
    >
      <text style="font-size: 12px; color: #f1f1f1; text-align: center">
        {{ formatSeconds(progressBarTime) }} / {{ formatSeconds(totalTime) }}
      </text>
    </view>
    <!-- 这里就是进度条了：纯手工进度条，调整位置的话就把他们的 bottom 改成一下就行了 -->
    <view
      @touchstart="progressTouchstart"
      @touchmove="progressTouchmove"
      @touchend="progressTouchend"
      style="position: absolute; bottom: 20rpx; left: 25rpx"
    >
      <!-- 1.这一步必须加，为了适配低端机型 -->
      <text style="width: 700rpx; opacity: 0">.</text>
      <!-- 2.这是未加载的时的右边的灰色部分 -->
      <view
        style="
          width: 700rpx;
          height: 6rpx;
          background-color: #c8c7cc;
          position: absolute;
          opacity: 0.1;
          border-radius: 4rpx;
        "
        :style="'bottom: ' + progressBarBottom + 'rpx;'"
      ></view>
      <!-- 3.这里我采用的分离式办法：就是让滑动样式和不滑动的样式分开，这样相互不干扰，可以避免进度条闪动的问题 -->
      <view
        v-if="!progressing"
        style="
          height: 6rpx;
          background-color: #fff;
          position: absolute;
          border-radius: 4rpx;
          opacity: 0.3;
        "
        :style="
          'width: ' +
          currentPosition +
          'px;  bottom: ' +
          progressBarBottom +
          'rpx;  '
        "
      ></view>
      <view
        v-else
        style="
          height: 6rpx;
          background-color: #ffffff;
          position: absolute;
          border-radius: 4rpx;
          opacity: 0.6;
        "
        :style="
          'width: ' +
          draggingProgress +
          'px; bottom: ' +
          progressBarBottom +
          'rpx; '
        "
      ></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'progressbar',
  components: {},
  props: {
    totalTime: Number,
    currentTime: Number,
    bottom: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      windowWidth: 0,
      progressBarBottom: 20,
      progressBarTime: 0,
      progressing: false, //是否显示进度条

      draggingProgress: 0 // 拖动位置
    }
  },
  created() {
    this.windowWidth = uni.getSystemInfoSync().windowWidth
  },
  computed: {
    currentPosition() {
      return this.windowWidth * (this.currentTime / this.totalTime)
    }
  },
  methods: {
    // 进度条滑块相关的方法
    progressTouchstart(event) {
      this.progressing = true
    },

    progressTouchmove(event) {
      //当手移动滑块时，计算位置、百分小数、新的时间
      this.draggingProgress = event.changedTouches[0].screenX

      const currentPosition = event.changedTouches[0].screenX
      this.progressBarTime =
        (currentPosition / (this.windowWidth * (700 / 750))) * this.totalTime
    },
    progressTouchend() {
      //当手松开后，跳到最新时间
      this.$emit('seek', this.progressBarTime)
      this.progressing = false
    },
    formatSeconds(value) {
      //获取时间函数
      let theTime = Math.ceil(value) // 秒
      let middle = 0 // 分
      if (theTime > 60) {
        middle = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
      }
      return `${middle > 9 ? middle : '0' + middle}:${
        theTime > 9 ? theTime : '0' + theTime
      }`
    }
  }
}
</script>

<style lang="scss" scoped></style>
