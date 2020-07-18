<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <strong>Relação de Atendimentos</strong>
    </div>
    <div class="sidebar__body">
      <attendance-relations 
        :attendances="attendances"
      />
    </div>
  </aside>
</template>
<script>
import AttendanceRelations from './AttendanceRelations'
import db from '../db'
export default {
  name: 'TheSidebar',
  components: {
    AttendanceRelations
  },
  data () {
    return {
      attendances: db.attendances.data
    }
  },
}
</script>
<style lang="sass" scoped>
.sidebar
  display: flex
  flex-direction: column
  background-color: $green
  padding-bottom: 50px
  min-height: 100vh
  width: 321px
  border-right: 1px solid rgba(0,0,0,0.01)
.sidebar__header
  display: flex
  position: fixed
  width: 321px
  flex-direction: row
  justify-content: center
  align-items: center
  background-color: $green
  border-bottom: 1px solid
  height: 100px
  color: white
.sidebar__date
  margin-bottom: 20px
.sidebar__body
  display: flex
  flex-direction: column
  margin-top: 100px
  padding-bottom: 20px
.sidebar__row
  display: flex
  flex-flow: row wrap
  background-color: white
  margin-left: 10px
  @include respond-to(handhelds)
    border-radius: 4px
  color: $green
  cursor: pointer
  user-select: none
.sidebar__date,
.sidebar__exams
  overflow: hidden 
</style>