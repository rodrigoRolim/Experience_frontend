<template>
  <div class="patient-exams">
    <div 
      class="patient-exams__sidebar" 
      :class="{ 'sidebar--show': attendances, 'sidebar--hidden': !attendances }"
    >
      <the-sidebar />
    </div>
    <div class="patient-exams__main">
      <code-modal
        class="patient-exams__modal"
        :display="loading"
        position="center"
      >
        <template v-slot:modal>
          <code-loading 
            class="patient-exams__spin"   
            range="50px"
            velocity="1x"
          />
        </template>
      </code-modal>
      <div class="patient-exams__patient">
        <patient-exams-list-header 
          :patient="parseInt(patient)"
          :health-center="parseInt(healthCenter)"
          :attendance="parseInt(attendance)"
          :name="name"
          :age="age"
          :gender="gender"
          :delivery="delivery"
          :doctor="doctor"
          :health-insurance="healthInsurance"
        />
      </div>
      <transition name="slide-fade">
        <code-message
          v-if="displayMessage"
          class="patient-exams__message"
          :message="message.content || ''"
          :type-message="message.type"
          position="center"
          icon="info-circle"
        />
      </transition>
      <div class="patient-exams__exams">
        <patient-exam-list 
          :health-center="parseInt(selected.hc)" 
          :attendance="selected.att"
        />
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
import CodeMessage from '../components/base/CodeMessage'
import { bus } from '../main'
import { mapActions, mapGetters } from 'vuex'
import { 
  GET_ATTENDANCE, 
  GET_ATTENDANCES_BY_CLIENT,
  NAMESPACED_ATTENDANCE, 
  GET_ATTENDANCES_STORE, 
  NAMESPACED_AUTH,
  NAMESPACED_EXAMS,
  NAMESPACED_PROPS,
  NAMESPACED_REPORT
} from '../utils/alias'
export default {
  name: 'PatientExams',
  components: {
    PatientExamsListHeader,
    TheSidebar,
    PatientExamList,
    CodeLoading,
    CodeModal,
    CodeMessage
  },
  data() {
    return {
      attendances: false,
      displayMessage: false
    }
  },
  created() {
    bus.$on('sidebar', (data) => {
      this.attendances = data
    })
    if (this.uniqueAttendance) {
      this.getAttendances({ url: GET_ATTENDANCE })
        .then((resp) => console.log(resp))
        .catch((err) => console.log({err}))
        return
    }
    this.getAttendances({ url: GET_ATTENDANCES_BY_CLIENT })
      .then((resp) => console.log(resp))
      .catch((err) => console.log({err}))
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'examsToPrint'
    ]),
    ...mapGetters(NAMESPACED_AUTH, [
      'uniqueAttendance'
    ]),
    ...mapGetters(NAMESPACED_EXAMS, [
      'status',
      'selected'
    ]),
    ...mapGetters(NAMESPACED_PROPS, [
      'patient',
      'attendance',
      'healthCenter',
      'name',
      'age',
      'gender',
      'delivery',
      'doctor',
      'healthInsurance'
    ]),
    ...mapGetters(NAMESPACED_REPORT, [
      'message'
    ]),
    loading() {
      return this.status === 'loading'
    }
  },
  watch: {
    message(value) {
      if (value) {
        this.displayMessage = true
        setTimeout(() => {
          this.displayMessage = false
        }, 10000)
      }
    }
  },
  methods: {
    ...mapActions(NAMESPACED_ATTENDANCE, {
      getAttendances: GET_ATTENDANCES_STORE
    })
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/animations/__dropside'
@import '../styles/transitions/__slide_fade.scss'
.patient-exams
  display: flex
  @include respond-to(handhelds)
    margin-top: 60px
    margin-bottom: 40px
  min-height: 100vh
.patient-exams__main
  width: calc( 100% - 301px )
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
  margin-left: 301px
.patient-exams__exams
  width: 100%
  margin-top: 150px
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 120px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 85px
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
.patient-exams__modal
  z-index: 2
.patient-exams__spin
  right: calc(100% - 221px)
  @include respond-to(medium-screens)
    right: 0
  @include respond-to(handhelds)
    right: 0
.patient-exams__patient
  width: calc(100% - 301px)
  z-index: 2
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
.patient-exams__message
  width: 100%
  position: fixed
  z-index: 999
  bottom: 0
</style>