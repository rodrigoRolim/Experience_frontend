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
  @include respond-to(medium-screens)
    width: 345px
  @include respond-to(handhelds)
    width: 100%
  border-right: 1px solid rgba(0,0,0,0.01)
.sidebar__header
  display: flex
  position: fixed
  width: 345px
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
  margin-top: 10px
  @include respond-to(handhelds)
    margin-right: 10px
    border-radius: 4px
  color: $green
  padding: 20px 10px
  cursor: pointer
  user-select: none
.sidebar__date,
.sidebar__exams
  overflow: hidden 
</style>