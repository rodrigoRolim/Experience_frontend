<template>
  <div class="healthcare-login">
    <form class="healthcare-login__form">
      <div class="healthcare-login__cpf">
        <code-label
          bind="user"
          label="Usuário"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
         ></code-label>
        <code-input
          placeholder="Usuário"
          v-model="healthCare.userid"
          name="user"
          type="text"
          :width="7"
          :height="9"
          :weight="400"
          color="#333"
          icon="user"
          :error="validate.userid"
        /> 
      </div>
      <div class="healthcare-login__password">
        <code-label
          bind="healthPassword"
          label="Senha"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
        ></code-label>
         <code-input-password
          id="healthPassword"
          name="healthPassword"
          v-model="healthCare.senha"
          :width="7"
          :height="9"
          icon="lock"
          color="#333"
          :error="validate.senha"
        />
      </div>
      <div class="healthcare-login__healtcare-select">
        <code-label
          bind="healthcares"
          label="Posto"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
        ></code-label>
        <code-select
          :options="list"
          option="Selecione um posto"
          v-model="healthCare.posto"
          size="0.9rem"
          name="healthcares"
          icon="clinic-medical"
          :error="validate.posto"
        />
      </div>
      <div class="healthcare-login__doubt">
      </div>
      <div class="healthcare-login__buttons">
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
          velocity-loading="1x"
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
import CodeSelect from './base/CodeSelect'
import { required } from '../mixins/validations/rules'
import { validator } from '../mixins/validations/validator'
import { login } from '../mixins/login'
import { mapActions } from 'vuex'
import { 
  NAMESPACED_AUTH,
  AUTH_REQUEST, 
  HEALTH_CENTER_AUTH, 
  HEALTH_CENTER_TYPE, 
  HEALTH_CENTER_ROUTE, 
  REQUIRED_INPUT
} from '../utils/alias'
export default {
  name: 'LoginPatient',
  mixins: [validator({required}), login],
  components: {
    CodeButton,
    CodeInput,
    CodeInputPassword,
    CodeLabel,
    CodeSelect
  },
  data () {
    return {
      healthCare: {
        userid: '',
        senha: '',
        posto: null
      },
      validate: {
        userid: '',
        senha: '',
        posto: ''
      },
      list: [
        { id: 1, name: 'fake news' },
        { id: 2, name: 'fake news' },
        { id: 3, name: 'fake news' },
        { id: 4, name: 'fake news' },
        { id: 5, name: 'fake news' },
        { id: 6, name: 'fake news' },
        { id: 7, name: 'fake news' },
      ]
    }
  },
  computed: {
    user () {
      return this.healthCare.userid
    },
    password () {
      return this.healthCare.senha
    },
    healthSelected () {
      return this.healthCare.posto < 0 ? '' : this.healthCare.posto
    }
  },
  watch: {
    user (value) {
      if (this.required(value)) {
        this.validate.userid = REQUIRED_INPUT
      } else {
        this.validate.userid = ''
      }
    },
    password (value) {
      if (this.required(value)) {
        this.validate.senha = REQUIRED_INPUT
      } else {
        this.validate.senha = ''
      }
    },
    healthSelected (value) {
       if (this.required(value)) {
        this.validate.posto = REQUIRED_INPUT
      } else {
        this.validate.posto = ''
      }
    }
  },
  methods: {
    ...mapActions (NAMESPACED_AUTH, {
      login: AUTH_REQUEST
    }),
    validateAll () {
      let fields = Object.keys(this.healthCare).filter(el => this.healthCare[el] == '' || this.healthCare[el] == -1)
      fields.forEach(element => {
        this.validate[element] = REQUIRED_INPUT
      })
      return fields.length > 0
    },
    confirm (e) {
      e.preventDefault()

      let emptyField = this.validateAll()

      if (!emptyField && this.authState !== 'loading') {
        this.realizeLogin()
        return
      }
      if (emptyField) {
        this.$emit('error', this.message(111))
      }
    },
    async realizeLogin () {
      this.showLoader = true
      let { healthCare } = this
      this.$emit('loading', true)
      try {
        let resp = await this.login({ 
            url: HEALTH_CENTER_AUTH, 
            credentials: healthCare, 
            typeUser: HEALTH_CENTER_TYPE 
          })
        this.success(resp.status, HEALTH_CENTER_ROUTE)
      } catch (err) {
        let refused = err.message === 'Netowrk Error' ? 502 : undefined
        this.error(refused || err.response.status) 
        this.$emit('loading', false)
      }
    }
  }  
}
</script>
<style lang="sass" scoped>
.login-partner
  background-color: white
.healthcare-login__form
  display: flex
  flex-direction: column
  padding: 20px
.login-hc-input-att,
.healthcare-login__password,
.healthcare-login__cpf,
.healthcare-login__healtcare-select
  margin: 7px 0
.healthcare-login__buttons
  display: flex
  flex-direction: row
  width: 100%
.healthcare-login__doubt
  display: flex
  flex-direction: row
  justify-content: flex-end
  align-names: baseline
  margin: 20px 0
.healthcare-login__doubt .healthcare-login__doubt-button
  color: rgb(52, 181, 131)
  cursor: pointer
</style>

