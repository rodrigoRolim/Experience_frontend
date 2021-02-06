<template>
  <div :class="name | calendarName" ref="calendar" >
    <div class="calendar__input_selected-date" ref="selected_date" @click="showDateToggle">
      <code-input
        :placeholder="placeholder"
        :icon="icon"
        :name="name"
        autocomplete="off"
        v-model="inputEmitter"
        :noBorderRight="noBorderRight"
        :noBorderLeft="noBorderLeft"
        bolder
        @blur="mountDate"
        :error="error"
      /> 
    </div>
    <div class="calendar__dates" 
      :id="id" 
      :class="{ 'calendar__dates--show': showDate, 'calendar__dates--hidden': !showDate }" 
      ref="dates"
    >
      <div class="calendar__month">
        <div class="calendar__arrow calendar_prev-mth" @click="goToPrevMonth()">&lt;</div>
        <div class="calendar__selected-date" ref="month">
          <code-calendar-year class="calendar__selected-year" 
            @outputYear="setYear"
            :inputYear="year"
          />
         <div class="calendar__selected-month"> {{months[month]}}</div> 
        </div>
        <div class="calendar__arrow calendar__next-mth" @click="goToNextMonth()">&gt;</div>
      </div>
      <div class="calendar__week">
        <div 
          class="calendar__weekday"
          v-for="dayWeek in dayWeeks" :key="dayWeek"
        >
        {{dayWeek}}
        </div>
      </div>
      <div class="calendar__days">
        <div 
          class="calendar__day"
          :class="{ 'calendar__day--selected': selected == day,
                  'calendar__day--unselectable': unselectableDates(day) }"
          v-for="(day, i) in days" :key="i"
          @click="selectDay(day)"
        >
          {{day}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeInput from './CodeInput'
import CodeCalendarYear from './CodeCalendarYear'
export default {
  name: 'CodeCalendar',
  components: {
    CodeInput,
    CodeCalendarYear
  },
  props: {
    placeholder: String,
    name: String,
    icon: String,
    begin: {
      type: String
    },
    end: { 
      type: String
    },
    id: String,
    noBorderRight: Boolean,
    noBorderLeft: Boolean,
    value: String,
    error: {
      type: String
    }
  },
  data () {
    return {
      showDate: false,
      selected: -1,
      month: null,
      year: null,
      day: null,
      weekDay: null,
      selectedMonth: null,
      selectedDate: null,
      selectedDay: null,
      selectedYear: null,
      selectedWeekDay: null,
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 
               'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 
               'Novembro', 'Dezembro'],
      dayWeeks: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
      days: []
    }
  },
  filters: {
    calendarName (name) {
      return 'calendar ' + name
    }
  },
  created () {
    this.inputEmitter = this.value 
    window.addEventListener('click', (e) => {
      let path = e.path || (e.composedPath && e.composedPath());
      if (!this.checkEventPathForClass(path, this.name)) {
        this.showDate = false
      }
    })
  },
  mounted () {
    let date = new Date()
    this.day = date.getDate()
    this.month = date.getMonth()
  
    this.year = date.getFullYear().toString()
    this.weekDay = date.getDay()

    this.selectedYear = this.year
    this.selectedMonth = this.month
    this.selectedDay = this.day
    this.selectedWeekDay = this.weekDay

    this.populateDates(this.month, this.year)
    this.togglePositionCalendar()
  },
  computed: {
    inputEmitter: {
      set (value) {
        this.selectedDate = value
        this.$emit('input', this.selectedDate)
      },
      get () {
        return this.selectedDate
      }
    },
    
  },
  watch: {
    selectedDate (value) {
 
      if (this.showDate) this.showDate = false
      var input = value

      if (/\D\/$/.test(input)) { 

        input = input.substr(0, input.length - 3)
      
      }
      var values = input.split('/').map(function(v) {
        return v.replace(/\D/g, '')
      });
     
      
      if (values[0]) values[0] = this.checkValue(values[0], 31)
      if (values[1]) values[1] = this.checkValue(values[1], 12)
      
      this.getWrittenMonthByUser(+values[0], +values[1] - 1, +values[2])
      
      var output = values.map(function (v, i) {
        return v.length == 2 && i < 2 ? v + ' / ' : v
      })
      
      this.selectedDate = output.join('').substr(0, 14)
    }
  },
  methods: {
    isValidWrittenDate(writtenDay, writtenMonth, writtenYear) {

      return !!writtenDay   &&
             !!writtenMonth &&
             !!writtenYear  &&
             writtenDay.length > 1 &&
             writtenMonth.length > 1 &&
             writtenYear > 3

    },
    getWrittenMonthByUser(writtenDay, writtenMonth, writtenYear) {

     // if (this.isValidWrittenDate(writtenDay, writtenMonth, writtenYear)) {
        this.day = writtenDay
        this.month = writtenMonth
        this.year = writtenYear

        this.selectedDay = this.day
        this.selectedMonth = this.month
        this.selectedYear = this.year
       
        this.populateDates(this.month, this.year)
      //}
    },
    setYear(value) {
      this.year = value
      this.populateDates(this.month, this.year)
    },
    dateValue (value) {
      this.selectedDate = value
      return this.selectedDate
    },
    checkValue(str, max) {
      if (str.charAt(0) !== '0' || str == '00') {
        var num = parseInt(str);
        if (isNaN(num) || num <= 0 || num > max) num = 1;
        str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
      }
      return str;
    },
    unselectableDates (day) {

      if (day) {
   
        let date = new Date(this.year, this.month, day)
        var begin, end
        
        if (this.begin) {
          begin = this.begin.split(" - ")
          return new Date(begin[2], begin[1], begin[0]) >= date
        }
        
        if (this.end) {
          end = this.end.split(" - ")
          return new Date(end[2], end[1], end[0]) <= date
        } 

        return true
      }
      return true
    },
    selectDay (day) {
  
      if (!this.unselectableDates(day)) {
        this.inputEmitter = this.formatDate(new Date(this.year, this.month, day))
        this.selectedDay = day
        this.selectedMonth = this.month + 1
        this.selectedYear = this.year
        this.populateDates(this.month, this.year)
      }
      
    },
    togglePositionCalendar () {
      var targetNode = this.$refs.dates
      var observer = new MutationObserver(() => {

        if (targetNode.style.display != 'none') {

          let bottom = this.$refs.calendar.getBoundingClientRect().bottom
        
          if (window.innerHeight - bottom <= targetNode.clientHeight) {
            this.$refs.dates.style.bottom = '100%'
            this.$refs.dates.style.top = ''
          } else {
          
            this.$refs.dates.style.top = '100%'
            this.$refs.dates.style.bottom = ''
          }
        }
      })
      observer.observe(targetNode, { attributes: true, childList: true })
    },
    showDateToggle (e) {
      
      let path = e.path || (e.composedPath && e.composedPath());
      if (!this.checkEventPathForClass(path, 'calendar__dates')) {
     
        this.showDate = !this.showDate
        
      }
    },
    checkEventPathForClass (path, selector) {
      for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
          return true
        }
      }
      return false
    },
    goToNextMonth () {
      this.month++
      if (this.month > 11) {
        this.month = 0
        this.year++
      }
      //this.currentMonth = this.months[this.month] + ' ' + this.year
      this.populateDates()
    },
    goToPrevMonth () {
      this.month--
      if (this.month < 0) {
        this.month = 11
        this.year--
      }
     // this.currentMonth = this.months[this.month] + ' ' + this.year
      this.populateDates(this.month, this.year)
    },
    populateDates (month, year) {
      
      this.days = []
      let amount_days = this.daysInMonth(month, year)
      this.selected = -1
      let i = 0
      let j = 0
      let first_day = (new Date(year, month)).getDay()
      
      while (i < amount_days) {
        
        if (j == first_day) {
          this.days.push(i + 1)
          i++
        } else {
          j++
          this.days.push('')
        }

        if (this.selectedDay == (i + 1) && 
            this.selectedYear == year && 
            this.selectedMonth == month) {

          this.selected = this.selectedDay
        }
       
      }
    },
    leapYear (year) {
      let isLeap = ((year % 4 == 0 && year % 100 !== 0 ) || year % 400 === 0)
      return isLeap ? 29 : 28
    },
    daysInMonth(iMonth, iYear) {

      return 32 - new Date(iYear, iMonth, 32).getDate();
    },
    formatDate (d) {
      let day = d.getDate()
      if (day < 10) {
        day = '0' + day
      }
      let month = d.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let year = d.getFullYear()
      return day + ' / ' + month + ' / ' + year
    },
    mountDate (e) {
      e = e || window.event 
      let target = e.target || e.srcElement
      var input = target.value
      if (/\D\/$/.test(input)) { 

        input = input.substr(0, input.length - 3)
      
      }
      var values = input.split('/').map(function (v) {
        return v.replace(/\D/g, '')
      })

      var output = ''
      if (values.length == 3) {

        var year = values[2].length !== 4 ? parseInt(values[2]) + 2000 : parseInt(values[2])
        var month = parseInt(values[1]) - 1
        var day = parseInt(values[0])
        var d = new Date(year, month, day)
        if (!isNaN(d)) {
          var dates = [d.getDate(),d.getMonth() + 1, d.getFullYear()]
          output = dates.map(function (v) {
            v = v.toString()
            return v.lenght == 1 ? '0' + v : v
          }).join(' / ')

        }
      }

      e.target.value = output
      
    }
  }
}
</script>

<style lang="sass" scoped>
.calendar
  @include respond-to(handhelds)
    position: static
  position: relative
  width: 100%
  cursor: pointer
  user-select: none
.calendar .calendar__input_selected-date
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  color: #313131
.calendar__dates
  border: 1px solid lightgray
  position: absolute
  left: 0
  right: 0
  background-color: #FFF
  @include respond-to(handhelds)
    position: fixed
    width: 100%
  width: 320px
  z-index: 999
.calendar__dates--hidden
  display: none  
.calendar__dates--show
  display: block
  @include respond-to(handhelds)
    display: none
.calendar__day.calendar__day--unselectable
  color: rgba(0,0,0,0.3)
  cursor: not-allowed
  pointer-events: none
.calendar__month
  display: flex
  justify-content: space-between
  align-items: center
  border-bottom: 2px solid #EEE
.calendar__arrow
  width: 35px
  height: 35px
  display: flex
  justify-content: center
  align-items: center
  color: #313131
  font-size: 20px
.calendar__arrow:hover
  background-color: #F3F3F3
.calendar__arrow:active
  background-color: #00CA85
.calendar__days
  display: grid
  grid-template-columns: repeat(7, 1fr)
  height: 200px
.calendar__week
  display: grid
  grid-template-columns: repeat(7, 1fr)
  justify-items: center
  align-content: center
  height: 30px
.calendar__day
  display: flex
  justify-content: center
  align-items: center
  color: #313131
.calendar__day--selected
  background-color: #00CA85
.calendar__selected-date
  display: flex
  flex-direction: column
  align-items: center
  width: 118px
</style>