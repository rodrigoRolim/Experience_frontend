export default class Patient {

  constructor (axios) {
    this.axios = axios
  }

  getAttendanceExams (healthCenter, attendance) {
    return this.axios.get(`/paciente/examsatendimento/${healthCenter}/${attendance}`)
  }

  detailCorrelativeAttendanceExams (partner, attendance, correlative) {
    return this.axios.get(`/paciente/detalheatendimentoexamecorrel/${partner}/${attendance}/${correlative}`)
  }
  
  alterPassword ({ acessType, currentPassword, newPassword }) {
    return this.axios.post('/paciente/alterarsenha', { acessType, currentPassword, newPassword })
  } 

  exportPDF ({ healthCenter, attendance, correlatives, header }) {
    return this.axios.post('/paciente/exportpdf', { healthCenter, attendance, correlatives, header })
  }
}
