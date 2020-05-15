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
    <code-modal
      :normal="true"
      :display="show"
      @display="show = $event"
      class="modal"
    >
      <template v-slot:modal>
        <patient-exam-detail @close="show = false"></patient-exam-detail>
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

.c-items-list
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