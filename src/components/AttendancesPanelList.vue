<template>
  <div class="attendances-panel-list">
    <attendances-panel-list-item
      class="attendances-panel-list__item"
      v-for="attendance of attendances"
      :key="attendance.registro"
      :name="attendance.nomeCliente"
      :status="attendance.situacaoExamesExperience"
      :date="attendance.dataAtd | dateFormat"
      :attendance-time="attendance.dataAtd | time"
    />
  </div>
</template>

<script>
import AttendancesPanelListItem from '../components/AttendancesPanelListItem'
import { mapGetters } from 'vuex'
import { NAMESPACED_ATTENDANCE } from '../utils/alias'
import { date, time } from '../mixins/formater'
export default {
  name: 'AttendancesPanelList',
  mixins: [date, time],
  components: {
    AttendancesPanelListItem
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'attendances'
    ])
  }
}
</script>

<style lang="sass" scoped>
.attendances-panel-list
  display: flex
  flex-flow: wrap
  justify-content: space-between
  width: 100%
  padding: 5px 10px
  align-items: center
  @include respond-to(handhelds)
    flex-flow: nowrap
    flex-direction: column
    justify-content: cente
.attendances-panel-list__item
  max-width: 49.5%
  margin-bottom: 4px
  @include respond-to(handhelds)
    max-width: 100%
</style>
