import { requestResource } from '../../services/api'
import { GET_REGISTRANTS_STORE, LOADING, ERROR, SUCCESS } from "../../utils/alias"
const state = () => ({
  registrants: [],
  status: ''
})

const getters = {
  registrants: state => {
    let regs = state.registrants.map((rgs => ({id: rgs.nome_posto_realizante, name: rgs.nome_posto_realizante})))
    regs.push({ id: '', name: 'TODOS' })
    return regs
  },
  status: state => state.status
}

const actions = {
  [GET_REGISTRANTS_STORE]: ({ commit }, { url }) => {
    commit(LOADING)
    return new Promise((resolve, reject) => {
      requestResource({ url, method: 'GET' })
        .then((resp) => {
          commit(GET_REGISTRANTS_STORE, resp.data.docs)
          commit(SUCCESS)
          resolve(resp.data.docs)
        })
        .catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
  }
}

const mutations = {
  [GET_REGISTRANTS_STORE]: (state, registrants) => {
    state.registrants = registrants
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