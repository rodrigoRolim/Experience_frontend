import Vue from 'vue'
import Vuex from 'vuex'
import attendances from './modules/attendances'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    attendances
  },
  strict: debug
})
