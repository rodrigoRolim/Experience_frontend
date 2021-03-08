<template>
  <div class="period__calendars">
    <code-calendar
      class="period__begin"
      label="data inicial"
      :label-color="labelColor"
      v-model="beginEmitter" 
      noBorderRight name="begin" 
      :end="end"
      :error="errorBegin"
      placeholder="data início"
    />
    <span class="period__gap">até</span>
    <code-calendar
      class="period__end"
      label="data final"
      :label-color="labelColor"
      v-model="endEmitter" 
      name="end" noBorderLeft 
      :begin="begin"
      :error="errorEnd"
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
      type: String
    },
    end: {
      type: String
    },
    labelColor: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['default', 'primary', 'text', 'secondary', 'danger'].indexOf(value) !== -1
      }
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
  align-items: flex-end
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
  height: 38px
  align-self: flex-end
</style>