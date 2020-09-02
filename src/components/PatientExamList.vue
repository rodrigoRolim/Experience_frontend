<template>
  <div class="patient-exams__container">
    <div class="patient-exams__list" v-if="buceta !== undefined">
      <patient-exam-list-item
        v-for="(exam, i) in buceta"
        :key="i" 
        :situation="exam.situacao"
        :name="exam.nome_procedimento"
        :name-health-center="exam.nome_posto_realizante"
        :mnemonico="exam.mnemonico" 
        @click="show = true" 
        class="patient-exams__item"
      />
     <!--  <patient-exam-list-item situation="PF" @click="show = true" class="patient-exams__item"/>
      <patient-exam-list-item situation="NR" @click="show = true" class="patient-exams__item"/>
      <patient-exam-list-item situation="EA" @click="show = true" class="patient-exams__item"/>
      <patient-exam-list-item situation="EP" @click="show = true" class="patient-exams__item"/>
      <patient-exam-list-item situation="TF" @click="show = true" class="patient-exams__item"/>
      <patient-exam-list-item situation="EA" @click="show = true" class="patient-exams__item"/>
      <patient-exam-list-item situation="NR" @click="show = true" class="patient-exams__item"/>
      <patient-exam-list-item situation="PF" @click="show = true" class="patient-exams__item"/> -->
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
import { mapGetters } from 'vuex'
import { NAMESPACED_ATTENDANCE } from '../utils/alias'
//import attendance from '../store/modules/attendance'
export default {
  name: 'PatientExamList',
  /* props: {
    healthCenter: String,
    attendanceId: String
  }, */
  components: {
    CodeModal,
    PatientExamListItem,
    PatientExamDetail
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'exams',
      'healthCenter',
      'attendanceId'
    ]),
    buceta() {
      console.log(this.healthCenter, this.attendanceId)
      return this.exams(this.healthCenter, this.attendanceId)
    }
  },
  methods: {
    
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
  padding: 10px
.patient-exams__item
  margin: 5px 0
#exams
  max-height: 400px
  overflow-y: auto
  overflow-x: hidden
</style>