import { requestResource } from '../../services/api'
import {
  GET_CURRENT_ATTENDANCES,
  SET_CURRENT_ATTENDANCES,
  SUCCESS,
  LOADING,
  ERROR
} from '../../utils/alias'
const state  = () => ({
  currentAttendances: [],
  status: ''
})

const getters = {
  currentAttendances: state => state.currentAttendances,
  status: state => state.status
}

const actions = {
  [GET_CURRENT_ATTENDANCES]: ({ commit }, { url, params = {}, headers = {} }) => {
    commit(LOADING);
    return new Promise((resolve, reject) => {
      requestResource({ url, params, method: 'GET', headers })
        .then((res) => {
          console.log(res)
          commit(SET_CURRENT_ATTENDANCES, res.data);
          commit(SUCCESS);
          resolve(res)
        })
        .catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
  }
}

const mutations = {
  [SET_CURRENT_ATTENDANCES]: (state, currentAttendances) => {
    console.log(currentAttendances)
    state.currentAttendances = currentAttendances
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