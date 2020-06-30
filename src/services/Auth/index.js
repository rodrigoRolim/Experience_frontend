export default class Auth {
  
  constructor (axios) {
    this.axios = axios
  }

  makeLogin (body) {
    return this.axios.post('/auth/login', { body })
  }

  makeLogout () {
    return this.axios.get('/auth/logout')
  }

  makeLoginByAutoAtendimento (body) {
    return this.axios.post('/auth/autoatendimento', { body })
  }

}