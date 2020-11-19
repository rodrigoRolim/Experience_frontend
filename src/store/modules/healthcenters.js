import { requestResource } from '../../services/api'
import { GET_HEALTH_CENTERS_STORE, LOADING, ERROR, SUCCESS } from "../../utils/alias"
const state = () => ({
  healthCenters: [],
  status: ''
})

const getters = {
  healthCenters: state => {
    let hcs = state.healthCenters.map((hc => ({id: hc.nome, name: hc.nome})))
    hcs.push({ id: '', name: 'TODOS' })
    return hcs
  },
  status: state => state.status
}

const actions = {
  [GET_HEALTH_CENTERS_STORE]: ({commit}, { url }) => {
    commit(LOADING)
    return new Promise((resolve, reject) => {
      requestResource({ url, method: 'GET' })
        .then((resp) => {
          commit(GET_HEALTH_CENTERS_STORE, resp.data)
          commit(SUCCESS)
          resolve(resp.data)
        })
        .catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
  }
}

const mutations = {
  [GET_HEALTH_CENTERS_STORE]: (state, healthCenters) => {
    state.healthCenters = healthCenters
  },
  [LOADING]: (state) => {
    state.status = 'loading'
  },
  [ERROR]: (state) => {
    state.status = 'error'
  },
  [SUCCESS]: (state) => {
    state.status = 'ok'
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}