<template>
  <div class="doctor-patient">
   <!--  <transition
      name="dropside"
      enter-active-class="sidebar--show"
      leave-active-class="sidebar--hidden"
    > -->
      <div class="doctor-patient__sidebar"
        id="scrollbar" 
        :class="{ 'sidebar--show': attendances, 'sidebar--hidden': !attendances }"
      >
        <the-sidebar />
      </div>
   <!--  </transition> -->
    <div class="doctor-patient__main" >
      <div class="doctor-patient__patient">
        <patient-exams-list-header></patient-exams-list-header>
      </div>
      <div class="doctor-patient__exams">
        <patient-exam-list 
          :health-center="healthCenter"
          :attendance="attendance"
          :patient="patient"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PatientExamsListHeader from '../components/PatientExamListHeader'
import PatientExamList from '../components/PatientExamList'
import TheSidebar from '../components/TheSidebar'
import { bus } from '../main'
export default {
  name: 'DoctorPatientExams',
  props: {
    healthCenter: {
      type: Number,
      default: null
    },
    attendance: {
      type: Number,
      default: null
    },
    patient: {
      type: Number,
      default: null
    }
  },
  components: {
    /* PatientExams */
    PatientExamsListHeader,
    TheSidebar,
    PatientExamList
  },
  data () {
    return {
      attendances: false
    }
  },
  created () {
    console.log(this.healthCenter)
    console.log(this.attendance)
    console.log(this.patient)
    bus.$on('sidebar', (data) => {
      this.attendances = data
    })
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/animations/__dropside'
@import '../styles/_scrollbar'
@include scrollbar($el: '#scrollbar', $w: 15px)

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
  width:  calc( 100% - 321px )
  margin-top: 90px
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 60px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 50px
.doctor-patient__sidebar,
.doctor-patient__patient
  position: fixed
  top: 60px
.doctor-patient__sidebar
  @include respond-to(wide-screens)
    display: block
  position: fixed
  width: 321px
  overflow-y: auto
  height: 100vh
  z-index: 4
  @include respond-to(medium-screens)
    overflow-x: hidden
.doctor-patient__patient
  width: calc( 100% - 321px )
  z-index: 2
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
</style>