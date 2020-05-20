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
      :width="10"
      :height="7"
    />
  </div>
</template>
<script>
import CodeInput from './base/CodeInput'
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
  }
}
</script>
<style lang="sass" scoped>

</style>