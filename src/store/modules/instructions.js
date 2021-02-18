import { INSTRUCTIONS, LOADING, SUCCESS, ERROR, MESSAGE } from '../../utils/alias'
import { requestResource } from '../../services/api'
import { httpMessage } from '../../utils/statusMessages'

const state = () => ({
  instructions: '',
  status: '',
  message: undefined
})

const getters = {
  instructions: (state) => state.instructions,
  status: (state) => state.status,
  message: (state) => state.message
}

const actions = {
  [INSTRUCTIONS]: ({commit}, {url}) => {
    commit(LOADING)
    commit(MESSAGE, undefined)
    commit(INSTRUCTIONS, '')
    return new Promise((resolve, reject) => {
      requestResource({url})
        .then((resp) => {
          commit(INSTRUCTIONS, resp.data)
          commit(SUCCESS)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          commit(INSTRUCTIONS, '')
          commit(MESSAGE, err.response.status)
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
  },
  [MESSAGE]: (state, status) => {
    const message = httpMessage({ status, data: 'procedimentos', typeMessage: 'error' })
    state.message = message
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}