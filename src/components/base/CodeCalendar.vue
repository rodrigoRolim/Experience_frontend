<template>
<div class="container-code-datapicker disable-select" :id="connect">
  <div class="date-time">
    <div class="month">
      <i class="left" @click="updateCalendarMonth(0)"><font-awesome-icon icon="caret-left" size="2x"></font-awesome-icon></i>
      <h1>{{calendar.month.name}}</h1>
      <i class="right" @click="updateCalendarMonth(1)"><font-awesome-icon icon="caret-right" size="2x"></font-awesome-icon></i>
    </div>
    <div class="year">
      <select name="year" id="year" class="list-year" @change="updateCalendarYear(year)" v-model="year">
        <option :value="year" v-for="year of years" :key="year">{{year}}</option>
      </select>
    </div>
  </div>
  <table>
    <thead>
      <th v-for="(day, i) in calendar.days" v-bind:key="i">{{ day.shorthand }}</th>
    </thead>
    <tbody>
      <tr v-for="(dates, i) in calendar.dates" v-bind:key="i" >
        <td 
          v-for="(date, j) in dates" 
          v-bind:key="j"
          :class="{ 
           'smooth-date-w': weekend(j),
           'smooth-date-p': outMonth(i, j, calendar.edger) }"
          @click="selectDate"
          :date="dateValue(i, j, calendar.edger, date)"
        >
          {{ date | dateDigits }}
        </td>
      </tr>
    </tbody>
  </table>
</div>

</template>
<script>
import { calendar } from '../../mixins/calendar'
import { popups } from '../../mixins/popups'
export default {
  name: 'CodeDataPicker',
  inheritAttrs: false,
  mixins: [calendar, popups],
  props: {
    color: String,
    bcolor: String,
    connect: String,
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
    hasIcon: Boolean
  },
  data () {
    return {
      calendar: null,
      day: null,
      month: null,
      year: null,
      show: false,
      dateFormatted: null,
      date: '',
      position: null,
      lastClicked: null
    }
  },
  created () {
    this.calendar = this.currentCalendar()
    this.day = this.calendar.day
    this.month = this.calendar.month.id
    this.year = this.calendar.year
  },
  computed: {
    years (vm) {
      let years = []
      for (let i = vm.minYear; i <= vm.maxYear; i++) {
        years.push(i)
      }
      return years
    }
  },
  methods: {
    configPosition (e) {
      let rec = e.target.getBoundingClientRect()
      let h = e.target.clientHeight
      return { top: (rec.top+h+4)+'px' }
    },
    showDate (e) {
      this.position = this.configPosition(e)
      this.popup(true)
    },
    emitSelected (value) {

      this.$emit('datepicked', value)
    },
    weekend (index) {

      return (index%7 === 0) || (index%7 === 6)
    },
    dateValue (line, column, edger, date) {
      
      let month
      let year

      if (this.leftMonth(line, column, edger)) {
       
        if (this.month === 0 && this.year === this.minYear) {
          year = this.maxYear
          month = 11
        } else {
          year = this.year
          month = this.month - 1
        }

        return `${date}/${month}/${year}`
      }
      if (this.rightMonth(line, column, edger)) {

        if (this.month === 11 && this.year === this.maxYear) {
          year = this.minYear
          month = 0
        } else {
          year = this.year
          month = this.month + 1
        }

        return `${date}/${month}/${year}`
      }
      return `${date}/${this.month}/${this.year}`
    },
    leftMonth (line,column, edger) {

      return line*7 + column < edger[0]
    },
    rightMonth (line,column, edger) {

      return line*7 + column >= edger[1]
    },
    outMonth (line,column, edger) {

      return this.leftMonth(line,column, edger) || this.rightMonth(line, column, edger)
    },
    dateFormatter (day, month, year) {

      let resultDate = new Date(Date.UTC(year, month, day, 3, 1, 1)).toLocaleDateString()
      this.$emit('datepicked', resultDate)
      return resultDate
    },
    allowedKeys (el) {

      if ((el.keyCode > 57 || el.keyCode < 48) && el.keyCode !== 8 && el.keyCode !== 111) {
        el.preventDefault()
      }
    },
    splitDate (ev) {
      return ev.target.attributes.date.value.split('/')
    },
    signalPopup () {
      this.$emit('popup', false)
    },
    selectDate (ev) {
      //let classList = this.lastClicked.classList
      
      if (this.lastClicked != null) {

        this.lastClicked.target.classList.remove('clicked-td')
      }
      let dates = this.splitDate(ev)
      
      this.dateFormatted = this.dateFormatter(...dates)
      this.emitSelected(this.dateFormatted)
      //this.signalPopup(false)]
      ev.target.classList.add('clicked-td')
      //ev.target.style.backgroundColor = '#368c8c9f'
      this.lastClicked = ev
    },
    updateLimitMonth (command) {

      if (command === 0 && --this.month === -1) {
        this.month = 11
        this.year--
      }
      if (command === 1 && ++this.month === 12) {

        this.month = 0
        this.year++
      }
    },
    updateLimitYear (command) {

      if (command === 0 && this.year < this.minYear) {

        this.year = this.maxYear
      }
      if (command === 1 && this.year > this.maxYear) {

        this.year = this.minYear
      }
    },
    updateCalendarMonth (command) {
      this.lastClicked.target.style.backgroundColor = 'white'
      this.updateLimitMonth(command)
      this.updateLimitYear(command)
      this.calendar = this.buildCalendar(this.year, this.month, new Date().getDay())
    },
    updateCalendarYear (year) {
      this.year = year
      this.calendar = this.buildCalendar(this.year, this.month, new Date().getDay())
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
.clicked-td
  background-color: #368c8c9f
  color: white
</style>