<template>
  <div class="patient-exams">
    <code-modal
      :display="loading"
    >
      <template v-slot:modal>
        <code-loading/>
      </template>
    </code-modal>
    <div class="patient-exams__sidebar" 
      :class="{ 'sidebar--show': attendances, 'sidebar--hidden': !attendances }">
      <the-sidebar :health-center="healthCenter" :attendance-id="attendanceId"/>
    </div>
    <div class="patient-exams__main">
      <div class="patient-exams__patient">
        <patient-exams-list-header :health-center="healthCenter" :attendance-id="attendanceId"/>
      </div>
      <div class="patient-exams__exams">
        <patient-exam-list :health-center="healthCenter" :attendance-id="attendanceId"/>
      </div>
    </div>
  </div>
</template>

<script>
import PatientExamsListHeader from '../components/PatientExamListHeader'
import PatientExamList from '../components/PatientExamList'
import TheSidebar from '../components/TheSidebar'
import CodeLoading from '../components/base/CodeLoading'
import CodeModal from '../components/base/CodeModal'
import { bus } from '../main'
import { mapActions, mapGetters } from 'vuex'
import { 
  GET_ATTENDANCE, 
  GET_ATTENDANCES_BY_CLIENT,
  NAMESPACED_ATTENDANCE, 
  GET_ATTENDANCES_STORE, 
  NAMESPACED_AUTH
} from '../utils/alias'
export default {
  name: 'PatientExams',
  components: {
    PatientExamsListHeader,
    TheSidebar,
    PatientExamList,
    CodeLoading,
    CodeModal
  },
  data () {
    return {
      attendances: false,
      healthCenter: '0',
      attendanceId: '10400'
    }
  },
  created () {
    bus.$on('sidebar', (data) => {
      this.attendances = data
    })
    if (this.uniqueAttendance) {
      this.getAttendances({ url: GET_ATTENDANCE(0, 10400) })
        .then((resp) => console.log(resp))
        .catch((err) => console.log({err}))
    } else {
      this.getAttendances({ url: GET_ATTENDANCES_BY_CLIENT })
        .then((resp) => console.log(resp))
        .catch((err) => console.log({err}))
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'status',
      'examsToPrint'
    ]),
    ...mapGetters(NAMESPACED_AUTH, [
      'uniqueAttendance'
    ]),
   
    loading () {
      console.log(this.status)
      return this.status === 'loading'
    }
  },
  methods: {
    ...mapActions(NAMESPACED_ATTENDANCE, {
      getAttendances: GET_ATTENDANCES_STORE
    }),
    printExams () {
      
    },
    downloadExams () {}
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/animations/__dropside'
.patient-exams
  display: flex
  @include respond-to(handhelds)
    margin-top: 60px
    margin-bottom: 40px
  min-height: 100vh
.patient-exams__main
  width: calc( 100% - 321px )
  display: flex
  flex-direction: column
  align-items: flex-end
  @include respond-to(medium-screens)
    margin-left: 0
    width: 100%
  @include respond-to(handhelds)
    margin-top: 0
    margin-left: 0
    width: 100%
  margin-left: 321px
.patient-exams__exams
  width: 100%
  margin-top: 150px
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 65px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 0
    margin-top: 65px
.patient-exams__patient
  position: fixed
  top: 60px
.patient-exams__sidebar
  @include respond-to(wide-screens)
    display: block
  position: fixed
  width: 321px
  overflow-y: auto
  height: 100vh
  z-index: 4
  @include respond-to(medium-screens)
    overflow-x: hidden
.patient-exams__patient
  width: calc(100% - 321px)
  z-index: 2
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
</style>