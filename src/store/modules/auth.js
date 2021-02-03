import { requestToken } from '../../services/api'
import cookies from 'vue-cookies'
import { 
    AUTH_ERROR, 
    AUTH_LOGOUT, 
    AUTH_SUCCESS,
    AUTH_REINIT_STATUS,
    AUTH_REQUEST,
    SELECTED_HEALTHCENTER,
    REAUTH_REQUEST,
    MESSAGE
  } from '../../utils/alias'
import { httpMessage } from '../../utils/statusMessages'
const state = () => ({
  token: cookies.get('user-session')?.token || null,
  user: cookies.get('user-session')?.user_name || "",
  identify: cookies.get('user-session')?.identify || "",
  status: '',
  healthCenterLogged: cookies.get('healthcenter-logged') || undefined,
  expired: cookies.get('expired') || false,
  message: undefined,
  hasLoadedOnce: false,
  userType: cookies.get('user-session')?.user_type || "",
  uniqueAttendance: cookies.get('user-session')?.uniqueAttendance
})

const getters = {
  isAuthenticated: state => !!state.token,
  authState: state => state.status,
  userTypeAuthed: state => state.userType,
  userName: state => state.user,
  userId: state => state.identify || null,
  uniqueAttendance: state => state.uniqueAttendance,
  token: state => state.token,
  expired: state => state.expired,
  healthCenterLogged: state => state.healthCenterLogged?.id,
  message: state =>  state.message
}

const actions = {
  [AUTH_REQUEST]: ({ commit }, { url, uniqueAttendance, credentials, typeUser }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      requestToken({ url, auth: credentials })
        .then((resp) => {
          let user_session = {
            token: resp.data.token,
            user_type: typeUser,
            user_name: resp.data.nome,
            identify: resp.data.identificacao,
            uniqueAttendance
          }
          commit(MESSAGE, undefined)
          commit(AUTH_SUCCESS, user_session)
          cookies.remove('user-session')
          cookies.set('user-session', user_session)
          resolve(resp)
        })
        .catch((err) => {
          let refused = err.message == 'Network Error' ? 502 : undefined
          let options = {
            status: refused || err.response.status
          }
          commit(MESSAGE, options.status)
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
      cookies.remove('healthcenter-logged')
    }
    return !cookies.isKey('user-session')
  },
  [AUTH_REINIT_STATUS]: ({ commit, state }) => {
    commit(AUTH_REINIT_STATUS)
    return state.status === ''
  },
  [REAUTH_REQUEST]: ({ commit }, { url }) => {
    return new Promise((resolve, reject) => {
      requestToken({ url })
      .then((resp) => {
        let newUser_session = {
          token: resp.data.token,
          user_type: cookies.get('user-session').user_type,
          user_name: cookies.get('user-session').user_name,
          identify: cookies.get('user-session').identify,
          uniqueAttendance: cookies.get('user-session').uniqueAttendance
        }
        cookies.remove('user-session')
        cookies.set('user-session', newUser_session)
        resolve(resp.token)
      })
      .catch((err) => {
        commit(MESSAGE, err.response.status)
        commit(AUTH_ERROR, err)
        cookies.remove('user-session')
        reject(err.response.status)
      })
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = 'loading'
  },
  [REAUTH_REQUEST]: (state, newSession) => {
    state.token = newSession.token
    state.user = newSession.user_name
    state.identify = newSession.identify
    state.userType = newSession.user_type
    state.uniqueAttendance = newSession.uniqueAttendance
  },
  [SELECTED_HEALTHCENTER]: (state, healthcenter) => {
    cookies.set('healthcenter-logged', healthcenter)
    state.healthCenterLogged = healthcenter
  },
  [AUTH_SUCCESS]: (state, session) => {
    state.status = 'success'
    state.token = session.token
    state.user = session.user_name
    state.identify = session.identify
    state.userType = session.user_type
    state.uniqueAttendance = session.uniqueAttendance
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
    state.uniqueAttendance = true
    state.userType = ''
    state.message = undefined
  },
  [MESSAGE]: (state, status) => {
    console.log(status)
    const expiredSession = status === 401
    const message = httpMessage({ status, data: 'exams', experired: expiredSession })
    state.message = message
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
