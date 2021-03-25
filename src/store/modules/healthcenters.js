import { requestResource } from '../../services/api'
import { GET_HEALTH_CENTERS_STORE, LOADING, ERROR, SUCCESS, REINIT_STATE, MESSAGE, GET_HEALTH_CENTERS,  } from "../../utils/alias"
const state = () => ({
  healthCenters: [],
  status: '',
  message: undefined,
})

const getters = {
  healthCenters: state => {
    let hcs = state.healthCenters.map((hc => ({id: hc.posto, name: hc.nome})))
    //console.log(hcs)
    if (hcs) 
      hcs.push({ id: '', name: 'TODOS' })
    return hcs
  },
  status: state => state.status,
  message: state => state.message
}

const actions = {
  [GET_HEALTH_CENTERS_STORE]: ({commit}) => {
    commit(LOADING)
    return new Promise((resolve, reject) => {
      let url = GET_HEALTH_CENTERS 
      requestResource({url})
        .then(resp => {
          commit(GET_HEALTH_CENTERS_STORE, resp.data)
          commit(SUCCESS)
          resolve(resp.data)
        })
        .catch((err) => {
          /* let status = (err.response) ? err.response.status : 408
          this.error(httpMessage({ status: status, data: 'postos' })) */
          commit(ERROR)
          reject(err)
        })
    })
  },
 /*  [GET_ALL_HEALTH_CENTERS]: ({ commit }) => {
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
    
  } */
}

const mutations = {
  [GET_HEALTH_CENTERS_STORE]: (state, healthCenters) => {
    state.healthCenters = healthCenters
  },
  [LOADING]: (state) => {
    state.status = 'loading'
  },
  [MESSAGE]: (state, message) => {
    state.message = message
  },
  [ERROR]: (state) => {
    state.status = 'error'
    state.healthCenters = []
  },
  [SUCCESS]: (state) => {
    state.status = 'ok'
  },
  [REINIT_STATE]: (state) => {
    state.healthCenters = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}