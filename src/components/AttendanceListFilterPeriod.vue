<template>
  <div class="calendars">
    <code-calendar @datepicked="getBegin" noBorderRight name="begin" :end="end"/>
    <span class="gap">até</span>
    <code-calendar @datepicked="getEnd" name="end" noBorderLeft :begin="begin"/>
  </div>
</template>

<script>
import CodeCalendar from './base/CodeCalendar'
export default {
  name: 'AttendanceListFilterPeriod',
  components: {
    CodeCalendar
  },
  data () {
    return {
      begin: '',
      end: ''
    }
  },
  methods: {
    getBegin (value) {
      this.begin = this.formatterDate(value)
    },
    getEnd (value) {
      this.end = this.formatterDate(value)
    },
    formatterDate (date) {
      return date.split("/").reverse().join("").trim().replace(/\s/g, '-')
    },
  }
}
</script>

<style lang="sass" scoped>
.calendars
  display: flex
  flex-direction: row
.gap
  background-color: white
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background-color: rgba(0,0,0,0.3)
  color: white
  font-size: 14px
  padding: 0 3px
</style>