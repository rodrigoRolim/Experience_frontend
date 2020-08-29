export const required = function (value) {
  return value == ''
}
export const min = function (value, min) {
  return value?.length < min
}
export const max = function (value, max) {
  return value.length < max
}
export const email = function (value, regex) {
  return regex.test(value)
}
export const password = function (value, regex) {
  return regex.test(value)
}
export const date = function (value, regex) {
  return !regex.test(value)
}
export const cpfValide = function (value, regex) {
  return !regex.test(value)
}
export const compareDates = function (begin, end) {
  return begin <= end
}
export const validateForm = function (form, validate, message) {
  let fields = Object.keys(form).filter(el => form[el] == '' || form[el] == '')
  fields.forEach(element => {
    validate[element] = message
  })
  return fields.length > 0
}