<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['autoLogin'])
  },
  onLaunch: function () {
    this.autoLogin()
  },
  // onShow: function () {
  // },
  // onHide: function () {
  // }
}
</script>

<style lang="scss">
@import '@/static/fonts/iconfont.css';
uni-button {
  line-height: 1.8;
}
/deep/ .uni-icon_toast {
  padding-bottom: 10px;
}
/deep/ .uni-toast {
  padding: 0 20px;
}
page {
  background-color: #181818;
  color: #fff;
}
.pages {
  padding: 10px 15px;
}
.statusbar {
  height: 35px;
}
.title {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 10px 0;
}

</style>
