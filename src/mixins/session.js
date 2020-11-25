import { DOCTOR_TYPE, PATIENT_TYPE, HEALTH_CENTER_TYPE, USER_TYPE, ATTENDANCE_TYPE, PARTNER_TYPE } from '../utils/alias'
export const session = {
  methods: {
    getTypeUser (typeUser) {
      switch (typeUser) {
        case DOCTOR_TYPE:
          return 'medico'
        case PATIENT_TYPE:
          return 'cliente'
        case HEALTH_CENTER_TYPE:
          return 'posto'
        case USER_TYPE:
          return 'cliente'
        case ATTENDANCE_TYPE:
          return 'cliente'
        case PARTNER_TYPE:
          return 'posto'
      }
    }
  }
}