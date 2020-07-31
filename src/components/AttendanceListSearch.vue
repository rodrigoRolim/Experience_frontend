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
      @focus="focus"
      @blur="blur"
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
      modal: false
    }
  },
  methods: {
    focus (e) {
      this.$emit('focus', e)
    },
    blur (e) {
      this.$emit('blur', e)
    }
  }
}
</script>
<style lang="sass" scoped>
.searcher
  width: 100%
.searcher--modal .searcher__input
  @include respond-to(handhelds)
    width: 90%
</style>