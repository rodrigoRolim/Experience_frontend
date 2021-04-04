<template>
  <div class="attendances-panel-list">
    <attendances-panel-list-item
      class="attendances-panel-list__item"
      v-for="attendance of currentAttendances"
      :key="attendance.registro"
      :attendance="attendance.atendimento"
      :healthCenter="attendance.posto"
      :name="attendance.nomeCliente"
      :status="attendance.situacaoExamesExperience"
      :date="attendance.dataAtd"
      :attendance-time="attendance.dataAtd | time"
    />
  </div>
</template>

<script>
import AttendancesPanelListItem from '../components/AttendancesPanelListItem'
import { mapGetters } from 'vuex'
import { NAMESPACED_ATTENDANCES_PANEL } from '../utils/alias'
import { date, time } from '../mixins/formater'
export default {
  name: 'AttendancesPanelList',
  mixins: [date, time],
  components: {
    AttendancesPanelListItem
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCES_PANEL, [
      'currentAttendances'
    ])
  }
}
</script>

<style lang="sass" scoped>
.attendances-panel-list
  display: grid
  grid-template-columns: repeat(auto-fill, 320px)
  grid-auto-flow: dense
  justify-content: center
  column-gap: 10px
  grid-row-gap: 10px
  width: 100%
  padding: 5px 10px
  align-items: center
  @include respond-to(handhelds)
    flex-flow: nowrap
    flex-direction: column
    justify-content: cente
.attendances-panel-list__item
  margin-bottom: 4px
  @include respond-to(handhelds)
    max-width: 100%
</style>
