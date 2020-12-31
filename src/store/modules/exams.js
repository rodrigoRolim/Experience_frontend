import { 
  ERROR, 
  GET_EXAMS_STORE, 
  LOADING, 
  SUCCESS, 
  CHECKED_EXAM, 
  UNCHECKED_EXAM,
  CHECKED_ALL_EXAMS,
  UNCHECKED_ALL_EXAMS,
  GET_EXAMS_PDFS
} from '../../utils/alias'
import { requestResource, requestPDF } from '../../services/api'
const state = () => ({
  exams: [],
  examPDF: '',
  checkedExams: [],
  params: {
    limit: 10,
    page: 1
  },
  checkExams: false,
  status: ''
})

const getters = {
  exams: state => state.exams,
  status: state => state.status,
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
          commit(GET_EXAMS_STORE, resp.data)
          commit(SUCCESS)
          resolve(resp)
        })
        .catch((err) => {
          commit(ERROR)
          reject(err)
        })
    })
  },
  [GET_EXAMS_PDFS]: ({ commit }, { url, params }) => {
    return new Promise((resolve, reject) => {
      requestPDF({ url, params })
        .then((resp) => {
          console.log(resp)
          commit(GET_EXAMS_PDFS, resp)
          resolve(resp)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }
}

const mutations = {
  [GET_EXAMS_STORE]: (state, exams) => {
    console.log(exams)
    state.exams = exams
  },
  [GET_EXAMS_PDFS]: (state, pdf) => {
    state.examPDF = pdf
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
  } 
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
