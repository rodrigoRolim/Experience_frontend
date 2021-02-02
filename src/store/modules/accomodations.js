import { requestResource } from '../../services/api'
import { GET_ACCOMODATIONS_STORE, SUCCESS, ERROR, LOADING, REINIT_STATE } from '../../utils/alias'
const state = () => ({
  accomodations: [],
  status: ''
})

const getters = {
  accomodations: state =>  {
    let accs = state.accomodations.map((acc) => ({
      id: (acc.acomodacao !== null) ? acc.nome_acomodacao : '',
      name: (acc.nome_acomodacao) ? acc.nome_acomodacao : "SEM ACOMODAÇÃO"
    }))
    accs.push({ id: '', name: 'TODOS' })
    return accs
  },
  status: state => state.status
}

const actions = {
  [GET_ACCOMODATIONS_STORE]: ({ commit }, { url }) => {
    commit(LOADING)
    return new Promise((resolve, reject) => {
      requestResource({ url, method: 'GET' })
        .then((resp) => {
          commit(GET_ACCOMODATIONS_STORE, resp.data)
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
  [GET_ACCOMODATIONS_STORE]: (state, accomodations) => {
    state.accomodations = accomodations
  },
  [LOADING]: (state) => {
    state.status = 'loading'
  },
  [SUCCESS]: (state) => {
    state.status = 'ok'
  },
  [ERROR]: (state) => {
    state.status = 'error'
  },
  [REINIT_STATE]: (state) => {
    state.accomodations = []
  }
}

export default {
  namespaced: true,
  state, 
  getters,
  actions,
  mutations
}