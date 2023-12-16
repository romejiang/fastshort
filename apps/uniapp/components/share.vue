<template>
  <view @click="$emit('click')" style="opacity: 0.9; margin-top: 17px">
    <image
      src="@/static/img/index/share-fill.png"
      style="width: 40px; height: 40px; position: absolute; right: 5px"
    ></image>
    <text
      style="
        color: #ffffff;
        margin-top: 5px;
        font-size: 12px;
        text-align: center;
        margin-top: 40px;
      "
      >Share</text
    >
  </view>
</template>

<script>
export default {
  name: 'share'
}
</script>

<style></style>
