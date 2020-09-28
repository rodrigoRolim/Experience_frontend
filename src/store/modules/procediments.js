import { requestResource, source } from '../../services/api'
import { 
  GET_PROCEDIMENTS_STORE,
  GET_PROCEDIMENTS_LIKE_STORE, 
  SUCCESS_GET_PROCEDIMENT, 
  ERROR_GET_PROCEDIMENT, 
  LOADING_GET_PROCEDIMENT,
  CANCEL_REQUEST,
  DELETE_SOURCE
} from '../../utils/alias'

const state = () => ({
  procediments: [],
  procediment: {},
  status: '',
  source: source
})

const getters = {
  procediments: (state) => state.procediments,
  procediment: (state) => state.procediment
}

const actions = {
  [GET_PROCEDIMENTS_STORE]: ({ commit, state }, { url }) => {
    return new Promise((resolve, reject) => {
      commit(LOADING_GET_PROCEDIMENT)
      requestResource({ url, method: 'GET', source: state.source })
        .then((resp) => {
          commit(GET_PROCEDIMENTS_STORE, resp.data)
          commit(SUCCESS_GET_PROCEDIMENT)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR_GET_PROCEDIMENT)
          reject(err)
        })
    })
  },
  [GET_PROCEDIMENTS_LIKE_STORE]: ({ commit, state }, { url, params }) => {
    return new Promise((resolve, reject) => {
      commit(LOADING_GET_PROCEDIMENT)
      requestResource({ url, params, method: 'GET', source: state.source })
        .then((resp) => {
          commit(GET_PROCEDIMENTS_LIKE_STORE, resp.data)
          commit(SUCCESS_GET_PROCEDIMENT)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR_GET_PROCEDIMENT)
          reject(err)
        })
    })
  },
  [CANCEL_REQUEST]: ({ commit, state }) => {
    state.source.cancel('That request was cancelled')
    commit(DELETE_SOURCE)
  },
}

const mutations = {
  [GET_PROCEDIMENTS_STORE]: (state, procediment) => {
    state.procediment = procediment
  },
  [GET_PROCEDIMENTS_LIKE_STORE]: (state, procediments) => {
    state.procediments = procediments
  },
  [DELETE_SOURCE]: (state) => {
    delete state.source
  },
  [LOADING_GET_PROCEDIMENT]: (state) => {
    state.status = 'loading'
  },
  [SUCCESS_GET_PROCEDIMENT]: (state) => {
    state.status = 'ok'
  },
  [ERROR_GET_PROCEDIMENT]: (state) => {
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
