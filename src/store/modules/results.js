import { LOADING, MESSAGE, SUCCESS, ERROR, GET_RESULT_STORE } from "../../utils/alias";
import { httpMessage } from '../../utils/statusMessages'
import { requestResource } from '../../services/api'

const state = () => ({
  results: [],
  status: '',
  message: undefined
})

const getters = {
  results: state => state.results,
  status: state => state.status,
  message: state => state.message  
}

const actions = {
  [GET_RESULT_STORE]: ({ commit }, { url }) => {
    commit(LOADING)
    return new Promise((resolve, reject) => {
      requestResource({ url })
        .then((resp) => {
          commit(SUCCESS)
          commit(MESSAGE, undefined)
          commit(GET_RESULT_STORE, resp.data)
          resolve(resp.data)
        })
        .catch((err) => {
          commit(ERROR)
          commit(MESSAGE, err.response.status)
          reject(err)
        })
    });
  }
}

const mutations = {
  [GET_RESULT_STORE]: (state, results) => {
    state.results = results
  },
  [SUCCESS]: (state) => {
    state.status = 'ok'
  },
  [LOADING]: (state) => {
    state.status = 'loading'
  },
  [ERROR]: (state) => {
    state.status = 'error'
  },
  [MESSAGE]: (state, status) => {
    const expiredSession = status === 401
    const message = httpMessage({ status, data: 'resultado', experired: expiredSession })
    state.message = message
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}