<template>
  <div class="patient-exam-list">
     <patient-exam-list-header class="header"></patient-exam-list-header>
     <div class="c-items-list" id="exams">
        <patient-exam-list-item situation="TF" @click="show = true"></patient-exam-list-item>
        <patient-exam-list-item situation="PF" @click="show = true"></patient-exam-list-item>
        <patient-exam-list-item situation="NR" @click="show = true"></patient-exam-list-item>
        <patient-exam-list-item situation="EA" @click="show = true"></patient-exam-list-item>
        <patient-exam-list-item situation="EP" @click="show = true"></patient-exam-list-item>
        <patient-exam-list-item situation="TF" @click="show = true"></patient-exam-list-item>
        <patient-exam-list-item situation="EA" @click="show = true"></patient-exam-list-item>
        <patient-exam-list-item situation="NR" @click="show = true"></patient-exam-list-item>
        <patient-exam-list-item situation="PF" @click="show = true"></patient-exam-list-item>
     </div>
     <patient-exam-detail :showExame="show" @close="show = false"></patient-exam-detail>
  </div>
</template>
<script>
import PatientExamListHeader from './PatientExamListHeader'
import PatientExamListItem from './PatientExamListItem'
import PatientExamDetail from './PatientExamDetail'
export default {
  name: 'PatientExamList',
  props: {
    patient: Array
  },
  components: {
    PatientExamListHeader,
    PatientExamListItem,
    PatientExamDetail
  },
  data () {
    return {
      show: false
    }
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