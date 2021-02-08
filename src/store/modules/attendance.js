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
  //EMPTY_ATTENDANCES,
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
  FILTER_ATTENDANCES_BY_NAME,
  EMPTY_PARAMS,
  REINIT_STATE,
  MESSAGE,
  EMPTY_ATTENDANCES
} from '../../utils/alias'
import { httpMessage } from '../../utils/statusMessages'
import { begin, end } from '../../utils/initialDates'
const state = {
  attendances: [],
  filteredAttendances: [],
  status: '',
  statusPush: '',
  message: undefined,
  params: {
    begin: null,
    end: null,
    healthCenter: { id: '', name: 'todos' },
    accomodation: { id: '', name: 'todos' },
    situation: { id: '', name: 'todos' },
    realizer: { id: '', name: 'todos' },
    name: null,
    limit: 10,
    page: 1,
    totalPages: null
  }
}

const getters = {
  attendances: (state) => state?.attendances,
  total: (state) => state.attendances.length,
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
    commit(EMPTY_ATTENDANCES)
    commit(LOADING)
    return new Promise((resolve, reject) => {
      requestResource({ url, params, method: 'GET', headers })
        .then((resp) => {
          commit(GET_ATTENDANCES_STORE, resp.data.docs || resp.data)
          commit(TOTAL_PAGES, resp.data.pages)
          commit(SUCCESS)
          commit(MESSAGE, undefined)
          resolve(resp)
        })
        .catch((err) => {
          
          commit(MESSAGE, err.response.status)
          commit(ERROR)
          reject(err)
        })
    })
  },
  [FILTER_ATTENDANCES_BY_NAME]: ({ commit }, { url, params, headers }) => {
    commit(MESSAGE, undefined)
    commit(REINIT_PAGINATION)
    commit(LOADING)
    return new Promise((resolve, reject) => {
      requestResource({ url, params, method: 'GET', headers })
        .then((resp) => {
          commit(GET_ATTENDANCES_STORE, resp.data.docs)
          commit(TOTAL_PAGES, resp.data.pages)
          commit(SUCCESS)
          resolve(resp)
        }).
        catch((err) => {
          commit(MESSAGE, err.response.status)
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
          //commit(MESSAGE, undefined)
          resolve(resp)
        })
        .catch((err) => {
          //commit(MESSAGE, err.response.status)
          commit(ERROR_PUSH)
          reject(err)
        })
    })
    
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
  [MESSAGE]: (state, status) => {
    const message = httpMessage({ status, data: 'atendimentos' })
    console.log(message)
    state.message = message
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
  [EMPTY_PARAMS]: (state) => {
    state.params.begin = null
    state.params.end = null
    state.params.name = null
    state.params.totalPages = null
  },
  [DEFAULT_DATES]: (state) => {
    
    state.params.begin = begin()
    state.params.end =  end()
  },
  [ACCOMODATION]: (state, accomodation) => {
    state.params.accomodation = accomodation
  },
  [HEALTH_CENTER]: (state, healthCenter) => {
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
  [EMPTY_ATTENDANCES]: (state) => {
    state.attendances = []
  },
  [NEXT_PAGE]: (state) => {
    if (state.params.page < state.params.totalPages)
     state.params.page += 1
  },
  [TOTAL_PAGES]: (state, pages) => {
    state.params.totalPages = pages
  },
  [REINIT_STATE]: (state) => {
    state.attendances = []
    state.attendances.filteredAttendances = []
    state.status = ''
    state.statusPush = ''
    state.message = {}
    state.params.begin = begin()
    state.params.end = end()
    state.params.healthCenter = {id: '', name: 'todos' }
    state.params.accomodation = {id: '', name: 'todos' }
    state.params.situation = {id: '', name: 'todos' }
    state.params.realizer = {id: '', name: 'todos' }
    state.params.name = null
    state.params.limit = 10
    state.params.page = 1
    state.params.totalPages = null
    state.message = undefined
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}