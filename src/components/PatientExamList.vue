<template>
  <div class="patient-exams__container">
    <div class="patient-exams__list" v-if="exams.length > 0">
      <patient-exam-list-item
        v-for="exam in exams"
        :key="exam.correl" 
        :status="exam.situacao_experience"
        :name="exam.nome_procedimento"
        :name-health-center="exam.nome_posto_realizante"
        :mnemonico="exam.mnemonico" 
        :correl="exam.correl"
        :type-delivery="exam.tipo_entrega"
        @click="showExamResult(exam.correl, exam.nome_procedimento)" 
        class="patient-exams__item"
      />
    </div>
    <code-modal
      :normal="true"
      :display="show"
      @display="displayModal"
      class="modal"
    >
      <template v-slot:modal>
        <patient-exam-detail 
          :health-center="healthCenter"
          :attendance="attendance"
          :correlative="correl | correlative"
          :name-exam="nameExam"
          @close="show = false"
        />
      </template>
    </code-modal>
    <patient-exams-list-actions :showsUp="someExamChecked" />
  </div>
</template>
<script>
import CodeModal from './base/CodeModal'
import PatientExamListItem from './PatientExamListItem'
import PatientExamDetail from './PatientExamDetail'
import PatientExamsListActions from './PatientExamsListActions'
import { mapActions, mapGetters } from 'vuex'
import { NAMESPACED_EXAMS, GET_EXAMS_ATTENDANCE, GET_EXAMS_STORE, NAMESPACED_REPORT } from '../utils/alias'
//import attendance from '../store/modules/attendance'
export default {
  name: 'PatientExamList',
  props: {
    patient: Number,
    attendance: {
      type: Number,
      default: null
    },
    healthCenter: {
      type: Number,
      default: null
    }
  },
  components: {
    CodeModal,
    PatientExamListItem,
    PatientExamDetail,
    PatientExamsListActions
  },
  data () {
    return {
      show: false,
      listExams: [],
      correl: null
    }
  },
  mounted() {
    if (!this.thereIsNoSelected())
      this.getExams(this.healthCenter, this.attendance)
  },
  filters: {
    correlative(value) {
      if (value <= 9) {
        value = '0' + value
      }
      return value
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_EXAMS, [
      'exams',
      'someExamChecked'
    ]),
    ...mapGetters(NAMESPACED_REPORT, [
      'status'
    ]),
    selectedAttendance() {
      console.log(this.healthCenter)
      console.log(this.attendance)
      return `${this.healthCenter}|${this.attendance}`
    },
    
  },
  watch: {
    selectedAttendance(value) {
      console.log(value)
      let [hc, att] = value.split('|')
      if (!this.thereIsNoSelected())
        this.getExams(hc, att)
    }
  },
  methods: {
    ...mapActions(NAMESPACED_EXAMS, {
      requestExams: GET_EXAMS_STORE
    }),
    thereIsNoSelected() {
      // console.log(this.selected.hc, this.selected.att)
      console.log(this.healthCenter)
      console.log(this.attendance)
      return (this.healthCenter === null || this.attendance === null) ||
             (isNaN(this.healthCenter) || isNaN(this.attendance))
    },
    getExams (hc, att) {
      let url = GET_EXAMS_ATTENDANCE(hc, att)
      let headers = { 'X-Paginate': false }
      this.requestExams({url, headers})
        .then()
        .catch()
    },
    showExamResult (correl, nameExam) {
      this.correl = correl.toString()
      this.nameExam = nameExam
      this.show = true
    },
    displayModal(value) {
      if (this.status !== 'loading')
        this.show = value
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