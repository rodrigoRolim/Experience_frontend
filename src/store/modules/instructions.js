import { INSTRUCTIONS, LOADING, SUCCESS, ERROR } from '../../utils/alias'
import { requestResource } from '../../services/api'

const state = () => ({
  instructions: '',
  status: ''
})

const getters = {
  instructions: (state) => state.instructions,
  status: (state) => state.status
}

const actions = {
  [INSTRUCTIONS]: ({commit}, {url}) => {
    commit(LOADING)
    return new Promise((resolve, reject) => {
      requestResource({url})
        .then((resp) => {
          commit(INSTRUCTIONS, resp.data)
          commit(SUCCESS)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
  }
}

const mutations = {
  [INSTRUCTIONS]: (state, instructions) => {
    state.instructions = instructions
  },
  [LOADING]: (state) => {
    state.status = 'loading'
  },
  [SUCCESS]: (state) => {
    state.status = 'ok'
  },
  [ERROR]: (state) => {
    state.status = 'error'
    state.instructions = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}