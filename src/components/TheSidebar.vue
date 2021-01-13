<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <strong>Relação de Atendimentos</strong>
    </div>
    <div class="sidebar__body">
      <code-message
        v-if="message"
        class="sidebar__message"
        :message="message.message || ''"
        type-message="whiteness"
        position="flex-start"
        icon="info-circle"
      />
      <attendance-relations v-else/>
    </div>
  </aside>
</template>
<script>
import AttendanceRelations from './AttendanceRelations'
import CodeMessage from './base/CodeMessage'
import { NAMESPACED_ATTENDANCE } from '../utils/alias'
import { mapGetters } from 'vuex'
export default {
  name: 'TheSidebar',
  components: {
    AttendanceRelations,
    CodeMessage
  },
  data () {
    return {
      //attendances: db.attendances.data
    }
  },
  created () {
    console.log(this.message)
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'attendances',
      'message'
    ])
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
  top: 60px
  width: 321px
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
  margin-top: 160px
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
.sidebar__message
  margin: 20% 0
  padding: 5% 0
  width: 300px
  align-self: center
  border-radius: 5px
  font-size: 14px  
</style>