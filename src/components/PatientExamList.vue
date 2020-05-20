<template>
  <div class="patient-exams">
     <patient-exam-list-header class="header"></patient-exam-list-header>
     <div class="patient-exams__list" id="exams">
        <patient-exam-list-item situation="TF" @click="show = true" class="patient-exams__item"/>
        <patient-exam-list-item situation="PF" @click="show = true" class="patient-exams__item"/>
        <patient-exam-list-item situation="NR" @click="show = true" class="patient-exams__item"/>
        <patient-exam-list-item situation="EA" @click="show = true" class="patient-exams__item"/>
        <patient-exam-list-item situation="EP" @click="show = true" class="patient-exams__item"/>
        <patient-exam-list-item situation="TF" @click="show = true" class="patient-exams__item"/>
        <patient-exam-list-item situation="EA" @click="show = true" class="patient-exams__item"/>
        <patient-exam-list-item situation="NR" @click="show = true" class="patient-exams__item"/>
        <patient-exam-list-item situation="PF" @click="show = true" class="patient-exams__item"/>
     </div>
    <code-modal
      :normal="true"
      :display="show"
      @display="show = $event"
      class="modal"
    >
      <template v-slot:modal>
        <patient-exam-detail @close="show = false"/>
      </template>
    </code-modal>
  </div>
</template>
<script>
import CodeModal from './base/CodeModal'
import PatientExamListHeader from './PatientExamListHeader'
import PatientExamListItem from './PatientExamListItem'
import PatientExamDetail from './PatientExamDetail'
export default {
  name: 'PatientExamList',
  props: {
    patient: Array
  },
  components: {
    CodeModal,
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

.patient-exams__list
  display: flex
  flex-flow: row wrap
  align-items: center
  justify-content: space-between  
  background-color: #f4f3f3
  width: 100%
  padding: 10px
#exams
  max-height: 400px
  overflow-y: auto
  overflow-x: hidden
</style>