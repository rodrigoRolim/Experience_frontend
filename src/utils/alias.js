/**  
 * AUTH API'S ROUTES
*/

export const DOCTOR_AUTH = '/token/medico'
export const PATIENT_AUTH = '/token/paciente'
export const HEALTH_CENTER_AUTH = '/token/posto'
export const ATTENDANCE_AUTH = '/token/atendimento'
export const USER_AUTH = '/token/usuario'

/**  
 * EXPERIENCE API'S ROUTES
*/

// doctor
export const GET_DOCTORS = '/medico'
export const GET_DOCTOR = (id) => `/medico/${id}`

// healthcenter
export const GET_HEALTH_CENTERS = '/posto'

// attendances
export const GET_ATTENDANCES_HEALTH_CENTER = (healthCenter, attendance) => `/atendimento/${healthCenter}/${attendance}`
export const GET_ATTENDANCES_DATES_HEALTH_CENTER = (healthCenter, begin, end) => `/atendimento/${begin}/${end}/posto/${healthCenter}`
export const GET_ATTENDANCES_DATES_REQUESTER = (requester, begin, end) => `/atendimento/${begin}/${end}/solicitante/${requester}`
export const GET_ATTENDANCES_DATES_CLIENT = (client, begin, end) => `/atendimento/${begin}/${end}/cliente/${client}`

// agreements medical
export const GET_AGREEMENTS = '/convenio'
export const GET_AGREEMENT = (agreement) => `/convenio/${agreement}`

// procediments
export const GET_PROCEDIMENT = (mnemonico) => `/procedimento/${mnemonico}`
export const GET_PROCEDIMENT_LIKE = (mnemonico) => `/procedimentolike/${mnemonico}`

// exams
export const GET_EXAMS_ATTENDANCE = (healthCenter, attendance) => `/exame/${healthCenter}/${attendance}`

// results
export const GET_RESULTS = (healthCenter, attendance) => `/resultado/${healthCenter}/${attendance}`

/**  
 * USER TYPES
*/
export const DOCTOR_TYPE = 0
export const PATIENT_TYPE = 1
export const HEALTH_CENTER_TYPE = 2
export const USER_TYPE = 3
export const ATTENDANCE_TYPE = 4
/**  
 * MUTATIONS TYPES AND ACTIONS' NAMES 
*/
export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
/**  
 * MUTATIONS TYPES AND ACTIONS' NAMES along namespace
*/
export const AUTH_REQUEST_NAMESPACED = 'auth/AUTH_REQUEST'
export const AUTH_SUCCESS_NAMESPACED = 'auth/AUTH_SUCCESS'
export const AUTH_ERROR_NAMESPACED = 'auth/AUTH_ERROR'
export const AUTH_LOGOUT_NAMESPACED = 'auth/AUTH_LOGOUT'

/**  
 * VALIDATIONS MESSAGES
*/
export const REQUIRED_INPUT = 'campo obrigatório'