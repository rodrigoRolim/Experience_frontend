export const cpf = {

  watch: {
    cpf (value) {
      let input = value
      if (/\D\.$/.test(input)) {
        input = input.substr(0, input.length - 3)
      }
      let values = input.split(/\.|-/).map(function(v) {
        return v.replace(/\D/g, '')
      });
      var output = values.map(function (v, i) {

        if (v.length == 3 && i < 2) {
          return v + '.'
        } else if (v.length == 3 && i < 3){
          return v + '-'
        } else {
          return v
        }
      })
      this.cpf = output.join('').substr(0, 14)
    }
  }
}

export const identifier = {

  watch: {
    identifier (value) {
      
      let input = value
      
      if (/\D\/$/g.test(input)) {
        console.log('hi')
        input = input.substr(0, input.length - 3)
      }
      console.log('input:', input)
      let values = input.split(/\//).map(function(v) {
        return v.replace(/\D/g, '')
      });
      console.log(value)
      let output = values.map(function (v, i) {
        return (v.length >= 3 && i == 0) ? v + ' / ' : v
      })
      console.log('output: ', output)
      this.identifier = output.join('').substr(0, 11)
    }
  }
}