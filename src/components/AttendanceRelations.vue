<template>
  <div class="attendance-relations">
    <div class="attendance-relations__item"
      v-for="(attendance, i) in attendances"
      :key="i"
      :class="{ 'attendance-relations__item--active': setIdentifier(attendance.posto, attendance.atendimento) === selected }"
      @click="highlight(attendance.posto, attendance.atendimento)"
    >
      <attendance-relations-item
        :attendance-date="attendance.data_atd | data"
        :attendance-id="attendance.posto| id(attendance.atendimento)"
        :list-exams="getMnemonicos(attendance.ExamesObj)"
      />
    </div>
  </div>
</template>
<script>
import AttendanceRelationsItem from './AttendanceRelationsItem'
import { mapGetters, mapActions } from 'vuex'
import { NAMESPACED_ATTENDANCE, CHANGE_SELECTED_ATTENDANCE }  from '../utils/alias'

export default {
  name: 'AttendanceRelations',
  components: {
    AttendanceRelationsItem
  },
  props: {
    attendanceDate: String,
    listExams: String 
  },
  data () {
    return {
      selected: ''      
    }
  },
  filters: {
    data (dateString) {
      const date = new Date(dateString).toLocaleDateString("pt-BR")
      return date !== "Invalid Date" ? date : ""
    },
    age (dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);

      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      const ageDate = age.toString()

      return !isNaN(ageDate) ? ageDate : "";
    },
    id (healthCenter, attendanceId) {
      return healthCenter + '/' + attendanceId
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'attendances',
      'healthCenter',
      'attendanceId'
    ]),
    initialySelected () {
      console.log(this.healthCenter, this.attendanceId)
      return this.healthCenter + '/' + this.attendanceId
    }
  },
  watch: {
    initialySelected (value) {
      this.selected = value
    }
  },
  methods: {
    ...mapActions(NAMESPACED_ATTENDANCE, {
      changeSelected: CHANGE_SELECTED_ATTENDANCE
    }),
    getMnemonicos (exams) {
      return exams.map(item => item.mnemonico).join(' ')
    },
    setIdentifier (healthCenter, attendanceId) {
      return healthCenter + '/' + attendanceId
    },
    highlight (healthCenter, attendanceId) {
      this.selected = this.setIdentifier(healthCenter, attendanceId)
      this.changeSelected({healthCenter, attendanceId})
    }
  }
}
</script>
<style lang="sass" scoped>
.attendance-relations__item
  display: flex
  flex-flow: row wrap
  border-top-left-radius: 4px
  border-bottom-left-radius: 4px
  margin: 0 15px
  color: white
  padding: 20px 10px
  cursor: pointer
  user-select: none
  max-width: 350px
.attendance-relations__item--active
  background-color: white
  width: 305px
  color: $green
</style>
