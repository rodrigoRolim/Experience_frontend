<template>
 <div class="partner-patient">
    <div class="partner-patient__main" >
      <div class="partner-patient__patient">
        <patient-exams-list-header></patient-exams-list-header>
      </div>
      <div class="partner-patient__exams">
        <patient-exam-list />
      </div>
    </div>
  </div>
</template>

<script>
import PatientExamsListHeader from '../components/PatientExamListHeader'
import PatientExamList from '../components/PatientExamList'
export default {
  name: 'partner-patientPatientExams',
  components: {
    PatientExamsListHeader,
    PatientExamList
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
  margin-top: 100px
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 60px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 50px
.partner-patient__patient
  position: fixed
  width: 100%
  z-index: 2
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
</style>