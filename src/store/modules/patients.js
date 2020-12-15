import { requestResource } from '../../services/api'
import { 
  GET_ATTENDANCES_REQUESTER_STORE,
  LOADING_GET_ATTENDANCES_REQUESTER,
  SUCCESS_GET_ATTENDANCES_REQUESTER,
  ERROR_GET_ATTENDANCES_REQUESTER,
  TOTAL_ATTENDANCES,
  NAME,
  BEGIN_DATE,
  END_DATE,
  DEFAULT_DATES,
  ATTENDANCE_NOT_FOUND,
  PUSH_ATTENDANCES_STORE,
  SUCCESS_PUSH,
  ERROR_PUSH,
  LOADING_PUSH,
  REINIT_PAGINATION,
  NEXT_PAGE,
  TOTAL_PAGES
} from '../../utils/alias'

const state = () => ({
  patients: [],
  message: {},
  params: {
    begin: null,
    end: null,
    name: null,
    limit: 10,
    page: 1,
    totalPages: null
  },
  status: '',
  statusPush: '',
  total: 0
})
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
const getters = {
  patients: state => state.patients,
  params: state => state.params,
  status: state => state.status,
  statusPush: state => state.statusPush,
  total: state => state.total,
  message: state => state.message
}

const actions = {
  [GET_ATTENDANCES_REQUESTER_STORE]: ({ commit }, { url, params, headers }) => {
    commit(LOADING_GET_ATTENDANCES_REQUESTER)
    return new Promise((resolve, reject) => {
      requestResource({ url, params, method: 'GET', headers })
        .then((resp) => {
          commit(GET_ATTENDANCES_REQUESTER_STORE, resp.data.docs)
          commit(TOTAL_ATTENDANCES, resp.data.total)
          commit(TOTAL_PAGES, resp.data.pages)
          commit(ATTENDANCE_NOT_FOUND, {})
          commit(SUCCESS_GET_ATTENDANCES_REQUESTER)
          resolve(resp)
        })
        .catch((err) => {
          if (err.response.status == 404) {
            commit(GET_ATTENDANCES_REQUESTER_STORE, [])
            commit(TOTAL_ATTENDANCES, 0)
          }
          commit(ERROR_GET_ATTENDANCES_REQUESTER)
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
  }
}

const mutations = {
  [LOADING_GET_ATTENDANCES_REQUESTER]: (state) => {
    state.status = 'loading'
  },
  [SUCCESS_GET_ATTENDANCES_REQUESTER]: (state) => {
    state.status = 'success'
  },
  [ERROR_GET_ATTENDANCES_REQUESTER]: (state) => {
    state.status = 'error'
  },
  [GET_ATTENDANCES_REQUESTER_STORE]: (state, patients) => {
    state.patients = patients
  },
  [TOTAL_ATTENDANCES]: (state, total) => {
    state.total = total
  },
  [ATTENDANCE_NOT_FOUND]: (state, message) => {
    state.message = message
  },
  [DEFAULT_DATES]: (state) => {
    
    state.params.begin = begin()
    state.params.end =  end()

  },
  [NAME]: (state, patient) => {
    state.params.name = patient.toUpperCase()
  },
  [BEGIN_DATE]: (state, begin) => {
    state.params.begin = begin
  },
  [END_DATE]: (state, end) => {
    state.params.end = end
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
  },
  [PUSH_ATTENDANCES_STORE]: (state, newAttendances) => {
    state.patients.push(...newAttendances)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}