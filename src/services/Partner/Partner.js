export default class Partner {

  constructor (axios) {
    this.axios = axios
  }

  findAttendance ({ attendance }) {
    return this.axios.post('/parceiro/localizaatendimento', { attendance })
	}
	
	selectAccomodation ({ idHealthCenter, begin, end }) {
		return this.axios.post('/parceiro/selectacomodacao', { idHealthCenter, begin, end })
	}

	selectHealthCenter ({ idHealthCenter, begin, end }) {
		return this.axios.post('/parceiro/selectpostorealizante', { idHealthCenter, begin, end })
	}

	attendanceFilter ({ idHealthCenter, begin, end, accomodation, situation, patient }) {
		return this.axios.post('/parceiro/filteratendimentos', { idHealthCenter, begin, end, accomodation, situation, patient })
	}

	getPatient (patient, partner, attendance) {
		return this.axios.get(`/parceiro/paciente/${patient}/${partner}/${attendance}`)
	}

	getAttendanceExams (partner, attendance, healthCenter = null) {
		return this.axios.get(`/parceiro/examesatendimento/${partner}/${attendance}/${healthCenter}`)
	}

	detailCorrelativeAttendanceExams (partner, attendance, correlative) {
		return this.axios.get(`/parceiro/detalheatendimentoexamecorrel/${partner}/${attendance}/${correlative}`)
	}

	exportPDF ({ healthCenter, attendance, correlative, headers }) {
		return this.axios.post('/parceiro/exportarpdf', { healthCenter, attendance, correlative, headers })
	}

}
