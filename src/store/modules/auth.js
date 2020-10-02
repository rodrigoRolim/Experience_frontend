import { requestToken } from '../../services/api'
import { 
    AUTH_ERROR, 
    AUTH_LOGOUT, 
    AUTH_SUCCESS,
    AUTH_REINIT_STATUS,
    AUTH_REQUEST 
  } from '../../utils/alias'

const state = () => ({
  token: localStorage.getItem('user-token') || "",
  user: localStorage.getItem('user-name') || "",
  identify: localStorage.getItem('user-id') || "",
  status: '',
  expired: localStorage.getItem('expired') || false,
  hasLoadedOnce: false,
  userType: localStorage.getItem('user-type') || ""
})

const getters = {
  isAuthenticated: state => !!state.token,
  authState: state => state.status,
  userTypeAuthed: state => state.userType,
  userName: state => state.user,
  userId: state => state.identify
}

const actions = {
  [AUTH_REQUEST]: ({ commit }, { url, credentials, typeUser }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)

      requestToken({ url, auth: credentials })
        .then((resp) => {
          localStorage.setItem('user-token', resp.data.token)
          localStorage.setItem('user-type', typeUser)
          localStorage.setItem('user-name', resp.data.nome)
          localStorage.setItem('user-id', resp.data.identificacao)
          commit(AUTH_SUCCESS, { resp, typeUser })
          resolve(resp)
        })
        .catch((err) => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('user-token')
          localStorage.removeItem('user-type')
          localStorage.removeItem('user-name')
          localStorage.removeItem('user-id')
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-type')
      localStorage.removeItem('user-name')
      localStorage.removeItem('user-id')
      resolve(true)
    })
  },
  [AUTH_REINIT_STATUS]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_REINIT_STATUS)
      resolve(true)
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
    state.user = resp.data.nome
    state.identify = resp.data.identificacao
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_REINIT_STATUS]: (state) => {
    state.status = ''
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