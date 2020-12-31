import { serverExperience, serverAuth, serverPDF } from '../config/axios'
import axios from 'axios'
export const requestResource = ({ url = '', params, data = {}, method = 'GET', headers = {} }) => {
  console.log(headers)
  return serverExperience({
    headers,
    method,
    params,
    url,
    data
  })
}
export const multipleRequests = (cbs = []) => {
  
  return axios.all(cbs)
}
export const requestToken = ({ url, auth }) => {

  return serverAuth.post(url, auth)
}
export const requestPDF = ({ url, params, method = 'GET' }) => {
  return serverPDF({
    url,
    params,
    method
  })
}