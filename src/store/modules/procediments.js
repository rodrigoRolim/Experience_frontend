import { requestResource } from '../../services/api'
import { 
  GET_PROCEDIMENTS_STORE,
  GET_PROCEDIMENTS_LIKE_STORE, 
  SUCCESS, 
  ERROR, 
  LOADING,
  CANCEL_REQUEST,
  DELETE_SOURCE,
  EMPTY_STATE
} from '../../utils/alias'

const state = () => ({
  procediments: [],
  procediment: {},
  status: ''
})

const getters = {
  procediments: (state) => state.procediments,
  procediment: (state) => state.procediment,
  status: (state) => state.status
}

const actions = {
  [GET_PROCEDIMENTS_STORE]: ({ commit }, { url }) => {
    commit(LOADING)
    commit(EMPTY_STATE)
    return new Promise((resolve, reject) => {
      requestResource({ url, method: 'GET' })
        .then((resp) => {
          commit(GET_PROCEDIMENTS_STORE, resp.data)
          commit(SUCCESS)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          commit(EMPTY_STATE)
          reject(err)
        })
    })
  },
  [GET_PROCEDIMENTS_LIKE_STORE]: ({ commit, state }, { url, params }) => {
    return new Promise((resolve, reject) => {
      commit(LOADING)
      requestResource({ url, params, method: 'GET', source: state.source })
        .then((resp) => {
          commit(GET_PROCEDIMENTS_LIKE_STORE, resp.data)
          commit(SUCCESS)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
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
  [LOADING]: (state) => {
    state.status = 'loading'
  },
  [SUCCESS]: (state) => {
    state.status = 'ok'
  },
  [ERROR]: (state) => {
    state.status = 'error'
  },
  [EMPTY_STATE]: (state) => {
    state.procediments = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
