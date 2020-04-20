<template>
  <div class="calendars">
    <code-calendar noBorderRight name="begin"/>
    <span class="gap">até</span>
    <code-calendar name="end" noBorderLeft/>
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
.calendars
  display: flex
  flex-direction: row
.gap
  background-color: white
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 38px
</style>