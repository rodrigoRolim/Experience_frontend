import { requestToken } from '../../services/api'
import cookies from 'vue-cookies'
import { 
    AUTH_ERROR, 
    AUTH_LOGOUT, 
    AUTH_SUCCESS,
    AUTH_REINIT_STATUS,
    AUTH_REQUEST 
  } from '../../utils/alias'

const state = () => ({
  token: cookies.get('user-session')?.token || "",
  user: cookies.get('user-session')?.user_name || "",
  identify: cookies.get('user-session')?.identify || "",
  status: '',
  expired: cookies.get('expired') || false,
  hasLoadedOnce: false,
  userType: cookies.get('user-session')?.type_user || ""
})

const getters = {
  isAuthenticated: state => !!state.token,
  authState: state => state.status,
  userTypeAuthed: state => state.userType,
  userName: state => state.user,
  userId: state => state.identify,
  userType: state => state.typeUser,
  token: state => state.token
}

const actions = {
  [AUTH_REQUEST]: ({ commit }, { url, credentials, typeUser }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)

      requestToken({ url, auth: credentials })
        .then((resp) => {
          console.log(resp)
          let user_session = {
            token: resp.data.token,
            type_user: typeUser,
            user_name: resp.data.nome,
            identify: resp.data.identificacao,
          }
          commit(AUTH_SUCCESS, resp)
          console.log('here')
          cookies.remove('user-session')
          cookies.set('user-session', user_session, '1h')
          resolve(resp)
        })
        .catch((err) => {

          commit(AUTH_ERROR, err)
          cookies.remove('user-session')
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    
    if (cookies.isKey('user-session')) {
      commit(AUTH_LOGOUT)
      cookies.remove('user-session')
    }
    return !cookies.isKey('user-session')
  },
  [AUTH_REINIT_STATUS]: ({ commit }) => {
    commit(AUTH_REINIT_STATUS)
  }
}

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
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
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
    state.identify = ''
    state.user = ''
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