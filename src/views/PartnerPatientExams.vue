<template>
 <div class="partner-patient">
    <div class="partner-patient__main" v-if="patient || exams">
      <div class="partner-patient__patient" v-if="patient">
        <patient-exams-list-header></patient-exams-list-header>
      </div>
      <div class="partner-patient__exams" v-if="exams">
        <patient-exam-list />
      </div>
    </div>
  </div>
</template>

<script>
import PatientExamsListHeader from '../components/PatientExamListHeader'
import PatientExamList from '../components/PatientExamList'
import { mapState } from 'vuex'
export default {
  name: 'partner-patientPatientExams',
  components: {
    PatientExamsListHeader,
    PatientExamList
  },
  computed: {
    ...mapState('patientExams', {
      exams: state => state.examsDisplay,
      patient: state => state.patientDisplay
    })
  }
}
</script>

<style lang="sass" scoped>
.partner-patient
  display: flex
  @include respond-to(handhelds)
    margin-top: 60px
    margin-bottom: 40px
  min-height: 100vh
.partner-patient__main
  width: 100%
  display: flex
  flex-direction: column
  align-items: flex-end
  width: 100%
  @include respond-to(medium-screens)
    margin-left: 0
    width: 100%
  @include respond-to(handhelds)
    margin-top: 0
    margin-left: 0
    width: 100%
.partner-patient__exams
  width: 100%
  margin-top: 180px
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 140px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 0

.partner-patient__patient
  position: fixed
  width: 100%
  z-index: 2
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
</style>