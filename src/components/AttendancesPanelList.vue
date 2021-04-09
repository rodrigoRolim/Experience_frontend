<template>
  <div class="attendances-panel-list">
    <div v-for="attendance of currentAttendances" :key="attendance.registro">
      <attendances-panel-list-item
        class="attendances-panel-list__item"
        :attendance="attendance.atendimento"
        :healthCenter="attendance.posto"
        :name="attendance.nomeCliente"
        :status="attendance.situacaoAtendimento"
        :date="attendance.dataAtd"
        :attendance-time="attendance.dataAtd | timer"
        :total="attendance.qtTotal"
        :dones="attendance.qtFinalizados"
        :collectTime="attendance.ultimaColeta | clockTime"
        />
    </div> 
  </div>
</template>

<script>
import AttendancesPanelListItem from './AttendancesPanelListItem'
import { mapGetters } from 'vuex'
import { NAMESPACED_ATTENDANCES_PANEL } from '../utils/alias'
import { date, timer, clockTime } from '../mixins/formater'
export default {
  name: 'AttendancesPanelList',
  mixins: [date, timer, clockTime],
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
  @include respond-to(handhelds)
    max-width: 100%
</style>
