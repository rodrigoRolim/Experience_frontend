<template>
  <div class="attendance-relations">
    <div class="attendance-relations__item"
      v-for="(attendance, i) in attendances"
      :key="attendance.atendimento"
      :class="{ 
        'attendance-relations__item--active': setIdentifier(attendance.posto, attendance.atendimento) === selected,
      }"
      @click="select(attendance.posto, attendance.atendimento)"
    >
      <attendance-relations-item
        :item="i"
        :name-patient="attendance.nomeCliente"
        :delivery-date="attendance.dataEntrega | dateFormat"
        :gender="attendance.sexo | sexByInitial"
        :age="attendance.dataNas | ageByBirthday"
        :doctor="attendance.nomeSolicitante"
        :attendance-date="attendance.dataAtd | dateFormat"
        :attendance="attendance.atendimento"
        :health-center="attendance.posto"
        :list-exams="attendance.mnemonicos"
        :health-insurance="attendance.nomeConvenio"
        :patient="attendance.registro"
        @selected="selectedByDefault"
      />
    </div>
  </div>
</template>
<script>
import AttendanceRelationsItem from './AttendanceRelationsItem'
import { mapGetters, mapMutations } from 'vuex'
import { NAMESPACED_ATTENDANCE, NAMESPACED_EXAMS, SELECTED }  from '../utils/alias'
import { date, age, sex } from '../mixins/formater'
export default {
  name: 'AttendanceRelations',
  components: {
    AttendanceRelationsItem
  },
  mixins: [date, age, sex],
  data () {
    return {
      selected: ''
    }
  },
  created() {

  }, 
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'attendances'
    ])
  },
  methods: {
    ...mapMutations(NAMESPACED_EXAMS, {
      selectedToRequestExams: SELECTED
    }),
    setIdentifier(healthCenter, attendanceId) {
      return healthCenter + '/' + attendanceId
    },
    select(healthCenter, attendanceId) {
      this.selected = this.setIdentifier(healthCenter, attendanceId)
      this.startExamsLoading(healthCenter, attendanceId)
    },
    startExamsLoading(hc, att) {
      this.selectedToRequestExams({healthCenter: hc, attendance: att})
    },
    selectedByDefault(value) {
      this.selected = this.setIdentifier(value.healthCenter, value.attendance)
      this.startExamsLoading(value.healthCenter, value.attendance)
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../styles/__themes.sass"
.attendance-relations
  height: calc(100vh - 170px)
  overflow-y: auto
  overflow-x: hidden
.attendance-relations__item
  display: flex
  flex-flow: row wrap
  border-top-left-radius: 4px
  border-bottom-left-radius: 4px
  margin-left: 10px
  color: white
  padding: 20px 10px
  cursor: pointer
  user-select: none
  max-width: 340px
.attendance-relations__item--active,
.attendance-relations__item--initial-active
  background-color: white
  width: 290px
  color: $color__letters
</style>
