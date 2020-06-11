<template>
  <div class="patient-list-filter-period">
     <code-calendar
      class="calendars__calendar"
      @datepicked="getBegin" 
      noBorderRight name="begin" 
      :end="end"
      placeholder="data início"
    />
    <span class="calendars__gap">até</span>
    <code-calendar
      class="calendars__calendar" 
      @datepicked="getEnd" 
      name="end" noBorderLeft 
      :begin="begin"
      placeholder="data fim"  
    />
  </div>
</template>

<script>
import CodeCalendar from '../components/base/CodeCalendar'
export default {
  name: 'PatientListFilterPeriod',
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
      this.$emit('begin', value)
    },
    getEnd (value) {
      this.end = this.formatterDate(value)
      this.$emit('end', value) 
    },
    formatterDate (date) {
      return date.split("/").reverse().join("").trim().replace(/\s/g, '-')
    },
  }
}
</script>

<style lang="sass" scoped>
.patient-list-filter-period
  display: flex
  @include respond-to(handhelds)
    position: relative
.calendars__gap
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