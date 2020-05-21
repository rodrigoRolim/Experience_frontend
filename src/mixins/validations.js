export const validations = {
  methods: {
    required (value) {
      return value == ''
    },
    min (value, min) {
      console.log(value, min)
    },
    max (value, max) {
      console.log(value, max)
    },
    email (value, regex) {
      console.log(value, regex)
    },
    password (value, regex) {
      console.log(value, regex)
    },
    date (value, regex) {
      console.log(value, regex)
    }
  }
}