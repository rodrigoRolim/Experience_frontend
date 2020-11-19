<template>
  <div class="patient-exams__container">
    <div class="patient-exams__list" v-if="listExams !== undefined">
      <patient-exam-list-item
        v-for="(exam, i) in listExams"
        :key="i" 
        :status="exam.situacao_experience"
        :name="exam.nome_procedimento"
        :name-health-center="exam.nome_posto_realizante"
        :mnemonico="exam.mnemonico" 
        @click="show = true" 
        class="patient-exams__item"
      />
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
  props: {
    patient: String,
    attendance: String,
    healthCenter: String
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
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'exams',
      'healthCenter',
      'attendanceId'
    ]),
    listExams () {
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
  margin-top: 60px
.patient-exams__item
  margin: 5px 0
#exams
  max-height: 400px
  overflow-y: auto
  overflow-x: hidden
</style>