<template>
  <view>
    <block v-if="platform == 'ios'">
      <view @click="$emit('click')" style="margin-top: 17px">
        <view
          style="
            width: 48px;
            height: 48px;
            border-radius: 50px;
            position: absolute;
            right: 2.5px;
          "
        >
          <image
            :style="
              'width: 48px; height: 48px; border-radius: 50px; transform: rotate(' +
              rotates +
              'deg);'
            "
            src="@/static/img/index/bfq.png"
            mode="aspectFill"
          ></image>
          <image
            :style="
              'width: 30px; height: 30px; margin-top: 9px; margin-left: 9px; position: absolute; border-radius: 50px; transform: rotate(' +
              rotates +
              'deg);'
            "
            :src="cover"
            mode="aspectFill"
          ></image>
        </view>
      </view>
      <view style="margin-top: 48px"></view>
    </block>
    <block v-if="platform !== 'ios'">
      <view
        @click="$emit('click')"
        style="margin-top: 15px; width: 48px; height: 48px"
      >
        <text style="font-size: 0.1px; opacity: 0">.</text>
        <view
          style="
            width: 48px;
            height: 48px;
            border-radius: 50px;
            position: absolute;
          "
        >
          <image
            :style="
              'width: 48px; height: 48px; border-radius: 50px; transform: rotate(' +
              rotates +
              'deg);'
            "
            src="@/static/img/index/bfq.png"
            mode="aspectFill"
          ></image>
          <image
            :style="
              'width: 30px; height: 30px; margin-top: 9px; margin-left: 9px; position: absolute; border-radius: 50px; transform: rotate(' +
              rotates +
              'deg);'
            "
            :src="cover"
            mode="aspectFill"
          ></image>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  name: 'cover',
  props: {
    platform: String,
    cover: String,
    play: Boolean
  },
  data() {
    return {
      rotates: 0,
      timer: null
    }
  },
  watch: {
    play(val) {
      if (val) {
        if (!this.timer) {
          this.timer = setInterval(() => {
            this.rotates += 1
          }, 30)
        }
      } else {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  },
  mounted() {
    if (this.play) {
      this.timer = setInterval(() => {
        this.rotates += 1
      }, 30)
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>

<style></style>
