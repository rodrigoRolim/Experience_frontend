import { requestResource } from '../../services/api'
import { GET_ACCOMODATIONS_STORE } from '../../utils/alias'
const state = () => ({
  accomodations: [],
  status: ''
})

const getters = {
  accomodations: state => state.accomodations
}

const actions = {
  [GET_ACCOMODATIONS_STORE]: ({ commit }, { url }) => {
    
    return new Promise((resolve, reject) => {
     
      requestResource({ url, method: 'GET' })
        .then((resp) => {
          commit(GET_ACCOMODATIONS_STORE, resp)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [GET_ACCOMODATIONS_STORE]: (state, resp) => {
    state.accomodations = resp.data
  }
}

export default {
  namespaced: true,
  state, 
  getters,
  actions,
  mutations
}