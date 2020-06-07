<template>
  <div class="searcher">
    <code-input
      class="searcher__input"
      label="pesquisar paciente"
      placeholder="digite o nome do paciente e aperte enter"
      name="patient"
      type="text"
      required
      icon="search"
      color-icon="#368c8c"
      :width="9"
      :height="10"
      @focus="hiddenHeader(false)"
      @blur="hiddenHeader(true)"
    />
  </div>
</template>
<script>
import CodeInput from './base/CodeInput'
/* import { bus } from '../main' */
export default {
  name: 'AttendanceListSearch',
  props: {
    attendances: Array
  },
  components: {
    CodeInput
  },
  data () {
    return {

    }
  },
  methods: {
    hiddenHeader (display) {
      this.$emit('hiddenHeader', display)
    }
  }
}
</script>
<style lang="sass" scoped>
.searcher
  width: 100%
</style>