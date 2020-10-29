<template>
  <div class="chip-status-exams">
    <span class="chip-status-exams__content" :class="'chip-status-exams--'+getStatus">
      <span class="chip-status-exams__element" :class="getStatus">{{text}}</span>
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
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="sass" scoped>

.chip-status-exams
  display: flex
  flex-direction: column
  justify-content: center
  @include respond-to(handhelds)
    flex-direction: row
    justify-content: flex-end
  @include respond-to(medium-screens)
    flex-direction: row
    justify-content: flex-end
  @include respond-to(wide-screens)
    text-align: center
.chip-status-exams__content
  color: white
  font-size: 0.8rem
  padding: 4px 10px
  border-radius: 16px
.chip-status-exams__element
  padding: 3px 0
  border-radius: 10px
  font-weight: 600
.chip-status-exams--pendency
  background-color: $EP 
.chip-status-exams--finished
  background-color: $TF
.chip-status-exams--partial-finished
  background-color: $PF
.chip-status-exams--in-progress
  background-color: $EA
.chip-status-exams--no-realized
  background-color: $NR
</style>