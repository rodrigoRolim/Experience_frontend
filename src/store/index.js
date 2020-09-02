import Vue from 'vue'
import Vuex from 'vuex'
import attendance from './modules/attendance'
import auth from './modules/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    attendance,
    auth
  },
  strict: process.env.NODE_ENV !== 'production'
})
