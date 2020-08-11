import { serverExperience, serverAuth } from '../config/axios'

export const requestResource = ({ url = '', data = {}, method = '' }) => {
  return serverExperience({
    method,
    url,
    data
  })
}

export const requestToken = ({ url, auth }) => {

  return serverAuth.post(url, auth)
}