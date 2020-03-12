<template>
<div class="container-item" :class="getSituation">
  <AttendanceListItemPicture
    :photo="photo"
    :situation="situation"
  />
  <AttendanceListItemProfile
    :name="name"
    :age="age"
    :gender="gender"
    :situation="situation"
  />
  <AttendanceListItemDetail
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
import AttendanceListItemPicture from './AttendanceListItemPicture'
import AttendanceListItemProfile from './AttendanceListItemProfile'
import AttendanceListItemDetail from './AttendanceListItemDetail'
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
    AttendanceListItemPicture,
    AttendanceListItemProfile
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
  min-height: 60px
  margin: 5px 10px
  cursor: pointer
.container-item:hover
  zoom: 1.05
  -webkit-box-shadow:  0 0 6px rgba(0,0,0,.3)
.pendency
  border-left: 5px solid $EP
  @include color-situation($EP)
.finished
  border-left: 5px solid $TF
  @include color-situation($TF)
.partial-finished
  border-left: 5px solid $PF
  @include color-situation($PF)
.in-progress
  border-left: 5px solid $EA
  @include color-situation($EA)
.unrealized
  border-left: 5px solid $NR
  @include color-situation($NR)
  
</style>