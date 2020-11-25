import { requestResource } from '../../services/api'

import { 
  GET_ATTENDANCES_STORE,
  CHANGE_SELECTED_ATTENDANCE,
  SUCCESS,
  LOADING,
  ERROR,
  SELECT_EXAMS,
  BEGIN_DATE,
  END_DATE,
  EMPTY_EXAMS,
  EMPTY_ATTENDANCES,
  ATTENDANCE_NOT_FOUND,
//PARAMS_ATTENDANCES,
  HEALTH_CENTER,
  ACCOMODATION,
  SITUATION,
  NAME,
  REALIZER,
  DEFAULT_DATES,
  SUCCESS_PUSH,
  LOADING_PUSH,
  ERROR_PUSH,
  PUSH_ATTENDANCES_STORE,
  NEXT_PAGE,
  REINIT_PAGINATION,
  TOTAL_PAGES,
  FILTER_ATTENDANCES_BY_NAME
} from '../../utils/alias'
let begin = () => {
  let today = new Date()
  today.setDate(today.getDate() - 7)
  let currDate = (today.getDate() < 10) ? '0' + today.getDate() : today.getDate()
  let currMonth = today.getMonth() + 1
  let currYear = today.getFullYear()
  let dateInitial = currDate + ' / ' + currMonth + ' / ' + currYear
  return dateInitial
}
let end = () => {
  let today = new Date()

  let nextDate = (today.getDate() < 10) ? '0' + today.getDate() : today.getDate()
  let nextMonth = today.getMonth() + 1
  let nextYear = today.getFullYear()
  let dateFinal = nextDate + ' / ' + nextMonth + ' / ' + nextYear
  return dateFinal
}
const state = {
  attendances: [],
  filteredAttendances: [],
  status: '',
  statusPush: '',
  message: {},
  params: {
    begin: begin(),
    end: end(),
    healthCenter: {id: '', name: 'todos' },
    accomodation: {id: '', name: 'todos' },
    situation: {id: '', name: 'todos' },
    realizer: {id: '', name: 'todos' },
    name: null,
    limit: 10,
    page: 1,
    totalPages: null
  }
  // guarde os filtros selecionados aqui tambem
}

const getters = {
  attendances: (state) => state?.attendances,
  name: () => (patientName) => {
    return patientName.toUpperCase()
  },
  examsToPrint: (state) => state.selectedExams,
  status: state => state.status,
  statusPush: state => state.statusPush,
  message: state => state.message,
  params: state => state.params
}

const actions = {
  [GET_ATTENDANCES_STORE]: ({ commit }, { url, params, headers }) => {
    commit(REINIT_PAGINATION)
    commit(LOADING)
    return new Promise((resolve, reject) => {
      requestResource({ url, params, method: 'GET', headers })
        .then((resp) => {
          commit(GET_ATTENDANCES_STORE, resp.data.docs || resp.data)
          commit(TOTAL_PAGES, resp.data.pages)
          commit(SUCCESS)
          commit(ATTENDANCE_NOT_FOUND, {})
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
  },
  [FILTER_ATTENDANCES_BY_NAME]: ({ commit }, { url, params, headers }) => {
    commit(REINIT_PAGINATION)
    commit(LOADING)
    
    return new Promise((resolve, reject) => {
      requestResource({ url, params, method: 'GET', headers })
        .then((resp) => {
          commit(GET_ATTENDANCES_STORE, resp.data.docs)
          commit(TOTAL_PAGES, resp.data.pages)
          commit(SUCCESS)
          commit(ATTENDANCE_NOT_FOUND, {})
          resolve(resp)
        }).
        catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
  },
  [PUSH_ATTENDANCES_STORE]: ({ commit }, { url, params, headers }) => {
    commit(LOADING_PUSH)
    return new Promise((resolve, reject) => {
      requestResource({ url, params, method: 'GET', headers})
      .then((resp) => {
        commit(PUSH_ATTENDANCES_STORE, resp.data.docs)
        commit(SUCCESS_PUSH)
        resolve(resp)
      })
      .catch((err) => {
        commit(ERROR_PUSH)
        reject(err)
      })
    })
    
  },
  [ATTENDANCE_NOT_FOUND]: ({ commit }, message) => {
    commit(ATTENDANCE_NOT_FOUND, message)
  }, 
  [CHANGE_SELECTED_ATTENDANCE]: ({ commit }, {healthCenter, attendanceId}) => {
    commit(CHANGE_SELECTED_ATTENDANCE, { healthCenter, attendanceId })
  },
  [SELECT_EXAMS]: ({ commit }, exams) => {
    commit(SELECT_EXAMS, exams)
  },
  [EMPTY_EXAMS]: ({ commit }) => {
    commit(EMPTY_EXAMS)
  }
}

const mutations = {
  [GET_ATTENDANCES_STORE]: (state, attendances) => {
    state.attendances = attendances
  },
  [PUSH_ATTENDANCES_STORE]: (state, newAttendances) => {
    state.attendances.push(...newAttendances)
  },
  [ATTENDANCE_NOT_FOUND]: (state, message) => {
    state.message = message
  },
  [EMPTY_ATTENDANCES]: (state) => {
    state.attendances = []
  },
  [LOADING]: (state) => {
    state.status = 'loading'
  },
  [SUCCESS]: (state) => {
    state.status = 'ok'
  },
  [ERROR]: (state) => {
    state.status = 'error'
  },
  [BEGIN_DATE]: (state, begin) => {
    state.params.begin = begin
  },
  [END_DATE]: (state, end) => {
    state.params.end = end
  },
  [DEFAULT_DATES]: (state) => {
    
    let today = new Date()

    let nextDate = (today.getDate() < 10) ? '0' + today.getDate() : today.getDate()
    let nextMonth = today.getMonth() + 1
    let nextYear = today.getFullYear()
    let dateFinal = nextDate + ' / ' + nextMonth + ' / ' + nextYear

    today.setDate(today.getDate() - 7)

    let currDate = (today.getDate() < 10) ? '0' + today.getDate() : today.getDate()
    let currMonth = today.getMonth() + 1
    let currYear = today.getFullYear()
    let dateInitial = currDate + ' / ' + currMonth + ' / ' + currYear
   
    state.params.begin = dateInitial
    state.params.end =  dateFinal
  },
  [ACCOMODATION]: (state, accomodation) => {
    state.params.accomodation = accomodation
  },
  [HEALTH_CENTER]: (state, healthCenter) => {
    console.log(healthCenter)
    state.params.healthCenter = healthCenter
  },
  [SITUATION]: (state, situation) => {
    state.params.situation = situation
  },
  [REALIZER]: (state, realizer) => {
    state.params.realizer = realizer
  },
  [NAME]: (state, name) => {
    state.params.name = name
  },
  [SUCCESS_PUSH]: (state) => {
    state.statusPush = 'ok'
  },
  [ERROR_PUSH]: (state) => {
    state.statusPush = 'error'
  },
  [LOADING_PUSH]: (state) => {
    state.statusPush = 'loading'
  },
  [REINIT_PAGINATION]: (state) => {
    state.params.page = 1
  },
  [NEXT_PAGE]: (state) => {
    if (state.params.page < state.params.totalPages)
     state.params.page += 1
  },
  [TOTAL_PAGES]: (state, pages) => {
    state.params.totalPages = pages
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}