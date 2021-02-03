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
      return !isNaN(ageDate) ? ageDate : "";
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
      let hc = healthCenter
      let att = attendance

      if (healthCenter < 10) {
        hc = '00' + healthCenter
      }
      if (healthCenter > 9) {
        hc = '0' + healthCenter
      }
      if (attendance < 10) {
        att = '0000' + attendance
      }
      if (attendance > 9) {
        att = '000' + attendance
      }
      if (attendance > 99) {
        att = '00' + attendance
      }
      if (attendance > 999) {
        att = '0' + attendance
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