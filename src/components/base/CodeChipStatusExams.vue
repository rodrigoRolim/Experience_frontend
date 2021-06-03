<template>
  <div class="chip-status-exams">
    <span class="chip-status-exams__content" :class="'chip-status-exams--'+getStatus">
      <span class="chip-status-exams__element" :class="getStatus">{{text}}</span>
    </span>
  </div>
</template>

<script>
import { examStatus } from '../../mixins/examStatus'
export default {
  name: 'CodeChipSituation',
  mixins: [examStatus],
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
        case 'PENDENCIA':
          return 'Existem pendencias'
        case 'FINALIZADO':
          return 'Finalizado'
        case 'AGUARDANDO':
          return 'Aguardando Resultado'
        case 'ANDAMENTO':
          return 'Em Andamento'
        case 'NAO':
          return 'Não Realizado'
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
.chip-status-exams--pendencies
  background-color: $PENDENCIES 
.chip-status-exams--finished
  background-color: $FINALIZED
.chip-status-exams--in-progress
  background-color: $IN-PROGRESS
.chip-status-exams--no-realized-yet
  background-color: $NO-REALIZED-YET
</style>