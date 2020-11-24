<template>
  <div class="attendance-item" :class="getStatus | statusModifier"
    @click="patientExamsView"
  >
    <div class="attendance-item__header">
      <strong class="attendance-item__name-patient"> {{name}}</strong>
    </div>
    <div class="attendance-item__body">
      <attendance-list-item-profile
        class="attendance-item__profile"
        :name="name"
        :age="age"
        :gender="gender"
      />
      <code-chip-status-attendance class="attendance-item__situation" :status="status"/>
      <attendance-list-item-detail
        class="attendance-item__details"
        :attendance="attendance"
        :health-center="healthCenter"
        :agreement="agreement"
        :dataDelivery="dataDelivery"
        :dataAttendance="dataAttendance"
        :exams="exams"
      />
    </div>
  </div>
</template>
<script>
import AttendanceListItemProfile from './AttendanceListItemProfile'
import AttendanceListItemDetail from './AttendanceListItemDetail'
import CodeChipStatusAttendance from './base/CodeChipStatusAttendance'
import { attendanceStatus } from '../mixins/attendanceStatus'
import { mapMutations } from 'vuex'
import { NAMESPACED_PROPS, SET_PROPS } from '../utils/alias'
export default {
  name: 'AttendanceListItem',
  mixins: [attendanceStatus],
  props: {
    photo: String,
    name: String,
    age: String,
    gender: String,
    attendance: String,
    healthCenter: String,
    agreement: String,
    dataAttendance: String,
    dataDelivery: String,
    exams: String,
    status: String,
    patient: String,
    doctor: String   
  },
  components: {
    AttendanceListItemDetail,
    AttendanceListItemProfile,
    CodeChipStatusAttendance
  },
  data () {
    return {

    }
  },
  filters: {
    statusModifier (situation) {
      return 'attendance-item--'+situation
    }
  },
  methods: {
    patientExamsView () {
      //{ name: 'doctorExamsPatient', params: {patient: this.patientId}}
    
      let patient = this.patient
      let healthCenter = this.healthCenter
      let attendance = this.attendance
      let namePatient = this.name
      let agePatient = this.age
      let genderPatient = this.gender
      let deliveryDate = this.dataDelivery
      let doctor = this.doctor
      this.storeProps({ patient, healthCenter, attendance, namePatient, agePatient, genderPatient, deliveryDate, doctor })
      this.$router.push({ name: 'healthCenterExamsPatient', params: {patient, attendance, healthCenter} })
    },
    ...mapMutations(NAMESPACED_PROPS, {
      storeProps: SET_PROPS
    })
  }
}
</script>
<style lang="sass" scoped>
@import "../styles/colors/__status-colors-attendances.scss"

.attendance-item
  display: flex
  flex-direction: column
  justify-content: space-between
  margin: 5px
  padding: 10px
  cursor: pointer
  border-radius: 5px
.attendance-item__header
  height: 20px
.attendance-item__name-patient
  color: rgba(71, 77, 94, 1)
  font-size: 1.0rem
  margin-bottom: 5px
.attendance-item__body
  display: flex
  flex-direction: row
  justify-content: space-between
  @include respond-to(handhelds)
    flex-direction: column
    padding: 0
  @include respond-to(medium-screens)
    flex-direction: column
.attendance-item__situation
  @include respond-to(handhelds)
    align-self: center
  @include respond-to(medium-screens)
    margin-right: 90px
.attendance-item:hover
  -webkit-box-shadow:  0 0 6px rgba(0,0,0,.3)
.attendance-item--pendency
  @include card-status-attendances($status: "EP", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "EP", $border-large: top, $transparent: true)
.attendance-item--finished
  @include card-status-attendances($status: "TF", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "TF", $border-large: top, $transparent: true)
.attendance-item--partial-finished
  @include card-status-attendances($status: "PF", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "PF", $border-large: top, $transparent: true)
.attendance-item--in-progress
  @include card-status-attendances($status: "EA", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "EA", $border-large: top, $transparent: true)
.attendance-item--no-realized
  @include card-status-attendances($status: "NR", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "NR", $border-large: top, $transparent: true)
</style>