export default class Doctor {

  constructor (axios) {
    this.axios = axios
  }

  findPatient ({ nome, paciente }) {
    return this.axios.post('/medico/localizapaciente', { nome, paciente })
  }

  clientsFilter ({ idMedico, begin, end, patient }) {
    return this.axios.post('/medico/filterclientes', { idMedico, begin, end, patient })
  }

  getPatient (patient) {
    return this.axios.get(`/medico/paciente/${patient}`)
  }

  getAttendanceExams (healthCenter, attendance) {
    return this.axios.get(`/medico/examesatendimento/${healthCenter}/${attendance}`)
  }
  
  selectAgreements ({ idMedico, begin, end }) {
    return this.axios.post('/medico/selectconvenios', { idMedico, begin, end })
  }

  selectHealthCenters ({ idMedico, begin, end }) {
    return this.axios.post('/medico/selectpostoscadastros', { idMedico, begin, end })
  }

  detailAttendanceExamsCorrelative (healthCenter, attendance, correlative) {
    return this.axios.get(`/medico/detalheatendimentoexamecorrel/${healthCenter}/${attendance}/${correlative}`)
  }

  exportPDF ({ healthCenter, attendance, correlatives, headers }) {
    return this.axios.post('/medico/exportarpdf', { healthCenter, attendance, correlatives, headers })
  }
  
  alterPassword ({ currentPassword, newPassword }) {
    return this.axios.post('alterarsenha', { currentPassword, newPassword })
  }

}
