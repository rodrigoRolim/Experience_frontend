<template>
  <div class="doctor-patient">
    <div class="doctor-patient__sidebar"
      id="scrollbar" 
      :class="{ 'sidebar--show': displaySideBar, 'sidebar--hidden': !displaySideBar }"
    >
      <the-sidebar />
    </div>
    <div class="doctor-patient__main" >
      <div class="doctor-patient__patient">
        <patient-exams-list-header />
      </div>
      <div class="doctor-patient__exams">
        <code-modal
          class="doctor-patient__modal"
          :display="displayLoading"
          position="center"
        >
          <template v-slot:modal>
            <code-loading
              class="health-center-patient__spin"   
              range="50px"
              velocity="1x"
            />
          </template>
        </code-modal>
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
import CodeModal from '../components/base/CodeModal'
import CodeLoading from '../components/base/CodeLoading'
import { 
  NAMESPACED_PROPS, 
  NAMESPACED_EXAMS, 
  NAMESPACED_ATTENDANCE, 
  GET_ATTENDANCES_RELATIONS, 
  GET_ATTENDANCES_STORE 
} from '../utils/alias'
import { mapGetters, mapActions } from 'vuex'
import { bus } from '../main'
export default {
  name: 'DoctorPatientExams',
  components: {
    CodeLoading,
    CodeModal,
    PatientExamsListHeader,
    TheSidebar,
    PatientExamList
  },
  data () {
    return {
      displaySideBar: false
    }
  },
  created () {
    bus.$on('sidebar', (data) => {
      this.displaySideBar = data
    })
    this.getAttendancesRelations()
  },
  computed: {
    ...mapGetters(NAMESPACED_PROPS, [
      'patient',
      'healthCenter',
      'attendance'
    ]),
    ...mapGetters(NAMESPACED_EXAMS, [
      'status'
    ]),
    displayLoading() {
      return this.status === 'loading'
    }
  },
  methods: {
    ...mapActions(NAMESPACED_ATTENDANCE, {
      getAttendances: GET_ATTENDANCES_STORE
    }),
    async getAttendancesRelations () {
      console.log(this.patient)
      let url = GET_ATTENDANCES_RELATIONS(this.patient)
      await this.getAttendances({ url })
       
    }
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
  width:  calc( 100% - 301px )
  margin-top: 150px
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 120px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 60px
.doctor-patient__modal
  z-index: 2
.doctor-patient__modal,
.doctor-patient__patient
  position: fixed
  top: 60px
.doctor-patient__sidebar
  @include respond-to(wide-screens)
    display: block
  position: fixed
  width: 301px
  overflow-y: auto
  height: 100vh
  z-index: 2
  @include respond-to(medium-screens)
    overflow-x: hidden
.doctor-patient__patient
  width: calc( 100% - 301px )
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
</style>