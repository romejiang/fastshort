<template>
  <view @click="clickLike(isLike)" style="opacity: 0.9; margin-top: 17px">
    <image
      v-if="isLike"
      src="@/static/img/index/xin.png"
      style="width: 40px; height: 40px; position: absolute; right: 6px"
    ></image>
    <image
      v-else
      src="@/static/img/index/xin-2.png"
      style="width: 40px; height: 40px; position: absolute; right: 6px"
    ></image>
    <text
      style="
        color: #ffffff;
        margin-top: 5px;
        font-size: 12px;
        text-align: center;
        margin-top: 40px;
      "
      :class="{ likeNumActive: isLike }"
    >
      {{ like }}
    </text>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import request from '@/common/request'

export default {
  name: 'like',
  props: {
    isLike: Boolean,
    like: Number,
    series: String
  },
  computed: {
    ...mapState({
      token: (state) => state.token
    })
  },
  methods: {
    async clickLike() {
      if (this.token) {
        if (this.isLike) {
          await request.post(
            '/profile/unlike',
            {
              series: this.series
            },
            this.$store
          )
        } else {
          await request.post(
            '/profile/like',
            {
              series: this.series
            },
            this.$store
          )
        }
      }
      console.log('clickLike2222', this.isLike)
      this.$emit('click', this.isLike)
    }
  }
}
</script>
<style></style>
