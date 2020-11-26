import { requestResource } from '../../services/api'
import { 
  GET_ATTENDANCES_REQUESTER_STORE,
  LOADING_GET_ATTENDANCES_REQUESTER,
  SUCCESS_GET_ATTENDANCES_REQUESTER,
  ERROR_GET_ATTENDANCES_REQUESTER,
  TOTAL_ATTENDANCES
} from '../../utils/alias'

const state = () => ({
  patients: [],
  params: {
    begin: null,
    end: null,
    limit: 10,
    page: 1
  },
  status: '',
  total: 0
})

const getters = {
  patients: state => state.patients,
  status: state => state.status,
  total: state => state.total
}

const actions = {
  [GET_ATTENDANCES_REQUESTER_STORE]: ({ commit }, { url, params, headers }) => {
    commit(LOADING_GET_ATTENDANCES_REQUESTER)
    return new Promise((resolve, reject) => {
      requestResource({ url, params, method: 'GET', headers })
        .then((resp) => {
          commit(GET_ATTENDANCES_REQUESTER_STORE, resp.data.docs)
          commit(TOTAL_ATTENDANCES, resp.data.total)
          commit(SUCCESS_GET_ATTENDANCES_REQUESTER)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR_GET_ATTENDANCES_REQUESTER)
          reject(err)
        })
    })
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}