<template>
  <patient-exams></patient-exams>
</template>

<script>
import PatientExams from '../components/PatientExams'
export default {
  name: 'DoctorPatientExams',
  components: {
    PatientExams
  },
  data () {
    return {
    }
  }

}
</script>

<style lang="sass" scoped>
@import '../styles/animations/__dropside'
.doctor-patient-exams
  display: flex
  margin-top: 9vh
.doctor-patient-exams__main
  display: flex
  flex-direction: column
  align-items: flex-end
  width: 100%
.doctor-patient-exams__exams
  width: calc( 100% - 320px )
  margin-top: 27vh
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 20vh
  @include respond-to(handhelds)
    width: 100%
    margin-top: 24vh
.doctor-patient-exams__sidebar,
.doctor-patient-exams__patient
  position: fixed
.doctor-patient-exams__sidebar
  z-index: 3
.doctor-patient-exams__patient
  width: calc( 100% - 320px )
  z-index: 2
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
</style>