<template>
  <div class="attendances" >
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
      :route="route"
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
    },
    route: String 
  },
  components: {
    AttendanceListItem
  },
  data () {
    return {

    }
  },
  methods: {
   
  }
}
</script>
<style lang="sass" scoped>
.attendances
  display: flex
  flex-direction: column
</style>