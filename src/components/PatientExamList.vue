<template>
  <div class="patient-exams">
    <code-message
      v-if="message"
      class="patients-exams__message"
      :message="message.content"
      :type-message="message.type"
      position="center"
      icon="info-circle"
    />
    <div class="patient-exams__list" v-if="exams.length > 0 && !message">
      <patient-exam-list-item
        v-for="exam in exams"
        :key="exam.correl" 
        :status="exam.situacaoExperience"
        :name="exam.nomeProcedimento"
        :name-health-center="exam.nomePostoRealizante"
        :mnemonico="exam.mnemonico" 
        :correl="exam.correl"
        :type-delivery="exam.tipoEntrega"
        @click="showExamResult(exam.correl, exam.nomeProcedimento)" 
        class="patient-exams__item"
      />
    </div>
    <code-modal
      normal
      :display="show || dontCloseModal"
      @display="displayModal"
      class="modal"
      position="start"
    >
      <template v-slot:modal>
        <patient-exam-detail 
          :health-center="healthCenter"
          :attendance="attendance"
          :correlative="correl | correlative"
          :name-exam="nameExam"
          @close="show = false"
          @keepModalOpen="keepModalOpen"
          @errorMessages="messagesHandler"
        />
      </template>
    </code-modal>
    <transition name="slide-fade">
      <div class="patient-exams__messages" v-if="messages">
        <code-message
          class="patient-exams__message-content"
          :message="messages.content"
          :type-message="messages.type"
          position="center"
          icon="times-circle"
        />  
      </div>
    </transition>
    <patient-exams-list-actions 
      :showsUp="someExamChecked"
      @errorMessages="messagesHandler"
    />
  </div>
</template>
<script>
import CodeModal from './base/CodeModal'
import CodeMessage from './base/CodeMessage'
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
    CodeMessage,
    PatientExamListItem,
    PatientExamDetail,
    PatientExamsListActions
  },
  data () {
    return {
      dontCloseModal: false,
      show: false,
      listExams: [],
      correl: null,
      messages: undefined
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
      'someExamChecked',
      'message'
    ]),
    ...mapGetters(NAMESPACED_REPORT, [
      'status'
    ]),
    selectedAttendance() {
      return `${this.healthCenter}|${this.attendance}`
    }
  },
  watch: {
    selectedAttendance(value) {
      let [hc, att] = value.split('|')
      if (!this.thereIsNoSelected())
        this.getExams(hc, att)
    }
  },
  methods: {
    messagesHandler(msg) {

      this.messages = msg;
      setTimeout(() => { this.messages = undefined }, 8000)
    },
    ...mapActions(NAMESPACED_EXAMS, {
      requestExams: GET_EXAMS_STORE
    }),
    thereIsNoSelected() {

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
    },
    keepModalOpen(keepOpen) {
      this.dontCloseModal = keepOpen
    }
  }
}
</script>
<style lang="sass" scoped>
@import '../styles/transitions/__slide_fade.scss'
.patient-exams
  padding: 5px 10px
.patient-exams__list
  display: flex
  flex-flow: row wrap
  align-items: center
  justify-content: space-between  
  width: 100%
.patient-exams__item
  margin: 5px 0
#exams
  max-height: 400px
  overflow-y: auto
  overflow-x: hidden
.patients-exams__message
  width: 400px
  align-self: center
  margin: 100px auto 0 auto
  padding: 30px 0
  @include respond-to(widescreen)
    margin-left: 301px
  @include respond-to(handhelds)
    width: 90%
.patient-exams__messages
  position: fixed
  width: 100vw
  left: 0
  bottom: 0
  z-index: 999
</style>