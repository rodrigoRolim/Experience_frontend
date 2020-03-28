<template>
  <div class="container-attendance">
    <div class="info-attendance">
      <attendance-id :idAttendance="idAttendance" />
      <attendance-agreement :agreement="agreement" />
      <attendance-date :dateAttendance="dataAttendance" />
      <attendance-delivery :dateDelivery="dataDelivery" />
     
    </div>
    <hr :class="getSituation">
    <attendance-exams :exams="exams"/>
    <!-- <div class="list-exams" :class="getSituation">
      <span><font-awesome-icon icon="flask" size="2x" class="icon" :style="{color: 'green'}"/></span>
      <div class="label">
        <span>Exames</span>
        <span class="exams">{{exams}}</span>
      </div>
    </div> -->
  </div>
</template>

<script>
import AttendanceId from './AttendanceId'
import AttendanceAgreement from './AttendanceAgreement'
import AttendanceDate from './AttendanceDate'
import AttendanceDelivery from './AttendanceDelivery'
import AttendanceExams from './AttendanceExams'
import { situation } from '../mixins/situation'
export default {
  name: 'AttendanceListItemDetail',
  mixins: [situation],
  props: {
    agreement: String,
    idAttendance: String,
    dataAttendance: String,
    dataDelivery: String,
    exams: String,
    situation: String,
    AttendanceExams: String
  },
  components: {
    AttendanceId,
    AttendanceAgreement,
    AttendanceDate,
    AttendanceDelivery,
    AttendanceExams
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="sass" scoped>

@import "../styles/_colors.sass"

$border-value: 1px solid
$p-side: 12px
$p-top-bott: 5px
.container-attendance
  font-size: 0.8rem
  color: #3e3f3f
  margin-top: 3px
  width: 55%
  text-align: justify
  @include respond-to(handhelds)
    width: 100%
  @include respond-to(medium-screens)
    width: 100%

.info-attendance
  display: flex
  flex-direction: row
  justify-content: space-between
  padding-bottom: $p-top-bott
  width: 85%
  @include respond-to(handhelds)
    padding: 0 $p-side
    flex-direction: column
    width: 100%
  @include respond-to(medium-screens)
    width: 65%
.pendency
  border-top: $border-value $EP
  border-left: 0 
.finished
  border-top: $border-value $TF
  border-left: 0 
.partial-finished
  border-top: $border-value $PF
  border-left: 0 
.in-progress
  border-top: $border-value $EA
  border-left: 0 
.unrealized
  border-top: $border-value $NR
  border-left: 0 
</style>