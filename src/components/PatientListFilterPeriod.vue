<template>
  <div class="patient-period">
     <code-calendar
      class="patient-period__calendar"
      v-model="beginEmitter" 
      noBorderRight name="begin" 
      :end="end"
      placeholder="data início"
      :error="errorBegin"
    />
    <span class="patient-period__gap">até</span>
    <code-calendar
      class="patient-period__calendar"
      v-model="endEmitter"  
      name="end" noBorderLeft 
      :begin="begin"
      :error="errorEnd"
      placeholder="data fim"  
    />
  </div>
</template>

<script>
import CodeCalendar from '../components/base/CodeCalendar'
export default {
  name: 'PatientListFilterPeriod',
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
.patient-period
  display: flex
  margin-bottom: 10px
  @include respond-to(handhelds)
    position: relative
.patient-period__gap
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