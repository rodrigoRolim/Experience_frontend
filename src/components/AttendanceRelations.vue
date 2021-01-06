<template>
  <div class="attendance-relations">
    <div class="attendance-relations__item"
      v-for="attendance in attendances"
      :key="attendance.correl"
      :class="{ 'attendance-relations__item--active': setIdentifier(attendance.posto, attendance.atendimento) === selected }"
      @click="select(attendance.posto, attendance.atendimento)"
    >
      <attendance-relations-item
        :attendance-date="attendance.data_atd | data"
        :attendance="attendance.atendimento"
        :health-center="healthCenter"
        :list-exams="attendance.mnemonicos"
      />
    </div>
  </div>
</template>
<script>
import AttendanceRelationsItem from './AttendanceRelationsItem'
import { mapGetters } from 'vuex'
import { NAMESPACED_ATTENDANCE, NAMESPACED_PROPS }  from '../utils/alias'

export default {
  name: 'AttendanceRelations',
  components: {
    AttendanceRelationsItem
  },
  data () {
    return {
      selected: ''
    }
  },
  created() {
    this.selected = this.initialySelected
  }, 
  filters: {
    data(dateString) {
      const date = new Date(dateString).toLocaleDateString("pt-BR")
      return date !== "Invalid Date" ? date : ""
    },
    age(dateString) {
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
    id(healthCenter, attendanceId) {
      return healthCenter + '/' + attendanceId
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'attendances'
    ]),
    ...mapGetters(NAMESPACED_PROPS, [
      'healthCenter',
      'attendance'
    ]),
    initialySelected() {
      return this.healthCenter + '/' + this.attendance
    }
  },
  methods: {
    setIdentifier(healthCenter, attendanceId) {
      return healthCenter + '/' + attendanceId
    },
    select(healthCenter, attendanceId) {
      this.selected = this.setIdentifier(healthCenter, attendanceId)
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
