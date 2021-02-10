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
import { correlatives } from '../../utils/correlatives'
const state = () => ({
  exams: [],
  checkedExams: [],
  params: {
    limit: 10,
    page: 1
  },
  selected: {
    hc: null,
    att: null
  },
  status: '',
  message: undefined
})

const getters = {
  exams: state => state.exams,
  status: state => state.status,
  message: state => state.message,
  selected: state => state.selected,
  params: state => state.params,
  checkedExams: state => state.checkedExams,
  numberCheckedExams: state => state.checkedExams.length,
  findExamNameByCorrel: state => (correl) => state.exams.find(ex => correlatives(ex.correl) !== correl).nome_procedimento,
  checked: (state) => (correl) => state.checkedExams.includes(correlatives(correl)),
  someExamChecked: state => state.checkedExams.length > 0,
  allExamsChecked: state => state.checkedExams.length === state.exams.filter(exam => exam.situacao_experience === 'FINALIZADO' && exam.tipo_entrega == '*').length,
  someFinalizedExam: state => state.exams.some(exam => exam.situacao_experience === 'FINALIZADO' && exam.tipo_entrega == '*'),
}

const actions = {
  [GET_EXAMS_STORE]: ({commit}, { url, params = {}, headers }) => {
    commit(MESSAGE, undefined)
    commit(LOADING)
    return new Promise((resolve, reject) => {
      requestResource({ url, params, method: 'GET', headers })
        .then((resp) => {         
          commit(GET_EXAMS_STORE, resp.data)
          commit(SUCCESS)
          resolve(resp)
        })
        .catch((err) => {
          commit(MESSAGE, err.status)
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
    let hasExam = state.checkedExams.includes(correlatives(correl))
    if (!hasExam)
      state.checkedExams.push(correlatives(correl))
  },
  [UNCHECKED_EXAM]: (state, correl) => {
    state.checkedExams = state.checkedExams.filter(examCorr => examCorr !== correlatives(correl))
  },
  [CHECKED_ALL_EXAMS]: (state) => {

    state.checkedExams = state.exams.map(exam => correlatives(exam.correl))
    state.checkExams = true
  },
  [UNCHECKED_ALL_EXAMS]: (state) => {
    state.checkedExams = []
    state.checkExams = false
  },
  [LOADING]: (state) => {
    state.status = 'loading'
    state.exams = []
  },
  [SUCCESS]: (state) => {
    state.status = 'ok'
  },
  [ERROR]: (state) => {
    state.status = 'error'
    state.exams = []
  },
  [MESSAGE]: (state, status) => {
    const expiredSession = status === 401
    const message = httpMessage({ status, data: 'exams', experired: expiredSession })
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
    state.message = undefined
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
