import { 
  CANCEL_PENDING_REQUESTS,
  ADD_CANCEL_TOKEN, 
  CLEAR_CANCEL_TOKENS 
} from '../../utils/alias'
const state = () => ({
  cancelTokens: []
})

const getters = {
  cancelTokens: (state) => state.cancelTokens
}

const actions = {
  [CANCEL_PENDING_REQUESTS]: ({ commit, state }) => {
    state.cancelTokens.forEach((request) => {
      if (request.cancel) {
        request.cancel()
      }
    });

    commit(CLEAR_CANCEL_TOKENS)
  }
}

const mutations = {
  [ADD_CANCEL_TOKEN]: (state, token) => {
    state.cancelTokens.push(token)
  },
  [CLEAR_CANCEL_TOKENS]: (state) => {
    state.cancelTokens = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}