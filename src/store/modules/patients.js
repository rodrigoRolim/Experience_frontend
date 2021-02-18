import { requestResource } from '../../services/api'
import { 
  GET_PATIENT_STORE,
  LOADING,
  SUCCESS,
  ERROR,
  TOTAL_PATIENTS,
  NAME,
  BEGIN_DATE,
  END_DATE,
  DEFAULT_DATES,
  PUSH_PATIENT_STORE,
  SUCCESS_PUSH,
  ERROR_PUSH,
  LOADING_PUSH,
  REINIT_PAGINATION,
  NEXT_PAGE,
  TOTAL_PAGES,
  MESSAGE
} from '../../utils/alias'
import { httpMessage } from '../../utils/statusMessages'
import { begin, end } from  '../../utils/initialDates'
const state = () => ({
  patients: [],
  message: undefined,
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

const getters = {
  patients: state => state.patients,
  params: state => state.params,
  status: state => state.status,
  statusPush: state => state.statusPush,
  total: state => state.total,
  message: state => state.message
}

const actions = {
  [GET_PATIENT_STORE]: ({ commit }, { url, params, headers }) => {
    commit(LOADING)
    commit(MESSAGE, undefined)
    commit(TOTAL_PATIENTS, 0)
    commit(GET_PATIENT_STORE, [])
    return new Promise((resolve, reject) => {
      requestResource({ url, params, method: 'GET', headers })
        .then((resp) => {
          commit(GET_PATIENT_STORE, resp.data.docs)
          commit(TOTAL_PATIENTS, resp.data.total)
          commit(TOTAL_PAGES, resp.data.pages)
          commit(SUCCESS)
          resolve(resp)
        })
        .catch((err) => {
          let status = ''
          if (!err.response) {
            status = 408
          } else {
            status = err.response.status
          }
         // if (err.response.status == 404) {
          
          commit(TOTAL_PATIENTS, 0)
          //}
          commit(ERROR)
          commit(MESSAGE, status)
          reject(err)
        })
    })
  },
  [PUSH_PATIENT_STORE]: ({ commit }, { url, params, headers }) => {
    commit(LOADING_PUSH)
    return new Promise((resolve, reject) => {
      requestResource({ url, params, method: 'GET', headers})
        .then((resp) => {
          commit(PUSH_PATIENT_STORE, resp.data.docs)
          commit(SUCCESS_PUSH)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR_PUSH)
          reject(err)
        })
    })
  }
}

const mutations = {
  [LOADING]: (state) => {
    state.status = 'loading'
    state.patients = []
  },
  [SUCCESS]: (state) => {
    state.status = 'success'
  },
  [ERROR]: (state) => {
    state.status = 'error'
  },
  [MESSAGE]: (state, status) => {
    const message = httpMessage({ status, data: 'paciente' })
    state.message = message
  },
  [GET_PATIENT_STORE]: (state, patients) => {
    state.patients = patients
  },
  [TOTAL_PATIENTS]: (state, total) => {
    state.total = total
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
  [PUSH_PATIENT_STORE]: (state, newAttendances) => {
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