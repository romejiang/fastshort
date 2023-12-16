import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/common/request'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    user: {}
  },
  mutations: {
    token(state, token) {
      state.token = token
    },
    user(state, user) {
      state.user = user
    },
    logout(state) {
      state.token = ''
      state.user = {}
    }
  },
  actions: {
    async autoLogin(context) {
      if (!context.state.token) {
        const token = uni.getStorageSync('token')
        const user = uni.getStorageSync('user')
        if (token && user) {
          context.commit('token', token)
          context.commit('user', JSON.parse(user))
        } else {
          const res = await request.post('/public/anonymous', this.user)
          const { token, user } = res

          store.commit('token', token)
          store.commit('user', user)

          uni.setStorageSync('token', token)
          uni.setStorageSync('user', JSON.stringify(user))
        }
      }
    }
  }
})
export default store
