/**  
 * AUTH API'S ROUTES
*/

export const DOCTOR_AUTH = '/token/medico'
export const PATIENT_AUTH = '/token/cliente'
export const HEALTH_CENTER_AUTH = '/token/posto'
export const ATTENDANCE_AUTH = '/token/atendimento'
export const USER_AUTH = '/token/usuario'
export const REFRESH_TOKEN = '/token/atendimento/refresh'
/**  
 * EXPERIENCE API'S ROUTES
*/

// doctor
export const GET_DOCTORS = '/v1/web/medico'
export const GET_DOCTOR = (id) => `/v1/web/medico/${id}`

// healthcenter
export const GET_HEALTH_CENTERS = '/v1/web/posto'

// attendances
export const GET_ATTENDANCE = `/v1/web/atendimento/`
export const GET_ATTENDANCES_BY_CLIENT = '/v1/web/atendimento/cliente'
export const GET_ATTENDANCES_RELATIONS = (client) => `/v1/web/atendimento/cliente/${client}`
export const GET_ATTENDANCES = (healthCenter, begin, end, typeUser) => `/v1/web/atendimento/${begin}/${end}/${typeUser}/${healthCenter}`
export const GET_ATTENDANCES_REQUESTER = (begin, end) => `/v1/web/atendimento/${begin}/${end}/solicitante`
export const GET_ATTENDANCES_PATIENT = (client, begin, end) => `/v1/web/atendimento/${begin}/${end}/cliente/${client}`
// filters
export const GET_FILTERS = (begin, end, typeUser, id, resource) => `v1/web/atendimento/${begin}/${end}/${typeUser}/${id}/${resource}`
// agreements medical
export const GET_AGREEMENTS = '/v1/web/convenio'
export const GET_AGREEMENT = (agreement) => `/v1/web/convenio/${agreement}`

// procediments
export const GET_PROCEDIMENTS = (mnemonico) => `/v1/web/procedimento/${mnemonico}`
export const GET_PROCEDIMENTS_LIKE = (mnemonico) => `/v1/web/procedimentolike/${mnemonico}`
export const GET_INSTRUCTIONS = (mnemonico) => `/v1/web/preparo/${mnemonico}`
// exams
export const GET_EXAMS_ATTENDANCE = (healthCenter, attendance) => `/v1/web/exame/${healthCenter}/${attendance}`
export const GET_EXAM_RESULT = (healthCenter, attendance, correlative) => `/v1/web/resultado/${healthCenter}/${attendance}/${correlative}`
// results
export const GET_RESULTS = (healthCenter, attendance) => `/v1/web/resultado/${healthCenter}/${attendance}`
export const GET_PDFS = (healthCenter, attendance) => `/laudo/${healthCenter}/${attendance}`
/**  
 * ROUTERS OF PAGE
*/
export const PROCEDIMENT_ROUTE = '/manuais'
export const DOCTOR_ROUTE = '/medico'
export const DOCTOR_PATIENT_ROUTE = (patient, attendance) => `/medico/paciente/${patient}/${attendance}`
export const ACESS_ROUTE = '/acesso'
export const PARTNER_ROUTE = '/parceiro'
export const PARTNER_PATIENT_ROUTE = (patient, attendance) => `/parceiro/${patient}/${attendance}`
export const PATIENT_ROUTE = '/paciente'
export const HEALTH_CENTER_ROUTE = '/posto'
export const HEALTH_CENTER_PATIENT_ROUTE = (patient, attendance) => `/paciente/${patient}/${attendance}`
/**  
 * USER TYPES
*/
export const DOCTOR_TYPE = '0'
export const PATIENT_TYPE = '1' // acessp paciente com cpf
export const HEALTH_CENTER_TYPE = '2'
export const USER_TYPE = '3' //qrcode
export const ATTENDANCE_TYPE = '4' // acesso paciente com atendimento
export const PARTNER_TYPE = '5'
export const DOCTOR_TYPE_NAME = 'solicitante'
export const PATIENT_TYPE_NAME = 'paciente'
export const HEALTH_CENTER_TYPE_NAME = 'posto'
export const USER_TYPE_NAME = 'paciente'
export const ATTENDANCE_TYPE_NAME = 'paciente'
export const PARTNER_TYPE_NAME = 'parceiro'
/**  
 * MUTATIONS TYPES AND ACTIONS' NAMES 
*/
export const AUTH_REQUEST = 'AUTH_REQUEST'
export const REAUTH_REQUEST = 'REAUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_REINIT_STATUS = 'AUTH_REINIT_STATUS'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const GET_ATTENDANCES_STORE = 'GET_ATTENDANCES_STORE'
export const GET_ATTENDANCES_REQUESTER_STORE = 'GET_ATTENDANCES_REQUESTER_STORE'
export const GET_ACCOMODATIONS_STORE = 'GET_ACCOMODATIONS_STORE'
export const CANCEL_REQUEST = 'CANCEL_REQUEST'
export const DELETE_SOURCE = 'DELETE_SOURCE'
export const LOADING_GET_PROCEDIMENT = 'LOADING_GET_PROCEDIMENT'
export const SUCCESS_GET_PROCEDIMENT = 'SUCCESS_GET_PROCEDIMENT'
export const ERROR_GET_PROCEDIMENT = 'ERROR_GET_PROCEDIMENT'
export const GET_PROCEDIMENTS_STORE = 'GET_PROCEDIMENTS_STORE'
export const GET_PROCEDIMENTS_LIKE_STORE = 'GET_PROCEDIMENTS_LIKE_STORE'
export const CANCEL_PENDING_REQUESTS = 'CANCEL_PENDING_REQUESTS' 
export const ADD_CANCEL_TOKEN = 'ADD_CANCEL_TOKEN'
export const CLEAR_CANCEL_TOKENS = 'CLEAR_CANCEL_TOKENS'
export const GET_FILTERS_STORE = 'GET_FILTERS_STORE'
export const GET_HEALTH_CENTERS_STORE = 'GET_HEALTH_CENTERS_STORE' 
export const SELECTED_ATTENDANCE = 'SELECTED_ATTENDANCE'
export const CHANGE_SELECTED_ATTENDANCE = 'CHANGE_SELECTED_ATTENDANCE'
export const SUCCESS_GET_ATTENDANCE = 'SUCCESS_GET_ATTENDANCE'
export const LOADING_GET_ATTENDANCE = 'LOADING_GET_ATTENDANCE'
export const ERROR_GET_ATTENDANCE = 'ERROR_GET_ATTENDANCE'
export const LOADING_GET_FILTERS = 'LOADING_GET_FILTERS'
export const SUCCESS_GET_FILTERS = 'SUCCESS_GET_FILTERS'
export const LOADING = 'LOADING'
export const ERROR = 'ERROR'
export const SUCCESS = 'SUCCESS'
export const ERROR_GET_FILTERS = 'ERROR_GET_FILTERS'
export const SELECT_EXAMS = 'SELECT_EXAMS'
export const BEGIN_DATE = 'BEGIN_DATE'
export const END_DATE = 'END_DATE'
export const EMPTY_EXAMS = 'EMPTY_EXAMS'
export const EMPTY_ATTENDANCES = 'EMPTY_ATTENDANCES'
export const ATTENDANCE_NOT_FOUND = 'ATTENDANCE_NOT_FOUND'
export const LOADING_GET_ATTENDANCES_REQUESTER = 'LOADING_GET_ATTENDANCES_REQUESTER'
export const SUCCESS_GET_ATTENDANCES_REQUESTER = 'SUCCESS_GET_ATTENDANCES_REQUESTER'
export const ERROR_GET_ATTENDANCES_REQUESTER = 'ERROR_GET_ATTENDANCES_REQUESTER'
export const TOTAL_ATTENDANCES = 'TOTAL_ATTENDANCES'
export const GET_REGISTRANTS_STORE = 'GET_REGISTRANTS_STORE'
export const PARAMS_ATTENDANCES = 'PARAMS_ATTENDANCES'
export const ACCOMODATION = 'ACCOMODATION'
export const HEALTH_CENTER = 'HEALTH_CENTER'
export const SITUATION = 'SITUATION'
export const REALIZER = 'REALIZER'
export const NAME = 'NAME'
export const DEFAULT_DATES = 'DEFAULT_DATES'
export const PUSH_ATTENDANCES_STORE = 'PUSH_ATTENDANCES_STORE'
export const SUCCESS_PUSH = 'SUCESS_PUSH'
export const ERROR_PUSH = 'ERROR_PUSH'
export const LOADING_PUSH = 'LOADING_PUSH'
export const REINIT_PAGINATION = 'REINIT_PAGINATION'
export const NEXT_PAGE = 'NEXT_PAGE'
export const TOTAL_PAGES = 'TOTAL_PAGES'
export const LOAD_ATTENDANCES = 'LOAD_ATTENDANCES'
export const LOAD_PUSH = 'LOAD_PUSH'
export const FILTER_ATTENDANCES_BY_NAME = 'FILTER_ATTENDANCES_BY_NAME'
export const SELECTED_HEALTHCENTER = 'SELECTED_HEALTHCENTER'
export const SET_PROPS = 'SET_PROPS'
export const CLEAN_PROPS = 'CLEAN_PROPS'
export const GET_EXAMS_STORE = 'GET_EXAMS_STORE'
export const SET_ATTENDANCES_FILTERED = 'SET_ATTENDANCES_FILTERED'
export const EMPTY_PARAMS = 'EMPTY_PARAMS'
export const INSTRUCTIONS = 'INSTRUCTIONS'
export const CHECKED_EXAM = 'CHECKED_EXAM'
export const UNCHECKED_EXAM = 'UNCHECKED_EXAM'
export const CHECKED_ALL_EXAMS = 'CHECKED_ALL_EXAMS'
export const UNCHECKED_ALL_EXAMS = 'UNCHECKED_ALL_EXAMS'
export const GET_EXAMS_PDFS = 'GET_EXAMS_PDFS'
export const REINIT_STATE = 'REINIT_STATE'
export const MESSAGE = 'MESSAGE'
export const SELECTED = 'SELECTED'
export const GET_REPORT_STORE = 'GET_REPORT_STORE' 
export const GET_RESULT_STORE = 'GET_RESULT_STORE'
export const TYPE_DELIVERY = 'TYPE_DELIVERY'

/**  
 * MUTATIONS TYPES AND ACTIONS' NAMES along namespace
*/
export const NAMESPACED_AUTH = 'auth'
export const NAMESPACED_ATTENDANCE = 'attendance'
export const NAMESPACED_PROCEDIMENT = 'procediment'
export const NAMESPACED_ACCOMODATIONS = 'accomodations'
export const NAMESPACED_HEALTH_CENTERS = 'healthcenters'
export const NAMESPACED_CANCEL = 'cancel'
export const NAMESPACED_PATIENT = 'patients'
export const NAMESPACED_REGISTRANTS = 'registrants'
export const NAMESPACED_PROPS = 'props'
export const NAMESPACED_EXAMS = 'exams'
export const NAMESPACED_REPORT = 'report'
export const NAMESPACED_RESULTS = 'results'
export const NAMESPACED_INSTRUCTIONS = 'instructions'
/**  
 * VALIDATIONS MESSAGES
*/
export const REQUIRED_INPUT = 'campo obrigatório'
export const INVALID_OPTION = 'opção inválida'
export const INCOMPLETE_ID = 'ID incompleto'
export const INCOMPLETE_CPF = 'cpf incompleto'
export const INVALID_DATA = 'data inválida'
export const INCOMPLET_CRM = 'crm incompleto'
export const MESSAGE_STATUS_403 = 'sessão expirada. Deslogue e logue novamente'
export const MESSAGE_STATUS_111 = 'preencha ou corrija os campos alertados'
export const MESSAGE_STATUS_401 = 'dados incorretos, verifique seus dados e tente novamente'
export const MESSAGE_STATUS_404 = (data) => `${data}(s) não encontrado(s)`
export const MESSAGE_STATUS_502 = 'conexão recusada, servidor pode está desativado'
export const MESSAGE_STATUS_400 = 'ocorreu um problema'
/**
 * VALIDATORS REGEX
 * 
 * **/
//eslint-disable-next-line
export const CPF_VALIDATOR = /[0-9]{3}\s\.\s[0-9]{3}\s\.\s[0-9]{3}\s\-\s[0-9]{2}$/g
export const DATE_VALIDATOR = /[0-9]{2}\s-\s[0-9]{2}\s-\s[0-9]{4}/g
/**
 * RESOURCES
 * 
 * **/
export const ACCOMODATIONS = 'acomodacoes'
export const REGISTRANTS = 'postosrealizantes'
export const REGISTER = 'postoscadastro'
/**
 * LIST SITUATIONS
 * 
 * **/

 export const SITUATIONS = [
  { id: 'TF', name: 'Finalizados' },
  { id: 'PF', name: 'Parcialmente Finalizados'},
  { id: 'EA', name: 'Em Andamento'},
  { id: 'NR', name: 'Não Realizados'},
  { id: 'EP', name: 'Pendentes'},
  { id: '', name: 'todos'}
]

/**
 * LIMIT AND PAGE
 * 
 * **/
export const LIMIT = 100