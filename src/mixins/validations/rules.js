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
  regex.lastIndex = 0
  return regex.test(value)
}
export const cpfValide = function (value, regex) {
  return !regex.test(value)
}
export const endLtBegin = function (begin, end) {
  let beginArr = begin.split(" - ")
  let endArr = end.split(" - ")
  
  let beginDay = beginArr[0]
  let beginMonth = beginArr[1]
  let beginYear = beginArr[2]

  let endDay = endArr[0]
  let endMonth = endArr[1]
  let endYear = endArr[2]
  //console.log(new Date(valueYear + "-" + (valueMonth - 1) + "-" + valueDay) < new Date(beginYear + "-" + (beginMonth - 1) + "-" + beginDay))  
  return new Date(beginYear, (beginMonth - 1), beginDay) > new Date(endYear, (endMonth - 1), endDay)
}
export const beginGtEnd = function (begin, end) {
  let beginArr = begin.split(" - ")
  let endArr = end.split(" - ")
  
  let beginDay = beginArr[0]
  let beginMonth = beginArr[1]
  let beginYear = beginArr[2]

  let endDay = endArr[0]
  let endMonth = endArr[1]
  let endYear = endArr[2]

  return new Date(beginYear, (beginMonth - 1), beginDay) > new Date(endYear, (endMonth - 1), endDay)
}
export const areAllInputsEmpty = function (form, validate, message) {
  let fields = Object.keys(form).filter(el => form[el] == '')
  fields.forEach(element => {
    validate[element] = message
  })
  return fields.length > 0
}
export const isOption = function (option, options) {

  return !options.find((opt) => opt.id == option.id || opt.name == option)
}