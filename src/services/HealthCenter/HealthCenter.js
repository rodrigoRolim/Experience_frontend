export default class HealthCenter {
  
  constructor (axios) {
    this.axios = axios
  }

  selectHealthCenterAccomplished ({ idHealthCenter, begin, end }) {
    return this.axios.post('/posto/selectpostorealizante', { idHealthCenter, begin, end })
  }

  selectAccomodation ({ idHealthCenter }) {
    return this.axios.post('/posto/selectacomodacao', { idHealthCenter })
  }

  findAttendance ({ attendance }) {
    return this.axios.post('/posto/localizaatendimento', { attendance })
  }

  attendanceFilter ({ idPosto, begin, end, accomodation, situation, healthCenter }) {
    return this.axios.post('/posto/filteratendimentos', { idPosto, begin, end, accomodation, situation, healthCenter })
  }

  getPatient (patient, partner, attendance) {
    return this.axios.get(`/posto/paciente/${patient}/${partner}/${attendance}`)
  }

  getExamsAttendance (partner, attendance, healthCenter) {
    return this.axios.get(`/posto/examesatendimento/${partner}/${attendance}/${healthCenter}`)
  }

  detailAttendanceExamsCorrelative (partner, attendance, healthCenter) {
    return this.axios.get(`/posto/detalheatendimentoexamecorrel/${partner}/${attendance}/${healthCenter || null}`)
  }

  exportPDF ({ healthCenter, attendance, correlative, headers }) {
    return this.axios.post('/posto/exportarpdf', { healthCenter, attendance, correlative, headers })
  }

  getLogs () {
    return this.axios.get('/posto/logs')
  }

}
