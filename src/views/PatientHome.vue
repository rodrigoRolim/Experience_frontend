<template>
  <div class="patient-exams">
    <transition
      name="dropside"
      enter-active-class="sidebar--show"
      leave-active-class="sidebar--hidden"
    >
      <div class="patient-exams__sidebar" v-if="attendances">
        <the-sidebar />
      </div>
    </transition>
    <div class="patient-exams__main" v-if="patient || exams">
      <div class="patient-exams__patient" v-if="patient">
        <patient-exams-list-header></patient-exams-list-header>
      </div>
      <div class="patient-exams__exams" v-if="exams">
        <patient-exam-list />
      </div>
    </div>
  </div>
</template>

<script>
import PatientExamsListHeader from '../components/PatientExamListHeader'
import PatientExamList from '../components/PatientExamList'
import TheSidebar from '../components/TheSidebar'
import { mapState } from 'vuex'
export default {
  name: 'PatientExams',
  components: {
    PatientExamsListHeader,
    TheSidebar,
    PatientExamList
  },
  data () {
    return {
  
    }
  },
  computed: {
    ...mapState('patientExams', {
      attendances: state => state.attendancesDisplay,
      exams: state => state.examsDisplay,
      patient: state => state.patientDisplay
    })
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
  width: calc( 100% - 360px )
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
  margin-left: 360px
.patient-exams__exams
  width: 100%
  margin-top: 180px
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 140px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 0
.patient-exams__patient
  position: fixed
.patient-exams__sidebar
  position: fixed
  width: 360px
  overflow-y: auto
  height: 100vh
  z-index: 4
  @include respond-to(medium-screens)
    overflow-x: hidden
  @include respond-to(handhelds)
    width: 100%
    margin-top: 0px
    height: auto
    position: relative
    z-index: 0
  
.patient-exams__patient
  width: calc(100% - 360px)
  z-index: 2
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
   
</style>