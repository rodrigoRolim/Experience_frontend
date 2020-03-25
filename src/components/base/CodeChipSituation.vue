<template>
  <div class="container-chip-situation">
    <span class="code-chip-situation" :class="getSituation">
      <span class="code-chip-el-situation" :class="getSituation">{{text}}</span>
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
@import '../../styles/_colors.sass'
.container-chip-situation
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
.code-chip-situation
  color: white
  font-size: 0.8rem
  padding: 4px 10px
  border-radius: 16px
  @include respond-to(handhelds)
    margin-right: 70px
.code-chip-el-situation
  padding: 3px 0
  border-radius: 10px
  font-weight: 600
.pendency
  background-color: $EP 
.finished
  background-color: $TF
.partial-finished
  background-color: $PF
.in-progress
  background-color: $EA
.unrealized
  background-color: $NR
</style>