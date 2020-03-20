<template>
  <div class="container-list-attendances" id="scrollbar-att">
    <attendance-list-item
      v-for="(attendance, i) in attendances" v-bind:key="i"
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
@include scrollbar('#scrollbar-att', 10px)
.container-list-attendances
  display: flex
  flex-direction: column

#scrollbar-att
  max-height: 400px
  overflow-y: auto
  overflow-x: hidden
</style>