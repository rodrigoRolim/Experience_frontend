/**  
 * AUTH API'S ROUTES
*/

export const DOCTOR_AUTH = '/token/medico'
export const PATIENT_AUTH = '/token/cliente'
export const HEALTH_CENTER_AUTH = '/token/posto'
export const ATTENDANCE_AUTH = '/token/atendimento'
export const USER_AUTH = '/token/usuario'

/**  
 * EXPERIENCE API'S ROUTES
*/

// doctor
export const GET_DOCTORS = '/v1/web/medico'
export const GET_DOCTOR = (id) => `/v1/web/medico/${id}`

// healthcenter
export const GET_HEALTH_CENTERS = '/v1/web/posto'

// attendances
export const GET_ATTENDANCES = (healthCenter, attendance) => `/v1/web/atendimento/${healthCenter}/${attendance}`
export const GET_ATTENDANCES_HEALTH_CENTER = (healthCenter, begin, end, limit, page) => `/v1/web/atendimento/${begin}/${end}/posto/${healthCenter}?limit=${limit}&page=${page}`
export const GET_ATTENDANCES_REQUESTER = (requester, begin, end) => `/v1/web/atendimento/${begin}/${end}/solicitante/${requester}`
export const GET_ATTENDANCES_PATIENT = (client, begin, end) => `/v1/web/atendimento/${begin}/${end}/cliente/${client}`

// agreements medical
export const GET_AGREEMENTS = '/v1/web/convenio'
export const GET_AGREEMENT = (agreement) => `/v1/web/convenio/${agreement}`

// procediments
export const GET_PROCEDIMENT = (mnemonico) => `/v1/web/procedimento/${mnemonico}`
export const GET_PROCEDIMENT_LIKE = (mnemonico) => `/v1/web/procedimentolike/${mnemonico}`

// exams
export const GET_EXAMS_ATTENDANCE = (healthCenter, attendance) => `/v1/web/exame/${healthCenter}/${attendance}`

// results
export const GET_RESULTS = (healthCenter, attendance) => `/v1/web/resultado/${healthCenter}/${attendance}`
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
export const DOCTOR_TYPE = 0
export const PATIENT_TYPE = 1 // acessp paciente com cpf
export const HEALTH_CENTER_TYPE = 2
export const USER_TYPE = 3 //qrcode
export const ATTENDANCE_TYPE = 4 // acesso paciente com atendimento
export const PARTNER_TYPE = 5
/**  
 * MUTATIONS TYPES AND ACTIONS' NAMES 
*/
export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_REINIT_STATUS = 'AUTH_REINIT_STATUS'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const GET_ATTENDANCES_STORE = 'GET_ATTENDANCES_STORE'
export const SELECTED_ATTENDANCE = 'SELECTED_ATTENDANCE'
export const CHANGE_SELECTED_ATTENDANCE = 'CHANGE_SELECTED_ATTENDANCE'
export const SUCCESS_GET_ATTENDANCE = 'SUCCESS_GET_ATTENDANCE'
export const ERROR_GET_ATTENDANCE = 'ERROR_GET_ATTENDANCE'
export const SELECT_EXAMS = 'SELECT_EXAMS'
export const BEGIN_DATE = 'BEGIN_DATE'
export const END_DATE = 'END_DATE'
export const EMPTY_EXAMS = 'EMPTY_EXAMS'
/**  
 * MUTATIONS TYPES AND ACTIONS' NAMES along namespace
*/
export const NAMESPACED_AUTH = 'auth'
export const NAMESPACED_ATTENDANCE = 'attendance'


/**  
 * VALIDATIONS MESSAGES
*/
export const REQUIRED_INPUT = 'campo obrigatório'
export const INCOMPLETE_ID = 'ID incompleto'
export const INCOMPLETE_CPF = 'cpf incompleto'
export const INVALID_DATA = 'data inválida'
export const INCOMPLET_CRM = 'crm incompleto'
export const MESSAGE_STATUS_403 = 'dados incorretos, verifique seus dados e tente novamente'
export const MESSAGE_STATUS_111 = 'preencha ou corrija os campos abaixo'
export const MESSAGE_STATUS_401 = 'dados incorretos, verifique seus dados e tente novamente'
export const MESSAGE_STATUS_404 = (data) => `${data}(s) não encontrado(s)`
export const MESSAGE_STATUS_502 = 'conexão recusada, servidor pode está desativado'
/**
 * VALIDATORS REGEX
 * 
 * **/
//eslint-disable-next-line
export const CPF_VALIDATOR = /[0-9]{3}\s\.\s[0-9]{3}\s\.\s[0-9]{3}\s\-\s[0-9]{2}$/g
export const DATE_VALIDATOR = /[0-9]{2}\s\/\s[0-9]{2}\s\/\s[0-9]{4}/g