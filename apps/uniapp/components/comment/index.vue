<template>
  <view class="container">
    <view class="top">
      <text class="image"></text>
      <text class="text">12 条评论</text>
      <image
        class="image"
        @click="closeComment"
        src="@/static/douyin/cuowu.png"
      ></image>
    </view>
    <scroll-view class="scroll-view" scroll-y="true" show-scrollbar="true">
      <view class="list">
        <view class="comment-itme" v-for="item in 10" :key="item">
          <view class="user">
            <image class="image" src="@/static/avatar.jpg"></image>
          </view>
          <view class="info">
            <text class="title">一条 {{ item }}</text>
            <text class="content">这个是用来存储原始评论数据的数组</text>
            <view class="time">
              <view class="time-info">
                <text class="time-ago">16小时 北京</text>
                <text class="reply">回复</text>
              </view>
              <text class="like"> 喜爱 </text>
            </view>
            <view class="more" v-if="true">
              <view class="reply-item">
                <view class="reply-user">
                  <image class="image" src="@/static/avatar.jpg"></image>
                </view>
                <view class="reply-info">
                  <text class="reply-title">一条 {{ item }}</text>
                  <text class="reply-content"
                    >这个是用来存储原始评论数据的数组</text
                  >
                  <view class="reply-time">
                    <view class="reply-time-info">
                      <text class="reply-time-ago">16小时 北京</text>
                      <text class="reply">回复</text>
                    </view>
                    <text class="like"> 喜爱 </text>
                  </view>
                </view>
              </view>
            </view>
            <text v-else class="close-more"> --- 展开 35 条评论 </text>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="bottom">
      <view class="">
        <textarea
          class="textarea"
          placeholder="有爱评论，说点好听的～"
          cursor-spacing="20"
          :auto-focus="false"
          :auto-height="true"
          :adjust-position="true"
          v-model="model"
          :disabled="inputDisabled"
          maxlength="150"
          @click="clickTextarea"
        ></textarea>
      </view>
      <view class="send">
        <image
          class="image"
          v-if="!isopen"
          src="@/static/douyin/biaoqing-2.png"
        ></image>
        <image
          class="image"
          v-if="isopen"
          src="@/static/douyin/jianpan.png"
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'comment',
  components: {},
  data() {
    return {
      model: '',
      inputDisabled: false,
      isopen: true
    }
  },
  methods: {
    closeComment() {
      this.$emit('closeComment')
    },
    clickTextarea() {
      // this.isopen = false
      // this.disabled = false
      // this.emojiHeight = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 900rpx;
  background-color: #242424;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #fff;
}
.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80rpx;
  .text {
    font-size: 12px;
    color: #fff;
  }
  .image {
    width: 16px;
    height: 16px;
    opacity: 0.6;
    margin-right: 30rpx;
  }
}
.list::-webkit-scrollbar {
  width: 0;
}
.scroll-view {
  height: 740rpx;
}
.list {
  padding: 0 10px;
  .comment-itme,
  .reply-item {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    .user,
    .reply-user {
      margin-right: 10px;
      .image {
        border-radius: 100px;
        width: 30px;
        height: 30px;
      }
    }
    .reply-user {
      .image {
        border-radius: 100px;
        width: 20px;
        height: 20px;
      }
    }
    .info,
    .reply-info {
      flex: 1;
      .title,
      .time,
      .reply-title,
      .reply-time {
        font-size: 10px;
        color: #aaa;
        padding: 0;
        margin: 0;
        margin-bottom: 5px;
      }
      .time,
      .reply-time {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .time-info,
        .reply-time-info {
          display: flex;
          flex-direction: row;

          .reply,
          .reply-time-ago,
          .time-ago {
            color: #aaa;
            margin-left: 10px;
            font-size: 10px;
          }
        }
        .like {
          color: #aaa;
          margin-right: 10px;
          font-size: 10px;
        }
      }
      .content,
      .reply-content {
        font-size: 12px;
        color: #fff;
        margin-bottom: 5px;
      }
      .close-more {
        font-size: 10px;
        color: #ddd;
      }
    }
  }
}

.bottom {
  background-color: #242424;
  padding: 10px;
  width: 750rpx;
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  .textarea {
    flex: 1;
    border: 3px solid #444;
    border-radius: 20px;
    font-size: 12px;
    background-color: #444;
    padding: 4px 10px;
    width: 630rpx;
  }
  .send {
    width: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .image {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
