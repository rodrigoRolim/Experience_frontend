<template>
  <div class="container-list-attendances" id="scrollbar-att">
    <attendance-list-item
      v-for="attendance in attendances" v-bind:key="attendance.idAttendance"
      :photo="attendance.photo"
      :name="attendance.name"
      :age="attendance.age"
      :gender="attendance.gender"
      :idAttendance="attendance.idAttendance"
      :agreement="attendance.agreement"
      :dataAttendance="attendance.dataAttendance"
      :dataDelivery="attendance.dataDelivery"
      :exams="attendance.exams"
      :situation="attendance.situation"
    ></attendance-list-item>
  </div>
</template>
<script>
import AttendanceListItem from './AttendanceListItem'
export default {
  name: 'AttendanceList',
  props: {
    attendances: {
      type: Array
    } 
  },
  components: {
    AttendanceListItem
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="sass" scoped>
@import "../styles/_scrollbar.sass"
@include scrollbar('#scrollbar-att')
#scrollbar-att
  margin: 0 10px 
  max-height: 400px
  overflow: auto
</style>