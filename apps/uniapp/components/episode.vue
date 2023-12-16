<template>
  <view class="container">
    <view class="info">
      <view class="cover">
        <image class="image" src="@/static/avatar.jpg" />
      </view>
      <view class="content">
        <text class="title">title</text>
        <text class="ep"> EP 100</text>
        <text class="desc">
          The story of J. Robert Oppenheimer's role in the development of the
          atomic bomb during World War II.
        </text>
      </view>
    </view>
    <view class="selected">
      <view class="top">
        <text
          class="text"
          :class="{ active: selected == 0 }"
          @click="selected = 0"
          >1-25</text
        >
        <text
          class="text"
          v-if="total > 25"
          :class="{ active: selected == 1 }"
          @click="selected = 1"
          >26-50</text
        >
        <text
          class="text"
          v-if="total > 50"
          :class="{ active: selected == 2 }"
          @click="selected = 2"
          >51-75</text
        >
        <text
          class="text"
          v-if="total > 75"
          :class="{ active: selected == 3 }"
          @click="selected = 3"
          >76-100</text
        >
      </view>
      <view class="episode" v-if="selected == 0">
        <view
          class="eItem"
          v-for="i in 25"
          :key="i"
          v-if="i <= total"
          @click="clickSelected(i)"
        >
          <text class="item" :class="{ active: i == index + 1 }">
            {{ list[i - 1].episode }}
          </text>
        </view>
      </view>
      <view class="episode" v-if="selected == 1">
        <view
          class="eItem"
          v-for="i in range(26, 51)"
          :key="i"
          v-if="i <= total"
          @click="clickSelected(i)"
        >
          <text class="item" :class="{ active: i == index + 1 }">
            {{ list[i - 1].episode }}
          </text>
        </view>
      </view>
      <view class="episode" v-if="selected == 2">
        <view
          class="eItem"
          v-for="i in range(51, 76)"
          :key="i"
          v-if="i <= total"
          @click="clickSelected(i)"
        >
          <text class="item">
            {{ list[i - 1].episode }}
          </text>
        </view>
      </view>
      <view class="episode" v-if="selected == 3">
        <view
          class="eItem"
          v-for="i in range(76, 101)"
          :key="i"
          v-if="i <= total"
          @click="clickSelected(i)"
        >
          <text class="item">
            {{ list[i - 1].episode }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'episode',
  components: {},
  props: {
    list: Array,
    index: Number,
    info: Object
  },
  data() {
    return {
      selected: 0
    }
  },
  computed: {
    total() {
      return this.list ? this.list.length : 0
    }
  },
  methods: {
    range: (start, end) => {
      return Array.from({ length: end - start }, (v, k) => k + start)
    },
    clickSelected(i) {
      this.$emit('closeEpisode', i - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 750rpx;
  background-color: #242424;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 15px;
  padding-top: 30px;
}

.info {
  display: flex;
  flex-direction: row;
  .cover {
    padding-right: 10px;
    .image {
      width: 150rpx;
      height: 225rpx;
      border-radius: 5px;
    }
  }
  .content {
    width: 500rpx;
    .title {
      font-size: 14px;
      color: #fff;
    }
    .ep {
      font-size: 10px;
      color: #999;
    }
    .desc {
      font-size: 12px;
      color: #999;
      width: 500rpx;
    }
  }
}
.selected {
  padding-top: 10px;
  .top {
    font-size: 12px;
    margin: 3px 0;
    padding-bottom: 8px;
    display: flex;
    flex-direction: row;
  }
  .top .text {
    margin-right: 20rpx;
    color: #fff;
    font-size: 12px;
  }
  .top .active {
    font-weight: bold;
    padding: 0 10px 0 10px;
    padding-bottom: 8px;
    border-bottom: 2px solid orangered;
  }
  .episode {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    .eItem {
      width: 135rpx;
      .item {
        text-align: center;
        background-color: #383838;
        border-radius: 3px;
        padding: 8px 0;
        font-size: 12px;
        margin: 4px;
        color: #fff;
      }
      .active {
        font-weight: bold;
        background-color: orangered;
      }
    }
  }
}
</style>
