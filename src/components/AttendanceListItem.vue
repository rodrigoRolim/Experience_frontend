<template>
<div class="container-item" :class="getSituation">
 <!--  <AttendanceListItemPicture
    :photo="photo"
    :situation="situation"
  /> -->
  <attendance-list-item-profile
    :name="name"
    :age="age"
    :gender="gender"
    :situation="situation"
  />
  <code-chip-situation :situation="situation"/>
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
.container-item:hover
  -webkit-box-shadow:  0 0 6px rgba(0,0,0,.3)
.pendency
  border-left: 5px solid $EP
  @include color-situation($EP)
  @include respond-to(handhelds)
    border-top: 5px solid $EP
    border-left: 1px solid $EP
.finished
  border-left: 5px solid $TF
  @include color-situation($TF)
  @include respond-to(handhelds)
    border-top: 5px solid $TF
    border-left: 1px solid $TF
.partial-finished
  border-left: 5px solid $PF
  @include color-situation($PF)
  @include respond-to(handhelds)
    border-top: 5px solid $PF
    border-left: 1px solid $PF
.in-progress
  border-left: 5px solid $EA
  @include color-situation($EA)
  @include respond-to(handhelds)
    border-top: 5px solid $EA
    border-left: 1px solid $EA
.unrealized
  border-left: 5px solid $NR
  @include color-situation($NR)
  @include respond-to(handhelds)
    border-top: 5px solid $NR
    border-left: 1px solid $NR
</style>