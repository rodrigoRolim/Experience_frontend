import { requestResource } from '../../services/api'
import { 
  GET_ATTENDANCES_STORE,
  SELECTED_ATTENDANCE,
  CHANGE_SELECTED_ATTENDANCE,
  SUCCESS_GET_ATTENDANCE,
  SELECT_EXAMS,
  BEGIN_DATE,
  END_DATE,
  EMPTY_EXAMS,
  ERROR_GET_ATTENDANCE
} from '../../utils/alias'

const state = {
  attendances: [],
  selectedAttendance: { healthCenter: '', id: '' },
  selectedExams: '',
  status: ''
}

const getters = {
  attendances: (state) => state?.attendances,
  attendance: (state, getters) => (healthCenter, id) => { 
    return getters.attendances.find(att => att.posto === healthCenter && att.atendimento === id)
  },
  exams: (state, getters) => (healthCenter, id) => {
    return getters.attendances
      .find(att => att.posto == healthCenter && att.atendimento == id)?.ExamesObj
  },
  name: () => (patientName) => {
    return patientName.toUpperCase()
  },
  healthCenter: (state) => state.selectedAttendance.healthCenter,
  attendanceId: (state) => state.selectedAttendance.id,
  hasFinalizedExam: (state) => {
    return state.attendances?.some(att => {
      return att.ExamesObj.some(exam => exam.situacao === 'N')
    })
  },
  examsToPrint: (state) => state.selectedExams,
  status: state => state.status
}

const actions = {
  [GET_ATTENDANCES_STORE]: ({ commit }, { url, headers }) => {
    return new Promise((resolve, reject) => {
     
      requestResource({ url, headers, method: 'GET'})
        .then((resp) => {
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
  },
  [SELECT_EXAMS]: ({ commit }, exams) => {
    commit(SELECT_EXAMS, exams)
  },
  [EMPTY_EXAMS]: ({ commit }) => {
    commit(EMPTY_EXAMS)
  },
  [BEGIN_DATE]: ({ commit }, date) => {
    commit(BEGIN_DATE, date)
  },
  [END_DATE]: ({ commit }, date) => {
    commit(END_DATE, date)
  }
}

const mutations = {
  [GET_ATTENDANCES_STORE]: (state, attendances) => {
    state.attendances = []
    if (typeof attendances === Array) {
      state.attendances = attendances
      return
    }
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
  [SELECT_EXAMS]: (state, exams) => {
    state.selectedExams = exams
  },
  [BEGIN_DATE]: (state, begin) => {
    state.begin = begin
  },
  [END_DATE]: (state, end) => {
    state.end = end
  },
  [EMPTY_EXAMS]: (state) => {
    state.selectedExams = []
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