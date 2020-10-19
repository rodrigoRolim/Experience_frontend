import axios from 'axios'
import store from '../store/index'
import { ADD_CANCEL_TOKEN } from '../utils/alias'
const CancelToken = axios.CancelToken
const source = CancelToken.source()
const serverExperience = axios.create({
  baseURL: 'http://192.168.1.68:9001',
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'aplication/json, text/plain, */*'
  },
})

serverExperience.interceptors.request.use(
  config => {
   
    //config.cancelToken = source.token
    //store.commit('cancel/'+ADD_CANCEL_TOKEN, source)
    let token = store.getters['auth/token']
    if (token) {
      token = 'Bearer ' + token
      config.headers['X-Paginate'] = true
      config.headers.Authorization = token
    }

    return config;
  },
  error => Promise.reject(error),
);

const serverAuth = axios.create({
  baseURL: 'http://192.168.1.68:9000',
  timeout: 5000000,
  headers: {
    'Content-Type': 'application/json'
  },
  Credentials: false
})
serverAuth.interceptors.request.use(
  config => {
   
    config.cancelToken = source.token
    store.commit('cancel/'+ADD_CANCEL_TOKEN, source)

    return config
  },
  error => Promise.reject(error)
)
export { serverAuth }
export { serverExperience }