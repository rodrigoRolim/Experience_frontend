<template>
  <div class="health-center-patient-exams">
    <patient-exams />
  </div>
</template>

<script>
import PatientExams from '../components/PatientExams'
export default {
  name: 'HealthCenterPatientExams',
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
.health-center-patient-exams
  display: flex
  
</style>