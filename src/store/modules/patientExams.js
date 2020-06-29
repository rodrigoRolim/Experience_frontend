const state = () => ({
  attendancesDisplay: false,
  examsDisplay: true,
  patientDisplay: false
})

const getters = {
  collapser (state) {
    return state.attendancesDisplay
  }
}

const actions = {
  // async
  toggleSidebar ({ commit }) {
    setTimeout(() => {
      commit('toggleSidebar')
    }, 1000)
    
  }
}

const mutations = {
  // sync
  toggleSidebar (state) {

    state.attendancesDisplay = !state.attendancesDisplay
  },
  showAttendances (state) {
    state.attendancesDisplay = true
    state.examsDisplay = false
    state.patientDisplay = false
  },
  showExams (state) {
    state.attendancesDisplay = false
    state.examsDisplay = true
    state.patientDisplay = false
  },
  showPatient (state) {
    state.attendancesDisplay = false
    state.examsDisplay = false
    state.patientDisplay = true
  },
  setAttendances (state, payload) {
    state.attendancesDisplay = payload.value
  },
  setExams (state, payload) {
    state.examsDisplay = payload.value
  },
  setPatient (state, payload) {
    state.patientDisplay = payload.value
  },
  setCollapser (state, payload) {

    state.attendancesDisplay = payload.value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}