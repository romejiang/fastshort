<template>
  <view class="pages">
    <view class="statusbar"></view>
    <view class="title"> {{ $t('favorite') }} </view>

    
    <view class="top">
      <text :class="{ active: menubar }" @click="clickMenubar(true)">{{
        $t('favorite1')
      }}</text>
      <text :class="{ active: !menubar }" @click="clickMenubar(false)">{{
        $t('favorite2')
      }}</text>
    </view>

    <view v-if="menubar" class="listbox">
      <shortlist :list="favorite" />
    </view>
    <view v-if="!menubar" class="">
      <shortlist :list="last" />
    </view>
  </view>
</template>

<script>
import shortlist from '@/components/vertical.vue'
// import userList from '../post.json'
import request from '@/common/request'
import { mapState } from 'vuex'

export default {
  name: 'favorite',
  components: { shortlist },
  data() {
    return {
      menubar: true,
      last: [],
      favorite: []
      // list: []
    }
  },
  async onLoad(option) {
    await this.getData()
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      token: (state) => state.token
    })
  },
  watch: {
    async token(val, oldVal) {
      await this.getData()
    }
  },
  methods: {
    async getData() {
      const data = await request.post('/profile/favorite')
      this.favorite = data.favorite
      this.last = data.last
    },
    clickMenubar(state) {
      this.menubar = state
    }
  }
}
</script>

<style scoped>
.top {
  font-size: 1rem;
  margin: 3px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #555;
}
.top text {
  margin-right: 20px;
}
.top .active {
  font-weight: bold;
  padding: 0 4px 0 2px;
  padding-bottom: 8px;
  border-bottom: 2px solid orangered;
}
</style>
