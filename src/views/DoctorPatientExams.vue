<template>
  <div class="doctor-patient">
    <transition
      name="dropside"
      enter-active-class="sidebar--show"
      leave-active-class="sidebar--hidden"
    >
      <div class="doctor-patient__sidebar" v-if="attendances">
        <the-sidebar />
      </div>
    </transition>
    <div class="doctor-patient__main" v-if="patient || exams">
      <div class="doctor-patient__patient" v-if="patient">
        <patient-exams-list-header></patient-exams-list-header>
      </div>
      <div class="doctor-patient__exams" v-if="exams">
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
  name: 'DoctorPatientExams',
  components: {
    /* PatientExams */
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
.doctor-patient
  display: flex
  @include respond-to(handhelds)
    margin-top: 60px
    margin-bottom: 40px
  min-height: 100vh
.doctor-patient__main
  width: calc( 100% - 360px )
  display: flex
  flex-direction: column
  align-items: flex-end
  width: 100%
  @include respond-to(medium-screens)
    margin-left: 0
    width: 100%
  @include respond-to(handhelds)
    margin-top: 0
    margin-left: 0
    width: 100%
.doctor-patient__exams
  width:  calc( 100% - 360px )
  margin-top: 180px
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 140px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 0
.doctor-patient__sidebar,
.doctor-patient__patient
  position: fixed
.doctor-patient__sidebar
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
.doctor-patient__patient
  width: calc( 100% - 360px )
  z-index: 2
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
</style>