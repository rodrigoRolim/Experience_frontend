import axios from 'axios'

const serverExperience = axios.create({
  baseURL: 'http://192.168.1.68:9001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

//http.interceptors.request.use(
  //config => {
    /*
     * Here you can add a header with a JWT token, ensuring it will be
     * sent with ALL your requests.
     */
    //return config;
  //},
  //error => Promise.reject(error),
//);

//http.interceptors.response.use(
  //response => response,
  //error => {
    /*
     * Here you can add a central error handling mechanism
     */
    //store.dispatch('setErrorMessage', { error: error.response.data });

    //return Promise.reject(error);
  //},
//);

const serverAuth = axios.create({
  baseURL: 'http://192.168.1.68:9000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  Credentials: false
})

export { serverAuth }
export { serverExperience }