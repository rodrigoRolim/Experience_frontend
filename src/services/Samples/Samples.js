export default class Samples {

  constructor (axios) {
    this.axios = axios
  }

  getProcediments (description) {
    return this.axios.get(`/manuais/procedimentos/${description}`)
  }

  getPrepare (mnemonic) {
    return this.axios.get(`/manuais/preparo/${mnemonic}`)
  }

}
