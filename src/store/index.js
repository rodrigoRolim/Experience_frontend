import Vue from 'vue'
import Vuex from 'vuex'
import attendances from './modules/attendances'
import patient from './modules/patient'
import auth from './modules/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    attendances,
    patient,
    auth
  },
  strict: process.env.NODE_ENV !== 'production'
})
