<template>
  <div class="health-center-patient">
    <div class="health-center-patient__main" >
      <div class="health-center-patient__patient" >
        <patient-exams-list-header></patient-exams-list-header>
      </div>
      <div class="health-center-patient__exams" >
        <patient-exam-list />
      </div>
    </div>
  </div>
</template>

<script>
import PatientExamsListHeader from '../components/PatientExamListHeader'
import PatientExamList from '../components/PatientExamList'
export default {
  name: 'health-center-patientExams',
  components: {
    PatientExamsListHeader,
    PatientExamList
  }
}
</script>

<style lang="sass" scoped>
.health-center-patient
  display: flex
  @include respond-to(handhelds)
    margin-top: 60px
    margin-bottom: 40px
  min-height: 100vh
.health-center-patient__main
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
.health-center-patient__exams
  width:  100%
  margin-top: 110px
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 60px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 50px
.health-center-patient__sidebar,
.health-center-patient__patient
  position: fixed
.health-center-patient__sidebar
  width: 360px
  overflow-y: auto
  height: 100vh
  z-index: 4
  @include respond-to(medium-screens)
    overflow-x: hidden
  @include respond-to(handhelds)
    width: 100%
    margin-top: 0px
    height: auto
    position: relative
    z-index: 0
.health-center-patient__patient
  width: 100%
  z-index: 2
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
</style>