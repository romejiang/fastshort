import App from './App'
import messages from '@/locale/index'



let i18nConfig = {
  locale: uni.getLocale(), // 获取已设置的语言
  messages
}

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n' // v8.x
import store from '@/store'

Vue.prototype.$store = store
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  store,
  i18n,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
