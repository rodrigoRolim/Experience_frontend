<template>
<div class="datepicker">
  <div class="container-input-date">
    <code-input
      placeholder="inicio"
      :hasIcon="hasIcon"
      :name="name"
      type="text"
      required
      v-model="date"
      class="begin-input"
      @keydown="allowedKeys"
      readonly
      :padding="padding"
      :paddingIcon="paddingIcon"
      v-click-outside="popup"
    >
      <template v-slot:icon>
        <font-awesome-icon icon="calendar-alt" :style="{ color: '#676a6c' }"></font-awesome-icon>
      </template>
    </code-input>
  </div>
  <code-calendar 
    @datepicked="picked" 
    v-show="show" 
    :style="position" 
    :connect="'popup-calendar'"
  ></code-calendar>
</div>
</template>
<script>
import { popups } from '../../mixins/popups'
import CodeInput from './CodeInput'
import CodeCalendar from './CodeCalendar'

export default {
  name: 'CodeDataPicker',
  inheritAttrs: false,
  mixins: [popups],
  props: {
    maxYear: {
      type: Number,
      default: new Date().getFullYear() + 100,
    },
    minYear: {
      type: Number,
      default: new Date().getFullYear() - 100
    },
    padding: {
      type: String
    },
    paddingIcon: {
      type: String
    },
    hasIcon: Boolean,
    name: String
  },
  components: {
    CodeInput,
    CodeCalendar
  },
  data () {
    return {
      calendar: null,
      day: null,
      month: null,
      year: null,
      dateFormatted: null,
      date: '',
      position: null
    }
  },
  created () {
    /* this.calendar = this.currentCalendar()
    this.day = this.calendar.day
    this.month = this.calendar.month.id
    this.year = this.calendar.year */
  },
  computed: {
    /* years (vm) {
      let years = []
      for (let i = vm.minYear; i <= vm.maxYear; i++) {
        years.push(i)
      }
      return years
    } */
  },
  directives: {
    clickOutside: {
      bind (el, binding, vnode) {
    
        el.clickOutsideEvent = function (event) {

          console.log(!(el === event.target || el.contains(event.target)))
          if (!(el === event.target || el.contains(event.target))) {
            let rec = el.getBoundingClientRect()
            let h = el.clientHeight
            vnode.context.position = { top: (rec.top+h)+'px' }
            //vnode.context[binding.expression](true)
          } else {
            //vnode.context[binding.expression](false)
          }
        }
          document.body.addEventListener('click', el.clickOutsideEvent)
      },
    
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },
  methods: {
    picked (value) {
      this.date = value
    },
    showDate (e) {
      let rec = e.target.getBoundingClientRect()
      let h = e.target.clientHeight
      this.position = { top: (rec.top+h+4)+'px' }
      this.popup(true)
    },
    allowedKeys (el) {

      if ((el.keyCode > 57 || el.keyCode < 48) && el.keyCode !== 8 && el.keyCode !== 111) {
        el.preventDefault()
      }
    },
    showp () {
      this.showInside = true 
    },
    hide () { 
      console.log('hide')
      this.showInside = false
    }
  },
  events: {
    closeEvent () {
      console.log('close event called')
      this.hide()
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../styles/_scrollbar.sass"
@include scrollbar('#year', 2px)
.datepicker
  display: flex
  flex-direction: column
  justify-content: center
.container-input-date
  display: flex
  flex-direction: row
  width: 100%
.container-code-datapicker
  position: fixed
  z-index: 1000
  display: flex
  flex-direction: column
  aling-items: center
  background-color: #368c8c
  border: 1px solid rgba(0, 0, 0, 0)
.date-time
  background-color: rgba(0, 0, 0, 0)
  color: white
  width: 100%
  margin-bottom: 10px
.month
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  width: 100% 
.list-year
  text-align: center
  margin: 4px 0
  cursor: pointer
  background-color: #368c8c
  color: white
  font-weight: 700
  font-size: 1.1rem
  border: none
  outline: none
  padding: 0 10px
h1
  width: 70%
  text-align: center
  margin: 5px 0px
table
  border-collapse: collapse
  background-color: white
  table-layout: fixed
  width: 300px
  height: 280px
  padding-top: 10px
th
  font-size: 1.0rem
  color: rgba(0, 0, 0, 0.6)
th
  text-align: center
  padding-top: 10px
td
  text-align: center
  color: rgba(0, 0, 0, 0.8)
  cursor: pointer
  border-radius: 100%
td:hover
  font-weight: 600
  background-color: #368c8c2f
td:active
  background-color: #368c8c9f
tr
  font-size: 0.9rem
i
  cursor: pointer
.smooth-date-w
  color: gray
.smooth-date-p
  color: lightgray
.disable-select
  user-select: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -moz-user-select: none
.year
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
.decr-year
  margin-left: 5px 

</style>