import { LOADING, MESSAGE, SUCCESS, ERROR, GET_REPORT_STORE } from "../../utils/alias";
import { httpMessage } from '../../utils/statusMessages'
import { requestPDF } from '../../services/api'
const state = () => ({
  status: '',
  message: undefined
})

const getters = {
  status: state => state.status,
  message: state => state.message  
}

const actions = {
  [GET_REPORT_STORE]: ({ commit }, { url, params }) => {
    commit(LOADING)
    return new Promise((resolve, reject) => {
      requestPDF({ url, params })
        .then((resp) => {
          commit(SUCCESS)
          commit(MESSAGE, undefined)
          console.log(resp)
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