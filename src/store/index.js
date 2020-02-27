import Vue from 'vue'
import Vuex from 'vuex'
import Attendances from './Attendances'
import Exams from './Exams'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { Attendances, Exams }
})
