<template>
  <div class="patient-exams__container">
    <div class="patient-exams__list">
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
import PatientExamListItem from './PatientExamListItem'
import PatientExamDetail from './PatientExamDetail'
export default {
  name: 'PatientExamList',
  props: {
    patient: Array
  },
  components: {
    CodeModal,
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

.patient-exams__list
  display: flex
  flex-flow: row wrap
  align-items: center
  justify-content: space-between  
  width: 100%
  min-height: 100vh
  padding: 10px
.patient-exams__item
  margin: 5px 0
#exams
  max-height: 400px
  overflow-y: auto
  overflow-x: hidden
</style>