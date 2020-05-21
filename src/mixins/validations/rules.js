export const required = function (value) {
  return value == ''
}
export const min = function (value, min) {
  return value.length < min
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
  return regex.test(value)
}
