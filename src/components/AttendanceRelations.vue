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
        :name-patient="attendance.nome_cliente"
        :delivery-date="attendance.data_entrega | date"
        :gender="attendance.sexo | sex"
        :age="attendance.data_nas | age"
        :doctor="attendance.nome_solicitante"
        :attendance-date="attendance.data_atd | date"
        :attendance="attendance.atendimento"
        :health-center="attendance.posto"
        :list-exams="attendance.mnemonicos"
        @selected="selectedByDefault"
      />
    </div>
  </div>
</template>
<script>
import AttendanceRelationsItem from './AttendanceRelationsItem'
import { mapGetters, mapMutations } from 'vuex'
import { NAMESPACED_ATTENDANCE, NAMESPACED_EXAMS, SELECTED }  from '../utils/alias'
import { formater } from '../mixins/formater'
export default {
  name: 'AttendanceRelations',
  components: {
    AttendanceRelationsItem
  },
  mixins: [formater],
  data () {
    return {
      selected: ''
    }
  },
  created() {
    //this.selected = this.setIdentifier(this.healthCenter, this.attendance)
    //console.log(this.selected)
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
      console.log(value)
      this.selected = this.setIdentifier(value.healthCenter, value.attendance)
      this.startExamsLoading(value.healthCenter, value.attendance)
    },
    
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
.attendance-relations__item--active,
.attendance-relations__item--initial-active
  background-color: white
  width: 305px
  color: $green
</style>
