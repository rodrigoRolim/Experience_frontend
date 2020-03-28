<template>
  <div class="patient-exam-list">
     <patient-exam-list-header class="header"></patient-exam-list-header>
     <div class="c-items-list" id="exams">
        <patient-exam-list-item situation="TF"></patient-exam-list-item>
        <patient-exam-list-item situation="PF"></patient-exam-list-item>
        <patient-exam-list-item situation="NR"></patient-exam-list-item>
        <patient-exam-list-item situation="EA"></patient-exam-list-item>
        <patient-exam-list-item situation="EP"></patient-exam-list-item>
        <patient-exam-list-item situation="TF"></patient-exam-list-item>
        <patient-exam-list-item situation="EA"></patient-exam-list-item>
        <patient-exam-list-item situation="NR"></patient-exam-list-item>
        <patient-exam-list-item situation="PF"></patient-exam-list-item>
     </div>
  </div>
</template>
<script>
import PatientExamListHeader from './PatientExamListHeader'
import PatientExamListItem from './PatientExamListItem'
export default {
  name: 'PatientExamList',
  props: {
    patient: Array
  },
  components: {
    PatientExamListHeader,
    PatientExamListItem
  }
}
</script>
<style lang="sass" scoped>
@import '../styles/_scrollbar.sass'
@include scrollbar('#exams', 10px )

.c-items-list
  display: flex
  flex-flow: row wrap
  align-items: center
  justify-content: space-between  
  background-color: white
  width: 100%
  padding: 10px
#exams
  max-height: 400px
  overflow-y: auto
  overflow-x: hidden
</style>