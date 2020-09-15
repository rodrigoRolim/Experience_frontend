import { serverExperience, serverAuth } from '../config/axios'

export const requestResource = ({ url = '', headers, data = {}, method = '' }) => {
  return serverExperience({
    method,
    url,
    headers,
    data
  })
}

export const requestToken = ({ url, auth }) => {

  return serverAuth.post(url, auth)
}