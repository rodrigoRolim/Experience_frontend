<template>
  <div class="chip-status-attendance">
    <span class="chip-status-attendance__content" :class="'chip-status-attendance--'+getStatus">
      <span class="chip-status-attendance__element" :class="getStatus">{{text}}</span>
    </span>
  </div>
</template>

<script>
import { attendanceStatus } from '../../mixins/attendanceStatus'
export default {
  name: 'CodeChipSituation',
  mixins: [attendanceStatus],
  props: {
    status: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    text (vm) {
      switch (vm.status) {
        case 'PF':
          return 'Parcialmente Finalizado'
        case 'TF':
          return 'Finalizado'
        case 'EA':
          return 'Em Andamento'
        case 'NR':
          return 'Não Realizado'
        case 'EP':
          return 'Há Pendencias'
        case 'SE':
          return 'Sem Exames'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="sass" scoped>

.chip-status-attendance
  display: flex
  flex-direction: column
  @include respond-to(handhelds)
    flex-direction: row
  @include respond-to(medium-screens)
    flex-direction: row
  @include respond-to(wide-screens)
    text-align: center
.chip-status-attendance__content
  color: white
  font-size: 0.8rem
  padding: 4px 10px
  border-radius: 16px
.chip-status-attendance__element
  padding: 3px 0
  border-radius: 10px
  font-weight: 600
.chip-status-attendance--pendency
  background-color: $EP 
.chip-status-attendance--finished
  background-color: $TF
.chip-status-attendance--partial-finished
  background-color: $PF
.chip-status-attendance--in-progress
  background-color: $EA
.chip-status-attendance--no-realized
  background-color: $NR
.chip-status-attendance--no-exams
  background-color: $SE
</style>