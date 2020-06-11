<template>
  <div class="doctor-patient-exams">
    <div class="doctor-patient-exams__sidebar" 
      :class="{
        'sidebar--hidden': hidden, 
        'sidebar--show': show,
        'sidebar--modal': show,
        'sidebar--initial': !hidden && !show
      }"
      @click.self="closeSidebar"
      >
      <the-sidebar />
    </div>
    <div class="doctor-patient-exams__main">
      <div class="doctor-patient-exams__patient">
        <patient-exams-list-header></patient-exams-list-header>
      </div>
      <div class="doctor-patient-exams__exams">
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
  name: 'DoctorPatientExams',
  components: {
    PatientExamsListHeader,
    TheSidebar,
    PatientExamList
  },
  data () {
    return {
      show: false,
      hidden: false
    }
  },
  created () {
    bus.$on('collapser', (data) => {
      this.show = data
      this.hidden = !data
    })
  },
  methods: {
    closeSidebar () {
      this.show = false
      this.hidden = true
      bus.$emit('uncollapser', false)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/animations/__dropside'
.doctor-patient-exams
  display: flex
  margin-top: 9vh
.doctor-patient-exams__main
  display: flex
  flex-direction: column
  align-items: flex-end
  width: 100%
.doctor-patient-exams__exams
  width: calc( 100% - 320px )
  margin-top: 27vh
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 20vh
  @include respond-to(handhelds)
    width: 100%
    margin-top: 24vh
.doctor-patient-exams__sidebar,
.doctor-patient-exams__patient
  position: fixed
.doctor-patient-exams__sidebar
  z-index: 3
.doctor-patient-exams__patient
  width: calc( 100% - 320px )
  z-index: 2
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
</style>