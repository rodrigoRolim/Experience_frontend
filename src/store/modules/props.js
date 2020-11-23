import { SET_PROPS, CLEAN_PROPS } from '../../utils/alias'
import cookies from 'vue-cookies'
const state = () => ({
  patient: cookies.get('props')?.patient || null,
  attendance: cookies.get('props')?.attendance || null,
  healthCenter: cookies.get('props')?.healthCenter || null,
  namePatient: null,
  agePatient: null,
  genderPatient: null,
  deliveryDate: null,
  doctor: null
})

const getters = {
  patient: state => state.patient,
  attendance: state => state.attendance,
  healthCenter: state => state.healthCenter
}

const actions = {

}

const mutations = {
  [SET_PROPS]: (state, payload) => {
    let props = {
      patient: payload.patient,
      healthCenter: payload.healthCenter,
      attendance: payload.attendance,
      namePatient: payload.namePatient,
      agePatient: payload.agePatient,
      genderPatient: payload.genderPatient,
      deliveryDate: payload.deliveryDate,
      doctor: payload.doctor
    }
    cookies.set('props', props)
    state.patient = payload.patient
    state.attendance = payload.attendance
    state.healthCenter = payload.healthCenter
  },
  [CLEAN_PROPS]: (state) => {
    cookies.remove('props')
    state.patient = null
    state.attendance = null
    state.healthCenter = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}