<template>
  <image
    @click="clickAvatar"
    class="userAvatar"
    :src="avatar"
    mode="aspectFill"
  ></image>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    avatar: String
  }
}
</script>

<style scoped>
.userAvatar {
  border-radius: 500%;
  margin-bottom: 15px;
  border-style: solid;
  border-width: 2px;
  border-color: #ffffff;
}
.userAvatar {
  width: 100rpx;
  height: 100rpx;
}
</style>
