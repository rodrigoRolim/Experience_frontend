import Vue from 'vue'
import Vuex from 'vuex'
import attendances from './modules/attendances'
import patientExams from './modules/patientExams'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    attendances,
    patientExams
  },
  strict: process.env.NODE_ENV !== 'production'
})
