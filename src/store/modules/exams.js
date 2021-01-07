import { 
  ERROR, 
  GET_EXAMS_STORE, 
  LOADING, 
  SUCCESS, 
  CHECKED_EXAM, 
  UNCHECKED_EXAM,
  CHECKED_ALL_EXAMS,
  UNCHECKED_ALL_EXAMS,
  REINIT_STATE,
  MESSAGE,
  SELECTED
} from '../../utils/alias'
import { httpMessage } from '../../utils/statusMessages'
import { requestResource } from '../../services/api'
const state = () => ({
  exams: [],
  checkedExams: [],
  params: {
    limit: 10,
    page: 1
  },
  checkExams: false,
  selected: {
    hc: null,
    att: null
  },
  status: '',
  message: {}
})

const getters = {
  exams: state => state.exams,
  status: state => state.status,
  message: state => state.message,
  selected: state => state.selected,
  params: state => state.params,
  checkedExams: state => state.checkedExams,
  checkExams: state => state.checkExams,
  someExamChecked: state => state.checkedExams.length > 0,
  someFinalizedExam: state => state.exams.some(exam => exam.situacao_experience === 'FINALIZADO'),
}

const actions = {
  [GET_EXAMS_STORE]: ({commit}, { url, params = {}, headers }) => {
    commit(LOADING)
    return new Promise((resolve, reject) => {
      requestResource({ url, params, method: 'GET', headers })
        .then((resp) => {
          const expiredSession = resp.status === 401
          const message = httpMessage({ status: resp.status, data: 'exams', experired: expiredSession })
          commit(GET_EXAMS_STORE, resp.data)
          commit(MESSAGE, message)
          commit(SUCCESS)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
  },
}

const mutations = {
  [GET_EXAMS_STORE]: (state, exams) => {
    state.exams = exams
  },
  [CHECKED_EXAM]: (state, correl) => {
    let hasExam = state.checkedExams.includes(correl)
    if (!hasExam)
      state.checkedExams.push(correl)
  },
  [UNCHECKED_EXAM]: (state, correl) => {
    state.checkedExams = state.checkedExams.filter(examCorr => examCorr !== correl)
  },
  [CHECKED_ALL_EXAMS]: (state) => {
    state.checkedExams = state.exams.map(exam => exam.correl)
    state.checkExams = true
  },
  [UNCHECKED_ALL_EXAMS]: (state) => {
    state.checkedExams = []
    state.checkExams = false
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
  [MESSAGE]: (state, message) => {
    state.message = message
  },
  [SELECTED]: (state, selected) => {
    state.selected.hc = selected.healthCenter
    state.selected.att = selected.attendance
  },
  [REINIT_STATE]: (state) => {
    state.exams = []
    state.checkedExams = []
    state.params.limit = 10
    state.params.page = 1
    state.checkExams = false
    state.status = ''
    state.healthCenter = null
    state.attendance = null
    state.selected.hc = null
    state.selected.att = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
