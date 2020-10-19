import { serverExperience, serverAuth } from '../config/axios'
import axios from 'axios'
export const requestResource = ({ url = '', params, data = {}, method = 'GET' }) => {
  return serverExperience({
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
