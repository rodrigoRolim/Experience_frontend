import Vue from 'vue'
import Vuex from 'vuex'
import attendance from './modules/attendance'
import patients from './modules/patients'
import auth from './modules/auth'
import procediment from './modules/procediments'
import accomodations from './modules/accomodations'
import healthcenters from './modules/healthcenters'
import registrants from './modules/registrants'
import cancel from './modules/cancel'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    attendance,
    auth,
    procediment,
    accomodations,
    healthcenters,
    cancel,
    patients,
    registrants
  },
  strict: process.env.NODE_ENV !== 'production'
})
