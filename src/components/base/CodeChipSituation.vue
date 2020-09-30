<template>
  <div class="chip-situation">
    <span class="chip-situation__content" :class="'chip-situation--'+getSituation">
      <span class="chip-situation__element" :class="getSituation">{{text}}</span>
    </span>
  </div>
</template>

<script>
import { situation } from '../../mixins/situation'
export default {
  name: 'CodeChipSituation',
  mixins: [situation],
  props: {
    situation: {
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
      switch (vm.situation) {
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
      }
      return ''
    }
  }
}
</script>

<style lang="sass" scoped>

.chip-situation
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
.chip-situation__content
  color: white
  font-size: 0.8rem
  padding: 4px 10px
  border-radius: 16px
.chip-situation__element
  padding: 3px 0
  border-radius: 10px
  font-weight: 600
.chip-situation--pendency
  background-color: $EP 
.chip-situation--finished
  background-color: $TF
.chip-situation--partial-finished
  background-color: $PF
.chip-situation--in-progress
  background-color: $EA
.chip-situation--unrealized
  background-color: $NR
</style>