<template>
  <div :class="'calendar ' + name" ref="calendar" >
    <!-- <div class="calendar__selected-date" ref="selected_date" @click="showDateToggle">
      {{selectedDate}}
    </div> -->
    <div class="calendar__selected-date" ref="selected_date" @click="showDateToggle">
      <code-input
        label="number"
        :placeholder="placeholder"
        :icon="icon"
        name="number"
        type="text"
        :width="8"
        :height="7"
        v-model="selectedDate"
        :noBorderRight="noBorderRight"
        :noBorderLeft="noBorderLeft"
        v-date
      > 
      </code-input>
    </div>
    <div class="calendar__dates" :id="id" :class="{ 'calendar__dates--show': showDate, 'calendar__dates--hidden': !showDate }" ref="dates">
      <div class="calendar__dates__month">
        <div class="calendar__dates__month__arrows prev-mth" @click="goToPrevMonth()">&lt;</div>
        <div class="calendar__dates__month__picked" ref="month">{{currentMonth}}</div>
        <div class="calendar__dates__month__arrows next-mth" @click="goToNextMonth()">&gt;</div>
      </div>
      <div class="calendar__dates__week">
        <div 
        class="calendar__dates__week__day"
        v-for="dayWeek in dayWeeks" :key="dayWeek"
        >
        {{dayWeek}}
        </div>
      </div>
      <div class="calendar__dates__days">
        <div 
        class="calendar__dates__days__day"
        :class="{ 'calendar__dates__days__day--selected': selected == day,
                  'calendar__dates__days__day--unselectable': unselectableDates(day) }"
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
export default {
  name: 'CodeCalendar',
  components: {
    CodeInput
  },
  props: {
    placeholder: String,
    name: String,
    icon: String,
    begin: {
      type: String,
      default: '00-00-0000'
    },
    end: { 
      type: String, 
      default: '00-00-0000'  
    },
    id: String,
    noBorderRight: Boolean,
    noBorderLeft: Boolean
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
      currentMonth: null,
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 
               'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 
               'Novembro', 'Dezembro'],
      dayWeeks: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
      days: []
    }
  },
  created () {
    window.addEventListener('click', (e) => {
      if (!this.checkEventPathForClass(e.path, this.name)) {
        this.showDate = false
      }
    })
  },
  mounted () {
    let date = new Date()
    this.day = date.getDate()
    this.month = date.getMonth()
    this.year = date.getFullYear()
    this.weekDay = date.getDay()
    this.currentMonth = this.months[this.month] + ' ' + this.year
    this.selectedYear = this.year
    this.selectedMonth = this.month
    this.selectedDay = this.day
    this.selectedWeekDay = this.weekDay
    //this.selectedDate = this.formatDate(date)
    this.populateDates()
    this.togglePositionCalendar()
  },
  directives: {
    date: {
      inserted: (el, _, vnode) => {
        console.log(el)
        el.addEventListener('input', function (e) {
          var input = e.target.value
          if (/\D\/$/.test(input)) { 

            input = input.substr(0, input.lenght - 3)
          }
          var values = input.split('/').map(function(v) {
            return v.replace(/\D/g, '')
          });
          if (values[0]) values[0] = vnode.context.checkValue(values[0], 31)
          if (values[1]) values[1] = vnode.context.checkValue(values[1], 12)
          var output = values.map(function (v, i) {
            return v.length == 2 && i < 2 ? v + ' / ' : v
          })
          e.target.value = output.join('').substr(0, 14)
        })
        el.addEventListener('blur', function (e) {
          console.log('blur')
          var input = e.target.value
          var values = input.split('/').map(function (v) {
            return v.replace(/\D/g, '')
          })
          var output = ''
          console.log(values)
          if (values.length == 3) {
            console.log(values[2].length)
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
        })
      }
    }
  },
  methods: {
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

        let date = new Date(this.year + '-' + '0' + (this.month + 1) + '-' + day)
        let begin = new Date(this.begin).getTime()
        let end = new Date(this.end).getTime()
      
        return begin > date.getTime() || end < date.getTime()
      }
      
    },
    selectDay (day) {
      if (!this.unselectableDates(day)) {
        this.selectedDate = this.formatDate(new Date(this.year + '-' + (this.month + 1) + '-' + day))
       
        this.selectedDay = day
        this.selectedMonth = this.month
        this.selectedYear = this.year
        this.populateDates()
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
      
      
      if (!this.checkEventPathForClass(e.path, 'calendar__dates')) {
     
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
      this.currentMonth = this.months[this.month] + ' ' + this.year
      this.populateDates()
    },
    goToPrevMonth () {
      this.month--
      if (this.month < 0) {
        this.month = 11
        this.year--
      }
      this.currentMonth = this.months[this.month] + ' ' + this.year
      this.populateDates()
    },
    populateDates () {
      
      this.days = []
      let amount_days = this.daysInMonth(this.month, this.year)
      this.selected = -1
      let i = 0
      let j = 0
      let first_day = (new Date(this.year, this.month)).getDay()
      
      while (i < amount_days) {
        
        if (j == first_day) {
          this.days.push(i + 1)
          i++
        } else {
          j++
          this.days.push('')
        }
        if (this.selectedDay == (i + 1) && 
            this.selectedYear == this.year && 
            this.selectedMonth == this.month) {

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
      this.$emit('datepicked', day + ' / ' + month + ' / ' + year)
      return day + ' / ' + month + ' / ' + year
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
.calendar .calendar__selected-date
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  color: #313131
.calendar__dates
  position: absolute
  left: 0
  right: 0
  background-color: #FFF
  @include respond-to(handhelds)
    width: 100%
  width: 320px
  z-index: 999
.calendar__dates--hidden
  display: none  
.calendar__dates--show
  display: block
.calendar__dates__days__day.calendar__dates__days__day--unselectable
  color: rgba(0,0,0,0.3)
  cursor: not-allowed
.calendar__dates__month
  display: flex
  justify-content: space-between
  align-items: center
  border-bottom: 2px solid #EEE
.calendar__dates__month__arrows
  width: 35px
  height: 35px
  display: flex
  justify-content: center
  align-items: center
  color: #313131
  font-size: 20px
.calendar__dates__month__arrows:hover
  background-color: #F3F3F3
.calendar__dates__month__arrows:active
  background-color: #00CA85
.calendar__dates__days
  display: grid
  grid-template-columns: repeat(7, 1fr)
  height: 200px
.calendar__dates__week
  display: grid
  grid-template-columns: repeat(7, 1fr)
  justify-items: center
  align-content: center
  height: 30px
.calendar__dates__days__day
  display: flex
  justify-content: center
  align-items: center
  color: #313131
.calendar__dates__days__day--selected
  background-color: #00CA85
</style>