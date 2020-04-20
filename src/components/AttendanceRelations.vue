<template>
<div class="attendace-relations">
  <code-info
    icon="calendar-alt"
    :info="attendanceDate"
    description="data atendimento"
    class="sidebar__row__date"
    size="lg"
  ></code-info>
  <code-info
    icon="flask"
    :info="listExams"
    description="exames"
    size="lg"
  ></code-info>
</div>
</template>
<script>
export default {
  name: 'AttendanceRelations',
  props: {
    attendanceDate: String,
    listExams: String 
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="sass" scoped>
.attendace-relations
  display: flex
  flex-flow: row wrap
  background-color: white
  margin-left: 10px
  color: #368c8c
  padding: 20px 10px
</style>