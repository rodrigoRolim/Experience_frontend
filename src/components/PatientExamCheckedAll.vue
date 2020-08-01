<template>
  <div class="patient-exam-checked-all">
    <code-checkbox
      text="imprimir"
      none
      color="primary"
      size="sm"
    />
  </div>
</template>

<script>
import CodeCheckbox from './base/CodeCheckbox'
export default {
  name: 'PatientCheckedAll',
  components: {
    CodeCheckbox
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="sass" scoped>

</style>