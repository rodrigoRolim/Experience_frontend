import { 
  SET_PROPS, 
  CLEAN_PROPS,
  SET_PATIENT_NAME,
  SET_HEALTH_CENTER,
  SET_ATTENDANCE,
  SET_GENDER,
  SET_AGE,
  SET_DELIVERY_DATE,
  SET_DOCTOR,
  SET_HEALTH_INSURANCE
 } from '../../utils/alias'
import cookies from 'vue-cookies'
const state = () => ({
  patient: cookies.get('props')?.patient,
  attendance: cookies.get('props')?.attendance || null,
  healthCenter: cookies.get('props')?.healthCenter,
  namePatient: cookies.get('props')?.namePatient || null,
  agePatient: cookies.get('props')?.agePatient || null,
  genderPatient: cookies.get('props')?.genderPatient || null,
  deliveryDate: cookies.get('props')?.deliveryDate || null,
  doctor: cookies.get('props')?.doctor || null,
  healthInsurance: cookies.get('props')?.healthInsurance || null,
  attendanceDate: cookies.get('props')?.attendanceDate || null
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
  healthInsurance: state => state.healthInsurance,
  attendanceDate: state => state.attendanceDate
}

const actions = {

}

const mutations = {
  [SET_PROPS]: (state, payload) => {
    cookies.remove('props')
    let props = {
      patient: payload.patient,
      healthCenter: payload.healthCenter,
      attendance: payload.attendance,
      namePatient: payload.namePatient,
      agePatient: payload.agePatient,
      genderPatient: payload.genderPatient,
      deliveryDate: payload.deliveryDate,
      doctor: payload.doctor,
      healthInsurance: payload.healthInsurance,
      attendanceDate: payload.attendanceDate
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
    state.attendanceDate = payload.attendanceDate
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
    state.attendanceDate = null
  },
  [SET_PATIENT_NAME]: (state, newPatientName) => {
    let props = cookies.get('props');
    props.namePatient = newPatientName
    state.namePatient = newPatientName
    cookies.remove('props')
    cookies.set('props', props)
  },
  [SET_HEALTH_CENTER]: (state, newHealthCenter) => {
    let props = cookies.get('props');
    props.healthCenter = newHealthCenter
    state.healthCenter = newHealthCenter
    cookies.remove('props')
    cookies.set('props', props)
  },
  [SET_ATTENDANCE]: (state, newAttendance) => {
    let props = cookies.get('props');
    props.attendance = newAttendance
    state.attedance = newAttendance
    cookies.remove('props')
    cookies.set('props', props)
  },
  [SET_GENDER]: (state, newGender) => {
    let props = cookies.get('props');
    props.genderPatient = newGender
    state.genderPatient = newGender
    cookies.remove('props')
    cookies.set('props', props)
  },
  [SET_AGE]: (state, newAge) => {
    let props = cookies.get('props');
    props.agePatient = newAge
    state.agePatient = newAge
    cookies.remove('props')
    cookies.set('props', props)
  },
  [SET_DELIVERY_DATE]: (state, newDeliveryDate) => {
    let props = cookies.get('props');
    props.deliveryDate = newDeliveryDate
    state.deliveryDate = newDeliveryDate
    cookies.remove('props')
    cookies.set('props', props)
  },
  [SET_DOCTOR]: (state, newDoctor) => {
    let props = cookies.get('props');
    props.doctor = newDoctor
    state.doctor = newDoctor
    cookies.remove('props')
    cookies.set('props', props)
  },
  [SET_HEALTH_INSURANCE]: (state, newHealthInsurance) => {
    let props = cookies.get('props')
    props.healthInsurance = newHealthInsurance
    state.healthInsurance = newHealthInsurance
    cookies.remove('props')
    cookies.set('props', props)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}