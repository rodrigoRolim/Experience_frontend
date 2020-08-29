export const cpf = {

  watch: {
    cpf (value) {
      let input = value
      console.log(input)
      if (/\D\.$/.test(input)) {
        input = input.substr(0, input.length - 3)
      }
      let values = input.split(/\.|-/).map(function(v) {
        return v.replace(/\D/g, '')
      });
      var output = values.map(function (v, i) {

        if (v.length == 3 && i < 2) {
          return v + ' . '
        } else if (v.length == 3 && i < 3){
          return v + ' - '
        } else {
          return v
        }
      })
      this.cpf = output.join('').substr(0, 20)
    }
  }
}

export const identifier = {

  watch: {
    identifier (value) {
      let input = value

      if (/\D\/$/.test(input)) {
        input = input.substr(0, input.length - 3)
      }
    
      let values = input.split(/\//).map(function(v) {
        return v.replace(/\D/g, '')
      });
      
      let output = values.map(function (v, i) {
        console.log(i)
        console.log(v)
        return (v.length >= 3 && i == 0) ? v + ' / ' : v
      })
      this.identifier = output.join('').substr(0, 11)
    }
  }
}