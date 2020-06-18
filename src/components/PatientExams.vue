<template>
  <div class="patient-exams">
    <div class="patient-exams__sidebar" 
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
import PatientExamsListHeader from './PatientExamListHeader'
import PatientExamList from './PatientExamList'
import TheSidebar from './TheSidebar'
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
.patient-exams
  display: flex
  margin-top: 9vh
.patient-exams__main
  display: flex
  flex-direction: column
  align-items: flex-end
  width: 100%
.patient-exams__exams
  width: calc( 100% - 320px )
  margin-top: 18vh
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 12vh
  @include respond-to(handhelds)
    width: 100%
    margin-top: 15vh
.patient-exams__sidebar,
.patient-exams__patient
  position: fixed
.patient-exams__sidebar
  z-index: 3
.patient-exams__patient
  width: calc( 100% - 320px )
  z-index: 2
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
</style>