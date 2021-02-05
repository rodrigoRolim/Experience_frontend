import axios from 'axios'
import store from '../store/index'
import { ADD_CANCEL_TOKEN, REFRESH_TOKEN } from '../utils/alias'

(function() {
  
  let customAccess = {}
  let currentPath = window.location.pathname
  const isCedroAccess = currentPath === '/lab-cedro' || currentPath === undefined
  const isCortezAccess = currentPath === '/lab-cortez' || currentPath === undefined
  console.log(currentPath)
  console.log(process.env.VUE_APP_API_CEDRO)
  if (isCedroAccess) {

    customAccess = {
      endpoint: process.env.VUE_APP_API_CEDRO,
      theme: "cedro",
      logo: "cedro",
      rootPath: '/lab-cedro'
    }
    localStorage.setItem('custom-access', JSON.stringify(customAccess))
    
  }

  if (isCortezAccess) {
 
    customAccess = {
      endpoint: process.env.VUE_APP_API_CORTEZ,
      theme: "cortez",
      logo: "cortez",
      rootPath: '/lab-cortez'
    }
    localStorage.setItem('custom-access', JSON.stringify(customAccess))
  }
})()
console.log(localStorage.getItem('custom-access'))
const serverExperience = axios.create({
  baseURL:  JSON.parse(localStorage.getItem('custom-access')).endpoint + ":9001",
  timeout: 4000000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'aplication/json, text/plain, */*'
  },
})

serverExperience.interceptors.request.use(
  config => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    config.cancelToken = source.token
    store.commit(ADD_CANCEL_TOKEN, source)
    let token = store.getters['auth/token']

    if (token) {
      token = 'Bearer ' + token
      //config.headers['X-Paginate'] = true
      config.headers.Authorization = token
    }

    return config;
  },
  error => Promise.reject(error),
);
// uma boa solução para o refresh automatico do token
serverExperience.interceptors.response.use(response => response, error => {
  const status = error.response ? error.response.status: null

  if (status === 401) {
    return refreshToken()
      .then(token => {
        error.config.headers['Authorization'] = 'Bearer ' + token
        error.config.baseURL = undefined
        return serverExperience.request(error.config)
      })
  }
  return Promise.reject(error)
})

const serverAuth = axios.create({
  baseURL: process.env.VUE_APP_API_CORTEZ + ":9000",
  timeout: 5000000,
  headers: {
    'Content-Type': 'application/json'
  },
  Credentials: false
})

serverAuth.interceptors.request.use(
  config => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    config.cancelToken = source.token
    store.commit(ADD_CANCEL_TOKEN, source)

    return config
  },
  error => Promise.reject(error)
)
const serverPDF = axios.create({
  baseURL: process.env.VUE_APP_API_CORTEZ + ':9050',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  Credentials: false
})

serverPDF.interceptors.request.use(
  config => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    config.cancelToken = source.token
    store.commit(ADD_CANCEL_TOKEN, source)
    let token = store.getters['auth/token']

    if (token) {
      token = 'Bearer ' + token
      config.headers.Authorization = token
    }

    return config;
  },
  error => Promise.reject(error),
);

function refreshToken() {
  let url = REFRESH_TOKEN
  const refreshing = store.dispatch('auth/REAUTH_REQUEST', { url }).then(token => {
    return Promise.resolve(token)
  })
  return refreshing
}

export { serverAuth }
export { serverExperience }
export { serverPDF }
