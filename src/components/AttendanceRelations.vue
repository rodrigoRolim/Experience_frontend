<template>
  <div class="attendance-relations">
    <div class="attendance-relations__item"
      v-for="attendance in attendances"
      :key="attendance.atendimento"
      :id="attendance.atendimento"
      @click="highlight(attendance.atendimento)"
    >
      <attendance-relations-item
        :attendance-date="attendance.data_atd"
        :list-exams="attendance.mnemonicos"
      />
    </div>
  </div>
</template>
<script>
import AttendanceRelationsItem from './AttendanceRelationsItem'
export default {
  name: 'AttendanceRelations',
  components: {
    AttendanceRelationsItem
  },
  props: {
    attendances: {
      type: Array,
      required: true
    },
    attendanceDate: String,
    listExams: String 
  },
  data () {
    return {
      lastClicked: ''
    }
  },
  methods: {
    highlight (value) {
      let currentItem
      if (this.lastClicked) {
        currentItem = document.getElementById(this.lastClicked)
        currentItem.classList.remove('attendance-relations__item--active')
      }
      let item = document.getElementById(value)
      item.classList.add('attendance-relations__item--active')
      this.lastClicked = value
    }
  }
}
</script>
<style lang="sass" scoped>
.attendance-relations__item
  display: flex
  flex-flow: row wrap
  border-radius: 4px
  margin: 0 15px
  color: white
  padding: 20px 10px
  cursor: pointer
  user-select: none
  max-width: 350px
.attendance-relations__item--active
  background-color: white
  color: $green

</style>