<template>
  <div class="patient-exam-list-header">
    <div class="patient-info">
      <strong>rodrigo rolim veras</strong>
      <div class="gender-age">
        <patient-age age="27 anos"/>
        <patient-gender gender="masculino"/>  
      </div>
      
    </div>
  </div>
</template>

<script>
import PatientAge from './PatientAge'
import PatientGender from './PatientGender'
export default {
  name: 'PatientExamListHeader',
  components: {
    PatientAge,
    PatientGender
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="sass" scoped>
.patient-exam-list-header
  margin-top: 20px
  border: 1px solid transparent
  background-color: white
  padding: 10px
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5)
.patient-info strong
  font-size: 1.2rem
  margin-bottom: 10px
.patient-info
  display: flex
  flex-direction: column
  width: 20%
.gender-age
  display: flex
  flex-direction: row
  justify-content: space-between
  width: 70%
</style>