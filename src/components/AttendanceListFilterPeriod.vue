<template>
  <div class="period">
    <div class="period__calendars">
      <code-calendar
        class="period__begin"
        v-model="beginEmitter" 
        noBorderRight name="begin" 
        :end="end"
        :error="errorBegin"
        placeholder="data início"
      />
      <span class="period__gap">até</span>
      <code-calendar
        class="period__end" 
        v-model="endEmitter" 
        name="end" noBorderLeft 
        :begin="begin"
        :error="errorEnd"
        placeholder="data fim"  
      />
    </div>
  </div>
</template>

<script>
import CodeCalendar from './base/CodeCalendar'
export default {
  name: 'AttendanceListFilterPeriod',
  props: {
    begin: {
      type: String
    },
    end: {
      type: String
    },
    errorBegin: String,
    errorEnd: String
  },
  components: {
    CodeCalendar
  },
  data () {
    return {
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
.period__calendars
  display: flex
  flex-direction: row
  margin-bottom: 10px
  @include respond-to(handhelds)
    position: relative
.period__gap
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