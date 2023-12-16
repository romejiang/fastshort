<template>
  <view
    class="comment"
    @click="$emit('click', index)"
    style="opacity: 0.9; margin-top: 17px"
  >
    <image
      src="@/static/img/index/liaotian-2.png"
      style="width: 35px; height: 35px; position: absolute; right: 7px"
    ></image>
    <text
      style="
        color: #ffffff;
        margin-top: 5px;
        font-size: 12px;
        text-align: center;
        margin-top: 40px;
      "
      >{{ total }}</text
    >
  </view>
</template>

<script>
export default {
  name: 'comment',
  props: {
    total: Number,
    index: Number
  }
}
</script>

<style></style>
