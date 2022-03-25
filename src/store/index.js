import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  getters: {
    // 相当于Java里的get
    getUserInfo: state => {
      return state.userInfo
    },
    getToken:state=>{
      return state.token
    }
  },
  mutations: {
    // 相当于Java里的set
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token", token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo)) //序列化存入浏览器会话中
    },
    REMOVE_INFO(state) {
      state.token = ''
      state.userInfo = {}
      localStorage.removeItem("token")
      sessionStorage.removeItem("userInfo")
    }
  },
  actions: {},
  modules: {}
})