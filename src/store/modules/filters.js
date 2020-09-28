import { multipleRequests } from '../../services/api'
import { GET_FILTERS_STORE } from '../../utils/alias'

const state = () => ({
  healthCenters: [],
  accomodations: [],
  situations: [],
  realizers: [],
  status: ''
})

const getters = {

}

const actions = {
  [GET_FILTERS_STORE]: ({ commit }, cbs) => {
    return new Promise((resolve, reject) => {
      commit(LOADING_GET_FILTER)
      multipleRequests(cbs)
        .then(multipleRequests.axios.spread((hc, acc, sit, rel) => {
          commit(GET_FILTERS_STORE, {
            hc,
            acc,
            sit,
            rel
          })
          resolve({
            hc,
            acc,
            sit,
            rel
          })
        }))
        .catch((err) => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [GET_FILTERS_STORE]: (state, payload) => {
    state.healthCenters = payload.hc
    state.accomodations = payload.acc
    state.situations = payload.sit
    state.realizers = payload.rel
  },
  [SUCCESS_GET_FILTERS]: (state) => {
    state.status = 'ok'
  },
  [ERROR_GET_FILTERS]: (state) => {
    state.status = 'error'
  },
  [LOADING_GET_FILTER]: (state) => {
    state.status = 'loading'
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}