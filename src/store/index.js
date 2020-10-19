import Vue from 'vue'
import Vuex from 'vuex'
import attendance from './modules/attendance'
import auth from './modules/auth'
import procediment from './modules/procediments'
import accomodations from './modules/accomodations'
import cancel from './modules/cancel'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    attendance,
    auth,
    procediment,
    accomodations,
    cancel
  },
  strict: process.env.NODE_ENV !== 'production'
})
