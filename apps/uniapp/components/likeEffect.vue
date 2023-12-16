<template>
  <image
    src="@/static/img/index/aixining.png"
    :style="
      'position: fixed; margin-left: ' +
      aixinLeft +
      'px; margin-top: ' +
      aixinTop +
      'px; width: 70px; height: 65px; transform: rotate(' +
      rotate +
      'deg);'
    "
  ></image>
</template>

<script>
export default {
  name: 'likeEffect',
  components: {},
  model: {
    prop: 'play',
    event: 'change'
  },
  props: {
    position: {
      type: Object
    },
    play: Boolean
  },
  data() {
    return {
      aixinLeft: 100,
      aixinTop: 100,
      rotate: 10
    }
  },
  created() {
    this.aixinLeft = this.position.screenX - 50
    this.aixinTop = this.position.screenY - 50
    let max = 40
    let min = -40
    this.rotate = Math.floor(Math.random() * (max - min + 1)) + min
    console.log('like .....', this.position.screenX, this.position.screenY)
    setTimeout(() => {
      this.$emit('change', false)
    }, 700)
    this.vibrate()
  },
  methods: {
    // 震动效果
    vibrate() {
      // #ifdef APP-PLUS
      if (uni.getSystemInfoSync().platform == 'ios') {
        let UIImpactFeedbackGenerator = plus.ios.importClass(
          'UIImpactFeedbackGenerator'
        )
        let impact = new UIImpactFeedbackGenerator()
        impact.prepare()
        impact.init(1)
        impact.impactOccurred()
      }
      if (uni.getSystemInfoSync().platform == 'android') {
        uni.vibrateShort({
          success: () => {
            console.log('点击震动')
          }
        })
      }
      // #endif
    }
  }
}
</script>

<style></style>
