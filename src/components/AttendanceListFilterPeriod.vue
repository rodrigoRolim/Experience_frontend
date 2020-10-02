<template>
  <div class="calendars">
    <code-calendar
      class="calendars__calendar"
      v-model="beginEmitter" 
      noBorderRight name="begin" 
      :end="end"
      placeholder="data início"
    />
    <span class="calendars__gap">até</span>
    <code-calendar
      class="calendars__calendar" 
      v-model="endEmitter" 
      name="end" noBorderLeft 
      :begin="begin"
      placeholder="data fim"  
    />
  </div>
</template>

<script>
import CodeCalendar from './base/CodeCalendar'
export default {
  name: 'AttendanceListFilterPeriod',
  props: {
    begin: {
      type: String,
      default: () => {
        let d = new Date()
        d.setDate(d.getDate() - 7)
        let day = d.getDate()
        if (day < 10) {
          day = '0' + day
        }
        let month = d.getMonth() + 1
        if (month < 10) {
          month = '0' + month
        }
        let year = d.getFullYear()
        return day + '/' + month + '/' + year
      }
    },
    end: {
      type: String,
      default: () => {
        let d = new Date()
        let day = d.getDate()
        if (day < 10) {
          day = '0' + day
        }
        let month = d.getMonth() + 1
        if (month < 10) {
          month = '0' + month
        }
        let year = d.getFullYear()
        return day + '/' + month + '/' + year
      }
    }
  },
  components: {
    CodeCalendar
  },
  data () {
    return {
      BEGIN_INITIAL: "31-07-20",
      END_INITIAL: "31-07-20"
    }
  },
  mounted () {

  },
  computed: {
    beginEmitter: {
      set (value) {
        let begin = this.formatterDateInput(value)
        this.$emit('begin', begin)
      },
      get () {
        console.log(this.begin)
        return this.formatterDateOutput(this.begin)
      }
    },
    endEmitter: {
      set (value) {
        let end = this.formatterDateInput(value)
        this.$emit('end', end)
      },
      get () {
        return this.formatterDateOutput(this.end)
      }
    }
  },
  methods: {
    formatterDateInput (date) {
      return date.split("/").join("-").trim()
    },
    formatterDateOutput (date) {
      return date.split("-").join("/").trim()
    }
  }
}
</script>

<style lang="sass" scoped>
.calendars
  display: flex
  flex-direction: row
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