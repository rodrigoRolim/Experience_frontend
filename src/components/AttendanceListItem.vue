<template>
<div class="container-item" :class="getSituation">
  <attendance-list-item-profile
    :name="name"
    :age="age"
    :gender="gender"
    :situation="situation"
  />
  <code-chip-situation class="container-item__situation" :situation="situation"/>
  <attendance-list-item-detail
    :idAttendance="idAttendance"
    :agreement="agreement"
    :dataDelivery="dataDelivery"
    :dataAttendance="dataAttendance"
    :exams="exams"
    :situation="situation"
  />
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
    agreement: String,
    dataAttendance: String,
    dataDelivery: String,
    exams: String,
    situation: String
  },
  components: {
    AttendanceListItemDetail,
    AttendanceListItemProfile,
    CodeChipSituation
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="sass" scoped>
@import "../styles/_colors.sass"
@import "../styles/colors/_status-colors.sass"
$border-pendecy: 1px solid $EP

.container-item
  display: flex
  flex-direction: row
  justify-content: space-between
  padding: 10px 20px
  margin: 5px 10px
  cursor: pointer
  border-radius: 2px
  @include respond-to(handhelds)
    flex-direction: column
    padding: 0
  @include respond-to(medium-screens)
    flex-direction: column
.container-item__situation
  @include respond-to(handhelds)
    align-self: center
  @include respond-to(medium-screens)
    margin-right: 90px
.container-item:hover
  -webkit-box-shadow:  0 0 6px rgba(0,0,0,.3)
.pendency
  @include card-situation($status: "EP", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-situation($status: "EP", $border-large: top, $transparent: true)
.finished
  @include card-situation($status: "TF", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-situation($status: "TF", $border-large: top, $transparent: true)
.partial-finished
  @include card-situation($status: "PF", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-situation($status: "PF", $border-large: top, $transparent: true)
.in-progress
  @include card-situation($status: "EA", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-situation($status: "EA", $border-large: top, $transparent: true)
.unrealized
  @include card-situation($status: "NR", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-situation($status: "NR", $border-large: top, $transparent: true)
</style>