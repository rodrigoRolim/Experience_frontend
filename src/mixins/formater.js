export const age = {
  filters: {
    ageByBirthday (dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      const ageDate = age.toString()
      return !isNaN(ageDate) ? ageDate + " anos" : "";
    }
  }
}

export const sex = {
  filters: {
    sexByInitial (value) {

      return [{initial: 'M', value: 'masculino'}, {initial: 'F', value: 'feminino'}]
        .find((sex) => sex.initial === value).value
    }
  }
}

export const uppercase = {
  filters: {
    toUpperCase(value) {
      return value.toUpperCase()
    }
  }
}

export const date = {
  filters: {
    dateFormat (dateString) {
      if (dateString) {
        const date = new Date(dateString).toLocaleDateString("pt-BR")
        return date !== "Invalid Date" ? date : ""
      } 
      return "" 
    }
  }
}

export const attendance = {
  filters: {
    id (healthCenter, attendance) {
     /* eslint-disable no-debugger */
  
      let hc = healthCenter.toString()
      let att = attendance.toString()
      const numberLeftZeroHc = 3 - hc.length
     
      for (let i = 0 ; i < numberLeftZeroHc; i++) {
        hc = "0" + hc
      }
      const numberLeftZeroAtt = 6 - att.length
      for(let i = 0; i < numberLeftZeroAtt; i++) {
        att = "0" + att
      }
      return hc + '/' + att
    }
  }
}

export const phone = {
  filters: {
    phoneTrim (value) {
      return value.replace(/\s/g, '')
    }
  }
}

export const correlative = {
  filters: {
    correl(value) {
      if (value < 10) {
        return '0' + value
      }
      return value
    }
  }
}

export const timer = {
  filters: {
    timer(date) {
      const dt = dateObject(date)
      const dateInMiliSec = new Date(dt.year, dt.month, dt.day, dt.hour, dt.min, dt.second).getTime()

      return dateInMiliSec
    }
  }
}
export const clockTime = {
  filters: {
    clockTime(date) {
      if (date) {
        const dateTime = date.split(" ")
        const posLastColon = dateTime[1].lastIndexOf(":")
        const time = dateTime[1].slice(0,posLastColon)
        return time
      }
     return "N/A"
      
    }
  }
}
export const dateAndTime = {
  filters: {
    dateAndTime(date) {
      const dt = dateObject(date)
      return dt.day + '/' + towDigitsMonth(dt.month + 1) + '/' + dt.year + '-' + dt.hour + ':' + dt.min
    }
  }
} 

const dateObject = (date) => {

  const datetime = date.split(" ")
  const dateComplete = datetime[0].split("-")
  const day = dateComplete[2]
  const month = +dateComplete[1] - 1
  const year = dateComplete[0]
  const time = datetime[1].split(":")
  const hour = time[0]
  const min = time[1]
  const second = time[2]

  return {
    day,
    month,
    year,
    hour,
    min,
    second
  }
}

const towDigitsMonth = (month) => {
  return month.toString().length === 1 ? '0' + month : month
}