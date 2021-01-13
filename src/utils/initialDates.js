export const begin = () => {
  let today = new Date()
  today.setDate(today.getDate() - 7)
  let currDate = (today.getDate() < 10) ? '0' + today.getDate() : today.getDate()
  let month = today.getMonth() + 1
  let currMonth = (month < 10) ? '0' + month : month
  let currYear = today.getFullYear()
  let dateInitial = currDate + ' / ' + currMonth + ' / ' + currYear
  return dateInitial
}
export const end = () => {
  let today = new Date()

  let nextDate = (today.getDate() < 10) ? '0' + today.getDate() : today.getDate()
  let month = today.getMonth() + 1
  let nextMonth = (month < 10) ? '0' + month : month
  let nextYear = today.getFullYear()
  let dateFinal = nextDate + ' / ' + nextMonth + ' / ' + nextYear
  return dateFinal
}