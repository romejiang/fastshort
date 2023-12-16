<template>
  <view
    @touchstart="progressTouchstart"
    @touchmove="progressTouchmove"
    @touchend="progressTouchend"
    :style="
      'width: ' +
      (windowWidth - windowWidth * 0.1) +
      'px; margin-left: ' +
      windowWidth * 0.05 +
      'px; height: 20px; position: absolute; bottom: 10px;'
    "
  >
    <view>
      <view
        style="
          margin-top: 10px;
          height: 6rpx;
          border-radius: 6px;
          background-color: #999999;
          opacity: 0.1;
        "
        :style="'width: ' + (windowWidth - windowWidth * 0.1) + 'px; '"
      ></view>
      <view
        v-if="!isTouch"
        style="
          position: absolute;
          margin-top: 10px;
          height: 6rpx;
          border-radius: 6px;
          background-color: #e6e4e7;
          opacity: 0.3;
        "
        :style="
          'width: ' +
          (windowWidth - windowWidth * 0.1) * progressBarPercent +
          'px; '
        "
      ></view>
      <view
        v-if="isTouch"
        style="
          position: absolute;
          margin-top: 10px;
          height: 6rpx;
          border-radius: 6px;
          background-color: #e6e4e7;
          opacity: 0.6;
        "
        :style="'width: ' + (videoStartPositon + addPositon) + 'px; '"
      ></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'progressbar',
  components: {},
  props: {
    timeDuration: Number,
    progressBarPercent: Number
  },
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,

      isHumanClick: true,
      // 视频
      videoStartPositon: 0,
      touchStartPosition: 0,
      addPositon: 0,
      isTouch: false
    }
  },
  created() {
    this.windowWidth = uni.getSystemInfoSync().windowWidth
    this.windowHeight = uni.getSystemInfoSync().windowHeight
  },
  methods: {
    progressTouchstart(e) {
      if (this.isHumanClick) {
        this.isTouch = true
        this.addPositon = 0
        this.videoStartPositon =
          (this.windowWidth - this.windowWidth * 0.1) * this.progressBarPercent
        this.touchStartPosition = e.changedTouches[0].clientX
      }
    },
    progressTouchmove(e) {
      if (this.isHumanClick) {
        let num = e.changedTouches[0].clientX - this.touchStartPosition
        if (
          this.videoStartPositon + num <=
          this.windowWidth - this.windowWidth * 0.1
        ) {
          this.addPositon =
            e.changedTouches[0].clientX - this.touchStartPosition
        } else {
          this.addPositon = 0
          this.videoStartPositon = this.windowWidth - this.windowWidth * 0.1
        }
      }
    },
    progressTouchend(e) {
      if (this.isHumanClick) {
        const per = Number(
          (this.videoStartPositon + this.addPositon) /
            (this.windowWidth - this.windowWidth * 0.1)
        )
        const timeSubmit = parseInt(this.timeDuration * per)
        this.$emit('seek', timeSubmit)

        setTimeout(() => {
          this.isTouch = false
        }, 300)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
