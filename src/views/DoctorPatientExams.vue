<template>
  <div class="doctor-patient">
    <div class="doctor-patient__sidebar"
      :class="{ 'sidebar--show': displaySideBar, 'sidebar--hidden': !displaySideBar }"
    >
      <the-sidebar />
    </div>
    <div class="doctor-patient__main" >
      <div class="doctor-patient__patient" :class="{ 'doctor-patient__patient--up-hidden': hiddenElement }">
        <patient-exams-list-header 
          :patient="parseInt(patient)"
          :name="name"
          :age="age"
          :gender="gender"
          :delivery="delivery"
          :doctor="doctor"
          :health-insurance="healthInsurance"
        />
      </div>
      <div class="doctor-patient__exams">
        <code-modal
          class="doctor-patient__modal"
          :display="displayLoading"
          position="center"
        >
          <template v-slot:modal>
            <code-loading
              class="doctor-patient__spin"   
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
import { hiddenByScroll } from '../mixins/hiddenByScroll'
import { 
  NAMESPACED_PROPS, 
  NAMESPACED_EXAMS, 
  NAMESPACED_ATTENDANCE, 
  GET_ATTENDANCES_RELATIONS, 
  GET_ATTENDANCES_STORE, 
  GET_EXAMS_STORE
} from '../utils/alias'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { bus } from '../main'
export default {
  name: 'DoctorPatientExams',
  mixins: [hiddenByScroll],
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
      'name',
      'age',
      'gender',
      'delivery',
      'doctor',
      'healthInsurance'
    ]),
    ...mapGetters(NAMESPACED_EXAMS, {
      statusExams: 'status'
    }),
    ...mapGetters(NAMESPACED_ATTENDANCE, {
      statusAtt: 'status'
    }),
    displayLoading() {
      return this.statusAtt === 'loading' || this.statusExams === 'loading'
    }
  },
  methods: {
    ...mapActions(NAMESPACED_ATTENDANCE, {
      getAttendances: GET_ATTENDANCES_STORE
    }),
    ...mapMutations(NAMESPACED_EXAMS, {
      setExamList: GET_EXAMS_STORE
    }),
    async getAttendancesRelations () {
      try {
        let url = GET_ATTENDANCES_RELATIONS(this.patient)
        await this.getAttendances({ url })
      } catch(e) {
        if (e.response.status === 404) {
          this.setExamList([])
        } 
      }       
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/animations/__dropside'
.doctor-patient
  display: flex
  min-height: 100vh
  @include respond-to(handhelds)
    margin-top: 60px
    margin-bottom: 40px
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
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 120px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 85px
.doctor-patient__modal
  z-index: 2
.doctor-patient__spin
  right: calc(100% - 221px)
  @include respond-to(medium-screens)
    right: 0
  @include respond-to(handhelds)
    right: 0
.doctor-patient__modal
  position: fixed
  top: 60px
.doctor-patient__patient
  position: fixed
  top: 60px
  transition: top 0.3s
.doctor-patient__sidebar
  transition: left 0.5s linear
  @include respond-to(wide-screens)
    display: block
    margin-top: 60px
  @include respond-to(medium-screens)
    margin-top: 60px
  position: fixed
  width: 301px
  height: calc(100vh - 60px)
  z-index: 3
  @include respond-to(medium-screens)
    overflow-x: hidden
.doctor-patient__patient
  width: calc( 100% - 301px )
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
.doctor-patient__patient--up-hidden
  top: 0
</style>