export const calendar = {

  filters: {
    dateDigits (date) {
      return  (date < 10) ? '0' + date : date
    }
  },
  methods: {
    calendarSwitch (show) {
      
      this.show = show
      window.document.documentElement.style.overflow = (show) ? 'hidden' : 'auto'
    },
    dateValue (i, j, edger, month, date, year) {
      if (i*7 + j < edger[0]) {
        if (month === 0) {
          month = 11
          year-- 
        } else {
          month--
        }
        return {date, month, year}
      }
      if (i*7 + j >= edger[1]) {
        if (month === 11) {
          month = 0
          year++
        } else {
          month++
        }
      }
    },
    currentCalendar () {
      let today = new Date()
      return this.buildCalendar(today.getFullYear(), today.getMonth(), today.getDate())
    },
    zeller (date, year, month) {
      let m = month
      let K = year % 100
      let d = date
      let J = Math.floor(year/100)
      let h = (d + Math.floor(13*(m + 1)/5) + K + Math.floor(K/4) + Math.floor(J/4) + 5*J)
      return ((h + 5) % 7) + 1
    },
    leapYear (year) {
      let isLeap = ((year % 4 == 0 && year % 100 !== 0 ) || year % 400 === 0)
      return isLeap ? 29 : 28
    },
    months (year) {
      let ly = this.leapYear(year)
      let months = [
        { id: 0, name: 'janeiro', shorthand: 'jan', nDays: 31, prev: 31 },
        { id: 1, name: 'fevereiro', shorthand: 'fev', nDays: ly, prev: 31 },
        { id: 2, name: 'março', shorthand: 'mar', nDays: 31, prev: ly },
        { id: 3, name: 'abril', shorthand: 'abr', nDays: 30, prev: 31 },
        { id: 4, name: 'maio', shorthand: 'mai', nDays: 30, prev: 30 },
        { id: 5, name: 'junho', shorthand: 'jun', nDays: 30, prev: 30 },
        { id: 6, name: 'julho', shorthand: 'jul', nDays: 31, prev: 30 },
        { id: 7, name: 'agosto', shorthand: 'ago', nDays: 31, prev: 31 },
        { id: 8, name: 'setembro', shorthand: 'set', nDays: 30, prev: 31 },
        { id: 9, name: 'outubro', shorthand: 'out', nDays: 30, prev: 30 },
        { id: 10, name: 'novembro', shorthand: 'nov', nDays: 30, prev: 30 },
        { id: 11, name: 'dezembro', shorthand: 'dez', nDays: 31, prev: 30 } 
      ]
  
      return months
    },
    days () {
  
      let weekDays = [
        { name: 'domingo', shorthand: 'dom', value: 7 },
        { name: 'segunda', shorthand: 'seg', value: 1 },
        { name: 'terça', shorthand: 'ter', value: 2 },
        { name: 'quarta', shorthand: 'qua', value: 3 },
        { name: 'quinta', shorthand: 'qui', value: 4 },
        { name: 'sexta', shorthand: 'sex', value: 5 },
        { name: 'sabado', shorthand: 'sab', value: 6 }
      ]
      return weekDays
    },
    ifJanORFeb (year, month) {
      if (month < 3) {
        year = year - 1
      }
      if (month === 1) {
        month = 13
      }
      if (month === 2) {
        month = 14
      }
      return [year, month] 
    },
    buildDayArray (year, month, day) {
      
      let d = day

      let m = this.months(year)[month - 1]
      let dates = []
      let p = m.prev
      let j = 1
      let l = 1
      let k = d - 1
  
      for (let i = d; i < m.nDays + d; i++) {
  
        dates[i] = j
        j++  
      }
  
      for (let i = 0; (d%7 == 0 && i < d) || i < d; i++) {
        dates[k--] = p
        p--
      }
  
      for (let i = dates.length; (dates.length)/7 < 6 || (dates.length - 1)%7 !== 6; i++) {
        dates[i] = l
        l++
      }
      
      return dates
    },
    buildDayMatrix (dates) {
      let datesMatrix = []
      let k = -1
      for (let i = 0; i < dates.length; i++) {

        if (i % 7 === 0) {
          k++
          datesMatrix[k] = []
        }
        datesMatrix[k].push(dates[i])
      }
      return datesMatrix
    },
    betweenOnes (dates) {

      return dates.map((date, i) => {
        if (date === 1) {
          return i
        }
      }).filter(i => i !== undefined)
    },
    buildCalendar (_year, _month, _date) {
      _month += 1
      let firstDay = this.zeller(1, ...this.ifJanORFeb(_year, _month))
      let currentDay = this.zeller(_date, ...this.ifJanORFeb(_year, _month))
      let arrayDates = this.buildDayArray(_year, _month, firstDay)
      let ones = this.betweenOnes(arrayDates)
      let dates = this.buildDayMatrix(arrayDates)
      let month = this.months(_year)[_month - 1]
      let days = this.days()
      let day = days[currentDay]

      let calendar = {
        month: month,
        year: _year,
        day: day,
        days: days, 
        date: _date,
        dates: dates,
        edger: ones
      }

      return calendar
    }
  }
 
}
