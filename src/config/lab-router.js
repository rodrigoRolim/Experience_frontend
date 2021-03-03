export const getLabRouter = function(laboratory) {

  let customAccess = {}

  if (laboratory === 'cedro') {

    customAccess = {
      endpoint: process.env.VUE_APP_API_CEDRO,
      theme: "cedro",
      logo: "cedro",
      mask: process.env.VUE_APP_MASK_ATTENDANCE_CEDRO,
      rootPath: '/lab-cedro'
    }
    localStorage.setItem('custom-access', JSON.stringify(customAccess))
    return 
  }

  if (laboratory === 'cortez') {
 
    customAccess = {
      endpoint: process.env.VUE_APP_API_CORTEZ,
      theme: "cortez",
      logo: "cortez",
      mask: process.env.VUE_APP_MASK_ATTENDANCE_CORTEZ,
      rootPath: '/lab-cortez'
    }
    localStorage.setItem('custom-access', JSON.stringify(customAccess))
  }
}