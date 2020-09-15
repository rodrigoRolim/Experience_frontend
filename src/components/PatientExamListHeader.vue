<template>
  <div class="patient-exams__header">
    <div class="patient-exams__name-checkall">
      <code-info
        size="lg"
        description="paciente"
        :info="patientName"
        color="rgba(71, 77, 94, 1)"
        size-info="0.9rem"
      />
      <div class="patient-exams__checkall" v-if="hasFinalizedExam">
        <code-checkbox
          text="imprimir"
          none
          color="theme"
          size="md"
          v-model="checkAllExams"
        />
      </div>
    </div>
    <code-drop-down bcolor="white" text="detalhes" dropdown>
      <template v-slot:content>
        <div class="patient-exams__patient-info">
          <code-info 
            class="patient-exams--margin patient-exams__info"
            icon="birthday-cake"
            size="lg"
            description="idade"
            :info="patientAge"
            color="rgba(71, 77, 94, 1)"
          />
          <code-info
            class="patient-exams--margin patient-exams__info"
            icon="mars"
            size="lg"
            description="sexo"
            :info="patientGender"
            color="rgba(71, 77, 94, 1)"
          />
          <code-info 
            icon="clock"
            size="lg"
            class="patient-exams--margin patient-exams__info"
            description="previsão entrega"
            :info="patientDelivery"
            color="rgba(71, 77, 94, 1)"
          />
          <code-info
            class="patient-exams--margin patient-exams__info"
            icon="user-md"
            size="lg"
            description="médico solicitante"
            :info="patientDoctor"
            color="rgba(71, 77, 94, 1)"
          />
        </div>
      </template>
    </code-drop-down>
  </div>
</template>

<script>
import CodeInfo from './base/CodeInfo'
import CodeDropDown from './base/CodeDropDown'
import CodeCheckbox from '../components/base/CodeCheckbox'
import { mapGetters, mapActions } from 'vuex'
import { NAMESPACED_ATTENDANCE, SELECT_EXAMS, EMPTY_EXAMS } from '../utils/alias'
export default {
  name: 'PatientExamListHeader',
  components: {
    CodeInfo,
    CodeDropDown,
    CodeCheckbox
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'attendance',
      'exams',
      'healthCenter',
      'attendanceId',
      'hasFinalizedExam',
      'printableExams'
    ]),
    patientName () {
      console.log(this.attendance(this.healthCenter, this.attendanceId))
      return this.attendance(this.healthCenter, this.attendanceId)?.nome_cliente
    },
    patientGender () {
      return this.getGender(this.attendance(this.healthCenter, this.attendanceId)?.sexo)
    },
    patientAge () {
      return this.getAgeByBirthday(this.attendance(this.healthCenter, this.attendanceId)?.data_nas)
    },
    patientDelivery () {
      return this.getDeliveryDate(this.attendance(this.healthCenter, this.attendanceId)?.data_entrega)
    },
    patientDoctor () {
      return "Dr(a). " + this.attendance(this.healthCenter, this.attendanceId)?.nome_solicitante
    }
  },
  data () {
    return {
      checkAllExams: false
    }
  },
  watch: {
    checkAllExams (value) {
     
      if (value) {
        let exams = this.exams(this.healthCenter, this.attendanceId)
        let examsFinalized = exams.filter(exam => exam.situacao === 'N')
        this.addExams(examsFinalized)
        return
      }
      this.emptyExams()
    }
  },
  methods: {
    ...mapActions(NAMESPACED_ATTENDANCE, {
      addExams: SELECT_EXAMS,
      emptyExams: EMPTY_EXAMS
    }),
    getGender (initial) {
      return [{initial: 'M', value: 'masculino'}, {initial: 'F', value: 'feminino'}]
        .find(item => item.initial === initial)?.value
    },
    getAgeByBirthday (dateString) {

      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
       age--;
      }
      const ageDate = age.toString()
      return !isNaN(ageDate) ? ageDate : "";
    },
    getDeliveryDate (dateString) {
      const delivery = new Date(dateString).toLocaleDateString("pt-BR")
      return delivery !== "Invalid Date" ? delivery : ""
    }
  }
}
</script>

<style lang="sass" scoped>
.patient-exams__header
  display: flex
  flex-direction: column
  background-color: white
  @include respond-to(handhelds)
    flex-direction: column
    width: 100%
  border-bottom: 1px solid rgba(0,0,0,0.1)
  padding: 15px 10px 0px 10px
.patient-exams__name-checkall
  display: flex
  justify-content: space-between
.patient-exams--margin
  margin: 10px
.patient-exams__patient-info
  display: flex
  flex-direction: row
  align-items: flex-start
  justify-content: space-between
  width: 100%
  @include respond-to(medium-screens)
    width: 100%
    padding: 4px 19px
  @include respond-to(handhelds)
    width: 100%
    flex-direction: column
    justify-content: space-between
.patient-exams__title
  display: flex
  flex-direction: row
  font-size: 1.0rem
.patient-exams__name
  margin-left: 10px
  font-size: 1.0rem
  @include respond-to(medium-screens)
    padding: 4px 19px
  @include respond-to(handhelds)
    text-align: center
.patient-exams__title--capitalize
  text-transform: capitalize
.patient-exams__attendance-datas
  display: flex
  flex-direction: row
  width: 100%
  @include respond-to(handhelds)
    flex-direction: column
</style>