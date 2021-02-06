import { SET_PROPS, CLEAN_PROPS } from '../../utils/alias'
import cookies from 'vue-cookies'
const state = () => ({
  patient: cookies.get('props')?.patient || null,
  attendance: cookies.get('props')?.attendance || null,
  healthCenter: cookies.get('props')?.healthCenter,
  namePatient: cookies.get('props')?.namePatient || null,
  agePatient: cookies.get('props')?.agePatient || null,
  genderPatient: cookies.get('props')?.genderPatient || null,
  deliveryDate: cookies.get('props')?.deliveryDate || null,
  doctor: cookies.get('props')?.doctor || null,
  healthInsurance: cookies.get('props')?.healthInsurance || null
})

const getters = {
  patient: state => state.patient,
  attendance: state => state.attendance,
  healthCenter: state => state.healthCenter,
  name: state => state.namePatient,
  age: state => state.agePatient,
  gender: state => state.genderPatient,
  delivery: state => state.deliveryDate,
  doctor: state => state.doctor,
  healthInsurance: state => state.healthInsurance
}

const actions = {

}

const mutations = {
  [SET_PROPS]: (state, payload) => {
    console.log(payload)
    let props = {
      patient: payload.patient,
      healthCenter: payload.healthCenter,
      attendance: payload.attendance,
      namePatient: payload.namePatient,
      agePatient: payload.agePatient,
      genderPatient: payload.genderPatient,
      deliveryDate: payload.deliveryDate,
      doctor: payload.doctor,
      healthInsurance: payload.healthInsurance
    }

    cookies.set('props', props)

    state.patient = payload.patient
    state.attendance = payload.attendance
    state.healthCenter = payload.healthCenter
    state.namePatient = payload.namePatient
    state.agePatient = payload.agePatient
    state.genderPatient = payload.genderPatient
    state.deliveryDate = payload.deliveryDate
    state.doctor = payload.doctor
    state.healthInsurance = payload.healthInsurance
  },
  [CLEAN_PROPS]: (state) => {
    cookies.remove('props')
    state.patient = null
    state.attendance = null
    state.healthCenter = null
    state.namePatient = null
    state.agePatient = null
    state.genderPatient = null
    state.deliveryDate = null
    state.doctor = null
    state.healthInsurance = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}