import { requestResource } from '../../services/api'

import { 
  GET_ATTENDANCES_STORE,
  SELECTED_ATTENDANCE,
  CHANGE_SELECTED_ATTENDANCE,
  SUCCESS_GET_ATTENDANCE,
  LOADING_GET_ATTENDANCE,
  SELECT_EXAMS,
  BEGIN_DATE,
  END_DATE,
  EMPTY_EXAMS,
  EMPTY_ATTENDANCES,
  ERROR_GET_ATTENDANCE,
  ATTENDANCE_NOT_FOUND
} from '../../utils/alias'

const state = {
  attendances: [],
  selectedAttendance: { healthCenter: '', id: '' },
  selectedExams: '',
  status: '',
  message: {}
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
  healthCenters: () => {
  
  },
  accomodations: () => {
   
  },
  situations: () => {
   
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
  status: state => state.status,
  message: state => state.message
}

const actions = {
  [GET_ATTENDANCES_STORE]: ({ commit }, { url, params }) => {
    return new Promise((resolve, reject) => {
      commit(LOADING_GET_ATTENDANCE)
      requestResource({ url, params, method: 'GET' })
        .then((resp) => {
          commit(GET_ATTENDANCES_STORE, resp.data.docs || resp.data)
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
  [ATTENDANCE_NOT_FOUND]: ({ commit }, message) => {
    commit(ATTENDANCE_NOT_FOUND, message)
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
    state.attendances = attendances
  },
  [ATTENDANCE_NOT_FOUND]: (state, message) => {
    state.message = message
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
  [EMPTY_ATTENDANCES]: (state) => {
    state.attendances = []
  },
  [EMPTY_EXAMS]: (state) => {
    state.selectedExams = []
  },
  [LOADING_GET_ATTENDANCE]: (state) => {
    state.status = 'loading'
  },
  [SUCCESS_GET_ATTENDANCE]: (state) => {
    state.status = 'ok'
  },
  [ERROR_GET_ATTENDANCE]: (state) => {
    state.status = 'error'
  }
}
/* let situationExperience = (situation) => {
  switch(situation) {
    case 'TF':
      return 'Finalizados'
    case 'PF':
      return 'Parcialmente Finalizados'
    case 'EA':
      return 'Em Andamento'
    case 'EP':
      return 'Com Pendencias'
    case 'N':
      return 'Não realizados'
  }
}
let NoHasElement = (arr, propertyArr, item, propertyAtt) => {
  if (arr.length == 0) {
    return true
  }
  return !arr.some(it => it[propertyArr] === item[propertyAtt])
} */
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}