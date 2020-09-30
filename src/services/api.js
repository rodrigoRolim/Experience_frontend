import { serverExperience, serverAuth } from '../config/axios'
import axios from 'axios'
const CancelToken = axios.CancelToken
const source = CancelToken.source()
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
export { source }