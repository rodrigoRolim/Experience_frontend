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
export const ltBegin = function (value, begin) {

  let valueArr = value.split(" - ")
  let beginArr = begin.split(" - ")
  
  let valueDay = valueArr[0]
  let valueMonth = valueArr[1]
  let valueYear = valueArr[2]

  let beginDay = beginArr[0]
  let beginMonth = beginArr[1]
  let beginYear = beginArr[2]
  //console.log(new Date(valueYear + "-" + (valueMonth - 1) + "-" + valueDay) < new Date(beginYear + "-" + (beginMonth - 1) + "-" + beginDay))  
  return new Date(valueYear + "-" + (valueMonth - 1) + "-" + valueDay) < new Date(beginYear + "-" + (beginMonth - 1) + "-" + beginDay)
}
export const gtEnd = function (value, end) {
  let valueArr = value.split(" - ")
  let endArr = end.split(" - ")
  
  let valueDay = valueArr[0]
  let valueMonth = valueArr[1]
  let valueYear = valueArr[2]

  let endDay = endArr[0]
  let endMonth = endArr[1]
  let endYear = endArr[2]

  return new Date(valueYear + "-" + (valueMonth - 1) + "-" + valueDay) > new Date(endYear + "-" + (endMonth - 1) + "-" + endDay)
}
export const validateForm = function (form, validate, message) {
  let fields = Object.keys(form).filter(el => form[el] == '' || form[el] == '')
  fields.forEach(element => {
    validate[element] = message
  })
  return fields.length > 0
}
export const isOption = function (option, options) {
  console.log(!!options.find((opt) => opt.id == option.id || opt.name == option))
  return !options.find((opt) => opt.id == option.id || opt.name == option)
}