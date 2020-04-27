<template>
  <div class="container-list-search">
    <code-input
      label="pesquisar paciente"
      placeholder="digite o nome do paciente"
      name="patient"
      type="text"
      required
      icon="search"
      color-icon="#368c8c"
      :width="10"
      :height="7"
    >
    </code-input>
  </div>
</template>
<script>
import CodeInput from './base/CodeInput'
/* import CodeLabel from './base/CodeLabel' */
export default {
  name: 'AttendanceListSearch',
  props: {
    attendances: Array
  },
  components: {
    CodeInput,
    /* CodeLabel */
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="sass" scoped>
.container-list-search
  margin-top: 20px
</style>