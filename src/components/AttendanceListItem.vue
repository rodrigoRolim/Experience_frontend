<template>
  <div class="attendance-item" :class="getSituation | situationModifier"
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
      <code-chip-situation class="attendance-item__situation" :situation="situation"/>
      <attendance-list-item-detail
        class="attendance-item__details"
        :idAttendance="idAttendance"
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
import CodeChipSituation from './base/CodeChipSituation'
import { situation } from '../mixins/situation'
export default {
  name: 'AttendanceListItem',
  mixins: [situation],
  props: {
    photo: String,
    name: String,
    age: String,
    gender: String,
    idAttendance: String,
    healthCenter: String,
    agreement: String,
    dataAttendance: String,
    dataDelivery: String,
    exams: String,
    situation: String,
    patient: String   
  },
  components: {
    AttendanceListItemDetail,
    AttendanceListItemProfile,
    CodeChipSituation
  },
  data () {
    return {

    }
  },
  filters: {
    situationModifier (situation) {
      return 'attendance-item--'+situation
    }
  },
  methods: {
    patientExamsView () {
      this.$router.push(`/paciente/${this.patient}/${this.idAttendance}`)
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../styles/colors/__status-colors.scss"

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
  @include card-situation($status: "EP", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-situation($status: "EP", $border-large: top, $transparent: true)
.attendance-item--finished
  @include card-situation($status: "TF", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-situation($status: "TF", $border-large: top, $transparent: true)
.attendance-item--partial-finished
  @include card-situation($status: "PF", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-situation($status: "PF", $border-large: top, $transparent: true)
.attendance-item--in-progress
  @include card-situation($status: "EA", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-situation($status: "EA", $border-large: top, $transparent: true)
.attendance-item--unrealized
  @include card-situation($status: "NR", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-situation($status: "NR", $border-large: top, $transparent: true)
</style>