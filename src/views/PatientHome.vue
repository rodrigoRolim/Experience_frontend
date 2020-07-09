<template>
  <div class="patient-exams">
    <!-- <transition
      name="dropside"
      enter-active-class="sidebar--show"
      leave-active-class="sidebar--hidden"
    > -->
      <div class="patient-exams__sidebar" 
        :class="{ 'sidebar--show': attendances, 'sidebar--hidden': !attendances }">
        <the-sidebar />
      </div>
    <!-- </transition> -->
    <div class="patient-exams__main">
      <div class="patient-exams__patient">
        <patient-exams-list-header></patient-exams-list-header>
      </div>
      <div class="patient-exams__exams">
        <patient-exam-list />
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
  name: 'PatientExams',
  components: {
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
    bus.$on('sidebar', (data) => {
      this.attendances = data
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
  margin-top: 110px
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 60px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 0
    margin-top: 50px
.patient-exams__patient
  position: fixed
.patient-exams__sidebar
  @include respond-to(wide-screens)
    display: block
  position: fixed
  width: 360px
  overflow-y: auto
  height: 100vh
  z-index: 4
  @include respond-to(medium-screens)
    overflow-x: hidden
  
.patient-exams__patient
  width: calc(100% - 360px)
  z-index: 2
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
   
</style>