<template>
  <div class="partner-login">
    <form class="partner-login__form">
      <div class="partner-login__partner-code">
        <code-label
          bind="partnerCode"
          label="Código Parceiro"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
        ></code-label>
        <code-input
          placeholder="Código do parceiro"
          name="partnerCode"
          type="text"
          v-model="partner.posto"
          color="#333"
          icon="handshake"
          numeric
          :error="validate.posto"
        />
      </div>
      <div class="partner-login__password">
        <code-label
          bind="partnerPassword"
          label="Senha"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
        ></code-label>
         <code-input-password
          id="partnerPassword"
          name="partnerPassword"
          v-model="partner.senha"
          icon="lock"
          color="#333"
          :error="validate.senha"
          @keypress.enter="confirm"
        />
      </div>
      <div class="partner-login__utilities">
      </div>
      <div class="partner-login__buttons">
        <code-button
          text="acessar"
          borded
          bolded
          letters="uppercase"
          color="theme"
          size="md"
          shading
          streched
          size-icon="lg"
          :loading="showLoader"
          @click.prevent="confirm"
          :disabled="authState == 'loading'"
        ></code-button>
      </div>  
    </form>
  </div>
</template>
<script>
import CodeInput from './base/CodeInput'
import CodeInputPassword from './base/CodeInputPassword'
import CodeButton from './base/CodeButton'
import CodeLabel from './base/CodeLabel'
import { required } from '../mixins/validations/rules'
import { validator } from '../mixins/validations/validator'
import { login } from '../mixins/login'
import { mapActions } from 'vuex'
import { USER_AUTH, PARTNER_TYPE, PARTNER_ROUTE, AUTH_REQUEST, NAMESPACED_AUTH } from '../utils/alias'
export default {
  name: 'PartnerLogin',
  mixins: [validator({required}), login],
  components: {
    CodeButton,
    CodeInput,
    CodeInputPassword,
    CodeLabel
  },
  data () {
    return {
      partner: {
        posto: '',
        senha: ''
      },
      validate: {
        posto: '',
        senha: ''
      }
    }
  },
  computed: {
    code () {
      return this.partner.posto
    },
    password () {
      return this.partner.senha
    }
  },
  watch: {
    code (value) {
      if (this.required(value)) {
        this.validate.posto = 'campo obrigatório'
      } else {
        this.validate.posto = ''
      }
    },
    password (value) {
      if (this.required(value)) {
        this.validate.senha = 'campo obrigatório'
      } else {
        this.validate.senha = ''
      }
    }
  },
  methods: {
    ...mapActions(NAMESPACED_AUTH, {
      login: AUTH_REQUEST
    }),
    validateAll () {
      let fields = Object.keys(this.partner).filter(el => this.partner[el] == '' || this.partner[el] == -1)
      fields.forEach(element => {
        this.validate[element] = 'campo obrigatório'
      })
      return fields.length > 0
    },
    confirm () {
      let emptyField = this.validateAll()
      if (!emptyField && this.authState !== 'loading') {
        this.realizeLogin()
        return
      } 
      if (emptyField) {
        this.emitMessage({status: 111})
      }    
    },
    async realizeLogin () {
      this.showLoader = true
      let { partner } = this
      try {
        let resp = await this.login({ url: USER_AUTH, credentials: partner, typeUser: PARTNER_TYPE })
        this.success(resp.status, PARTNER_ROUTE)
      } catch (err) {

        //let refused = err.message === 'Network Error' ? 502 : undefined
        //this.error(refused || err.response.status) 
        console.log(this.message)
        this.error()
        this.$emit('loading', false)
      }
    }
  }  
}
</script>
<style lang="sass" scoped>
.partner-login
  width: 100%
.partner-login__form
  display: flex
  flex-direction: column
  padding: 20px
.partner-login__password,
.partner-login__partner-code
  margin: 7px 0
.partner-login__buttons
  display: flex
  flex-direction: row
  width: 100%
.partner-login__utilities
  display: flex
  flex-direction: row
  justify-content: flex-end
  align-items: baseline
  margin: 20px 0
.partner-login__doubt
  color: rgb(52, 181, 131)
  cursor: pointer
</style>

