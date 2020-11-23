import { ERROR, GET_EXAMS_STORE, LOADING, SUCCESS } from '../../utils/alias'
import { requestResource } from '../../services/api'
const state = () => ({
  exams: [],
  params: {
    limit: 10,
    page: 1
  },
  status: ''
})

const getters = {
  exams: state => state.exams,
  status: state => state.status,
  params: state => state.params
}

const actions = {
  [GET_EXAMS_STORE]: ({commit, state}, { url, params = state.params, headers }) => {
    commit(LOADING)
    return new Promise((resolve, reject) => {
      requestResource({ url, params, method: 'GET', headers })
        .then((resp) => {
          commit(GET_EXAMS_STORE, resp.data)
          commit(SUCCESS)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
    
  }
}

const mutations = {
  [GET_EXAMS_STORE]: (state, exams) => {
    state.exams = exams
  },
  [LOADING]: (state) => {
    state.status = 'loading'
  },
  [SUCCESS]: (state) => {
    state.status = 'ok'
  },
  [ERROR]: (state) => {
    state.status = 'error'
  } 
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}