import { requestResource } from '../../services/api'
import { 
  GET_ATTENDANCES_STORE,
  SELECTED_ATTENDANCE,
  CHANGE_SELECTED_ATTENDANCE,
  SUCCESS_GET_ATTENDANCE,
  ERROR_GET_ATTENDANCE
} from '../../utils/alias'

const state = {
  attendances: [],
  selectedAttendance: { healthCenter: '', id: '' },
  status: ''
}

const getters = {
  attendances: (state) => state.attendances,
  attendance: (state, getters) => (healthCenter, id) => { 
    return getters.attendances.find(att => att.posto === healthCenter && att.atendimento === id)
  },
  exams: (state, getters) => (healthCenter, id) => {
    console.log(healthCenter, id)
    console.log(getters.attendances.find(att => att.posto == healthCenter && att.atendimento == id)?.ExamesObj)
    return getters.attendances.find(att => att.posto == healthCenter && att.atendimento == id)?.ExamesObj
  },
  name: () => (patientName) => {
    return patientName.toUpperCase()
  },
  healthCenter: (state) => state.selectedAttendance.healthCenter,
  attendanceId: (state) => state.selectedAttendance.id,
  // bed: () => (bed) => getters.attendance(healthCenter, id)?.leito,
  // gender: (state, getters) => (healthCenter, id) => getGender(getters.attendance(healthCenter, id)?.sexo),
  // age: (state, getters) => (healthCenter, id) => getAgeByBirthday(getters.attendance(healthCenter, id)?.data_nas),
  // delivery: (state, getters) => (healthCenter, id) => getDeliveryDate(getters.attendance(healthCenter, id)?.data_entrega),
  // dataAttendance: (state, getters) => (healthCenter, id) => getters.attendance(healthCenter, id)?.data_entrega,
  // doctor: (state, getters) => (healthCenter, id) => ("Dr(a). " + getters.attendance(healthCenter, id)?.nome_solicitante),
  // accommodationName: (state, getters) => (healthCenter, id) => getters.attendance(healthCenter, id)?.nome_convenio,
  // healthCenterName: (state, getters) => (healthCenter, id) => getters.attendance(healthCenter, id)?.nome_posto,
  // agreementName: (state, getters) => (healthCenter, id) => getters.attendance(healthCenter, id)?.nome_convenio,
  // outstandingBalance: (state, getters) => (healthCenter, id) => getters.attendance(healthCenter, id)?.saldo_devedor,
  // patientId: (state, getters) => (healthCenter, id) => getters.attendance(healthCenter, id)?.registro,
  // accommodationId: (state, getters) => (healthCenter, id) => getters.attendance(healthCenter, id)?.acomodacao,
  // agreementId: (state, getters) => (healthCenter, id) => getters.attendance(healthCenter, id)?.convenio,
  // doctorId: (state, getters) => (healthCenter, id) => getters.attendance(healthCenter, id)?.id_solicitante,
  status: state => state.status,
}

const actions = {
  [GET_ATTENDANCES_STORE]: ({ commit }, { url }) => {
    
    return new Promise((resolve, reject) => {
     
      requestResource({ url, method: 'GET'})
        .then((resp) => {
          // let { posto, atendimento } = resp.data
          commit(GET_ATTENDANCES_STORE, resp.data)
          commit(SELECTED_ATTENDANCE)
          commit(SUCCESS_GET_ATTENDANCE)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR_GET_ATTENDANCE)
          reject(err)
        })
    })
  },
  [CHANGE_SELECTED_ATTENDANCE]: ({ commit }, {healthCenter, attendanceId}) => {
    commit(CHANGE_SELECTED_ATTENDANCE, {healthCenter, attendanceId})
  }
}

const mutations = {
  [GET_ATTENDANCES_STORE]: (state, attendances) => {
    state.attendances.push(attendances)
  },
  [SELECTED_ATTENDANCE]: (state) => {
    state.selectedAttendance.healthCenter = state.attendances[0].posto
    state.selectedAttendance.id = state.attendances[0].atendimento
  },
  [CHANGE_SELECTED_ATTENDANCE]: (state, { healthCenter, attendanceId }) => {
    state.selectedAttendance.healthCenter = healthCenter
    state.selectedAttendance.id = attendanceId
  },
  [SUCCESS_GET_ATTENDANCE]: (state) => {
    state.status = 'ok'
  },
  [ERROR_GET_ATTENDANCE]: (state) => {
    state.status = 'error'
  }
}
/* function getAgeByBirthday (dateString) {

  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  const ageDate = age.toString()
  return !isNaN(ageDate) ? ageDate : "";
}
function getGender (initial) {
  return [{initial: 'M', value: 'masculino'}, {initial: 'F', value: 'feminino'}]
    .find(item => item.initial === initial)?.value
}
function getDeliveryDate (dateString) {
  const delivery = new Date(dateString).toLocaleDateString("pt-BR")
  return delivery !== "Invalid Date" ? delivery : ""
}
 */
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}