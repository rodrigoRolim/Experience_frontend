
import { requestToken } from '../../services/api'
import { 
    AUTH_ERROR, 
    AUTH_LOGOUT, 
    AUTH_SUCCESS, 
    AUTH_REQUEST 
  } from '../../utils/alias'

const state = () => ({
  token: localStorage.getItem('user-token') || "",
  status: '',
  hasLoadedOnce: false,
  userType: localStorage.getItem('user-type') || ""
})

const getters = {
  isAuthenticated: state => !!state.token,
  authState: state => state.status,
  userTypeAuthed: state => state.userType
}

const actions = {
  [AUTH_REQUEST]: ({ commit }, { url, credentials, typeUser }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      requestToken({ url, auth: credentials })
        .then((resp) => {
          localStorage.setItem('user-token', resp.data.token)
          localStorage.setItem('user-type', typeUser)
          commit(AUTH_SUCCESS, { resp, typeUser })
          resolve(resp)
        })
        .catch((err) => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('user-token')
          localStorage.removeItem('user-type')
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-type')
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, { resp, typeUser }) => {
    state.status = 'success'
    state.userType = typeUser
    state.token = resp.data.token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: state => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: state => {
    state.token = ''
    state.status = ''
    state.userType = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}