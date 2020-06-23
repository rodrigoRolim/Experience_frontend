<template>
  <div class="patient-exams">
    <div class="patient-exams__sidebar" 
      :class="{'sidebar--hidden': !attendances, 'sidebar--show': attendances}"
    v-if="attendancesMobile">
      <the-sidebar />
    </div>
    <div class="patient-exams__main" v-if="patientMobile || examsMobile">
      <div class="patient-exams__patient" v-if="patientMobile">
        <patient-exams-list-header></patient-exams-list-header>
      </div>
      <div class="patient-exams__exams" v-if="examsMobile">
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
      attendances: false,
      patient: false,
      exams: true
    }
  },
  created () {
    this.initResize()
    bus.$on('collapser', (data) => {
      this.attendances = data
    })
    if (this.detectHandhelds()) {
      bus.$on('attendances', (data) => {
        this.attendances = data
        this.patient = !data
        this.exams = !data
      })
      bus.$on('patient', (data) => {
        this.attendances = !data
        this.patient = data
        this.exams = !data
      })
      bus.$on('exams', (data) => {
        this.attendances = !data
        this.patient = !data
        this.exams = data
      })
    }
  },
  beforeDestroy () {
    this.destroyResize()
    bus.$off('collapser')
    if (this.detectHandhelds()) {
      bus.$off('attendances')
      bus.$off('patient')
      bus.$off('exams')
    }
  },
  computed: {
    attendancesMobile () {
      if (this.detectHandhelds() || this.detectMediumScreens()) {
        return this.attendances
      }
      return true
    },
    patientMobile () {
      if (this.detectHandhelds()) {
        return this.patient
      }
      return true
    },
    examsMobile () {
      if (this.detectHandhelds()) {
        return this.exams
      }
      return true
    }
  },
  methods: {
    detectHandhelds () {
      return ( window.innerWidth <= 768 )
    },
    detectMediumScreens () {
      return ( window.innerWidth > 768 && window.innerWidth < 1023 )
    },
    detectWideScreen () {
      return  (window.innerWidth > 1023 )
    },
    initResize () {
      window.addEventListener('resize', this.rebuildView)
    },
    destroyResize () {
      window.removeEventListener('resize', this.rebuildView)
    },
    rebuildView () {
      if (this.detectMediumScreens()) {
        this.attendances = false
        this.patient = true
        this.exams = true
      }
      if (this.detectWideScreen()) {
        this.attendances = true
        this.patient = true
        this.exams = true
      }
      
    }
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
    margin-top: 0
    margin-left: 0
    width: 100%
  @include respond-to(handhelds)
    margin-top: 0
    margin-left: 0
    width: 100%
  margin-top: 60px
  margin-left: 360px
.patient-exams__exams
  width: 100%
  margin-top: 180px
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 190px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 0
.patient-exams__patient
  position: fixed
.patient-exams__sidebar
  position: fixed
  width: 360px
  margin-top: 60px
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
    margin-top: 60px
  @include respond-to(handhelds)
    width: 100%
   
</style>