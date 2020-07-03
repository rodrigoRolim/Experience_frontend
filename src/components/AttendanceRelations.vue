<template>
<div class="attendace-relations">
  <div class="attendance-relations-item"
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
  created () {
    console.log(this.attendances)
  },
  methods: {
    highlight (value) {
      let currentItem
      if (this.lastClicked) {
        currentItem = document.getElementById(this.lastClicked)
        currentItem.classList.remove('attendance-relations-item--active')
      }
      let item = document.getElementById(value)
      item.classList.add('attendance-relations-item--active')
      this.lastClicked = value
    }
  }
}
</script>
<style lang="sass" scoped>
.attendance-relations-item
  display: flex
  flex-flow: row wrap
  margin-left: 10px
  margin-top: 10px
  @include respond-to(handhelds)
    margin-right: 10px
    border-radius: 4px
  color: white
  padding: 20px 10px
  cursor: pointer
  user-select: none
.attendance-relations-item--active
  background-color: white
  color: $green

</style>