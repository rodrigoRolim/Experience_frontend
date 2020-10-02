import { multipleRequests, requestResource } from '../../services/api'
import axios from 'axios'
import { 
  GET_FILTERS_STORE,
  SUCCESS_GET_FILTERS,
  ERROR_GET_FILTERS, 
  LOADING_GET_FILTERS,
  SITUATIONS
} from '../../utils/alias'
const state = () => ({
  healthCenters: [],
  accomodations: [],
  situations: SITUATIONS,
  realizers: [],
  status: ''
})

const getters = {
  healthCenters: (state) => state.healthCenters,
  accomodations: (state) => state.accomodations,
  situations: (state) => state.situations,
  realizers: (state) => state.realizers,
  status: (state) => state.status
}

const actions = {
  [GET_FILTERS_STORE]: ({ commit }, urls) => {
    return new Promise((resolve, reject) => {
      commit(LOADING_GET_FILTERS)
      let cbs = urls.map((url) => requestResource({ url }))
      multipleRequests(cbs)
        .then(axios.spread((hc, acc, rel) => {
          commit(GET_FILTERS_STORE, { hc, acc, rel })
          resolve({hc, acc, rel})
        }))
        .catch((errors) => {
          reject(errors)
        })
    })
  }
}

const mutations = {
  [GET_FILTERS_STORE]: (state, payload) => {
    state.healthCenters = payload.hc
    state.accomodations = payload.acc
    state.realizers = payload.rel
  },
  [SUCCESS_GET_FILTERS]: (state) => {
    state.status = 'ok'
  },
  [ERROR_GET_FILTERS]: (state) => {
    state.status = 'error'
  },
  [LOADING_GET_FILTERS]: (state) => {
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