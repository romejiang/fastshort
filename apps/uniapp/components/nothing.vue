<template>
  <view class="nothing">
    <uni-icons
      custom-prefix="iconfont"
      type="icon-guanyuwomen"
      color="#bfbfbf"
      size="100"
    ></uni-icons>
    <view class="text">{{ msg }}</view>
  </view>
</template>

<script>
export default {
  name: 'nothing',
  props: {
    msg: String
  }
}
</script>

<style scoped>
@import '@/static/fonts/iconfont.css';
.nothing {
  padding-top: 15vh;
  margin: 0 auto;
  text-align: center;
  color: #bfbfbf;
}
.nothing .text {
  margin-top: 20px;
}
</style>
