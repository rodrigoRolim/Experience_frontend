<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <strong>Relação de Atendimentos</strong>
    </div>
    <div class="sidebar__body">
      <attendance-relations />
    </div>
  </aside>
</template>
<script>
import AttendanceRelations from './AttendanceRelations'
//import { mapGetters } from 'vuex'
//import { NAMESPACED_ATTENDANCE } from '../utils/alias'
//import db from '../db'
export default {
  name: 'TheSidebar',
  components: {
    AttendanceRelations
  },
  data () {
    return {
      //attendances: db.attendances.data
    }
  },
  computed: {
    /* ...mapGetters(NAMESPACED_ATTENDANCE, [
      'attendances'
    ]) */
  }
}
</script>
<style lang="sass" scoped>

.sidebar
  position: relative
  display: flex
  flex-direction: column
  background-color: map-get($theme-color, "default")
  padding-bottom: 50px
  min-height: 100%
  width: 321px
  border-right: 1px solid rgba(0,0,0,0.01)
.sidebar__header
  display: flex
  position: fixed
  width: 306px
  flex-direction: row
  justify-content: center
  align-items: center
  background-color: map-get($theme-color, "default")
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