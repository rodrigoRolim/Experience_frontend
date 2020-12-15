<template>
  <div class="patient-exams__container">
    <div class="patient-exams__list" v-if="exams.length > 0">
      <patient-exam-list-item
        v-for="(exam, i) in exams"
        :key="i" 
        :status="exam.situacao_experience"
        :name="exam.nome_procedimento"
        :name-health-center="exam.nome_posto_realizante"
        :mnemonico="exam.mnemonico" 
        @click="showExamResult(exam.correl, exam.nome_procedimento)" 
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
        <patient-exam-detail 
          :health-center="healthCenter"
          :attendance="attendance"
          :correlative="correl"
          :name-exam="nameExam"
          @close="show = false"
        />
      </template>
    </code-modal>
  </div>
</template>
<script>
import CodeModal from './base/CodeModal'
import PatientExamListItem from './PatientExamListItem'
import PatientExamDetail from './PatientExamDetail'
import { mapActions, mapGetters } from 'vuex'
import { NAMESPACED_EXAMS, GET_EXAMS_ATTENDANCE, GET_EXAMS_STORE } from '../utils/alias'
//import attendance from '../store/modules/attendance'
export default {
  name: 'PatientExamList',
  props: {
    patient: Number,
    attendance: Number,
    healthCenter: Number
  },
  created () {
    console.log(this.patient)
    console.log(this.attendance)
    console.log(this.healthCenter)
    this.getExams()
  },
  components: {
    CodeModal,
    PatientExamListItem,
    PatientExamDetail
  },
  data () {
    return {
      show: false,
      listExams: [],
      correl: null
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_EXAMS, [
      'exams'
    ])
  },
  methods: {
    ...mapActions(NAMESPACED_EXAMS, {
      requestExams: GET_EXAMS_STORE
    }),
    getExams () {
      let url = GET_EXAMS_ATTENDANCE(this.healthCenter, this.attendance)
      let headers = { 'X-Paginate': true }
      this.requestExams({url, headers})
        .then((resp) => console.log(resp))
        .catch((err) => console.log({err}))

    },
    showExamResult (correl, nameExam) {
      this.correl = correl.toString()
      this.nameExam = nameExam
      this.show = true
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
  padding: 10px
.patient-exams__item
  margin: 5px 0
#exams
  max-height: 400px
  overflow-y: auto
  overflow-x: hidden
</style>