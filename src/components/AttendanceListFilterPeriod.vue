<template>
  <div class="period">
    <code-date-picker
      :width="9"
      :height="7"
      :hasIcon="false"
      name="begin"
      :normalModal="false"
      @choosed="pickBegin"
      
    ></code-date-picker>
    ate
    <code-date-picker
      :width="9"
      :height="7"
      :hasIcon="false"
      name="end"
      :begin="begin"
      :normalModal="false"
      @choosed="pickEnd"
    ></code-date-picker>
  </div>
</template>

<script>
import CodeDatePicker from './base/CodeDataPicker'
export default {
  name: 'AttendanceListFilterPeriod',
  components: {
    CodeDatePicker
  },
  data () {
    return {
      begin: '',
      end: ''
    }
  },
  methods: {
    pickBegin (value) {

      this.begin = value
    },
    pickEnd (value) {
      
      this.end = value
    }
  }
}
</script>

<style lang="sass" scoped>

</style>