<template>
  <div class="healthcare-login">
    <form class="healthcare-login__form">
      <div class="healthcare-login__cpf">
        <code-input
          placeholder="Usuário"
          v-model="healthCare.userid"
          label="usuário"
          name="user"
          type="text"
          @enter="confirm"
          color="#333"
          icon="user"
          :error="validate.userid"
        /> 
      </div>
      <div class="healthcare-login__password">
         <code-input-password
          id="healthPassword"
          name="healthPassword"
          label="senha"
          v-model="healthCare.senha"
          @enter="confirm"
          icon="lock"
          color="#333"
          :error="validate.senha"
        />
      </div>
      <div class="healthcare-login__healtcare-select">
        <code-select
          :options="list"
          label="posto"
          option="Selecione um posto"
          v-model="healthCare.posto"
          @enter="confirm"
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
import CodeSelect from './base/CodeSelect'
import { requestResource } from '../services/api'
import { required, isOption } from '../mixins/validations/rules'
import { validator } from '../mixins/validations/validator'
import { login } from '../mixins/login'
import { mapActions, mapMutations } from 'vuex'
import { httpMessage } from '../utils/statusMessages'
import { 
  NAMESPACED_AUTH,
  AUTH_REQUEST, 
  HEALTH_CENTER_AUTH, 
  HEALTH_CENTER_TYPE, 
  HEALTH_CENTER_ROUTE, 
  REQUIRED_INPUT,
  GET_HEALTH_CENTERS, 
  SELECTED_HEALTHCENTER,
  INVALID_OPTION
} from '../utils/alias'
export default {
  name: 'LoginPatient',
  mixins: [validator({required, isOption}), login],
  components: {
    CodeButton,
    CodeInput,
    CodeInputPassword,
    CodeSelect
  },
  data () {
    return {
      healthCare: {
        userid: '',
        senha: '',
        posto: ''
      },
      validate: {
        userid: '',
        senha: '',
        posto: ''
      },
      healthCenters: []
    }
  },
  created () {
    let url = GET_HEALTH_CENTERS 
    requestResource({url})
      .then(res => {
        this.list = res.data
      })
      .catch((err) => {
        let status = (err.response) ? err.response.status : 408
        this.error(httpMessage({ status: status, data: 'postos' }))
      })
  },
  computed: {
    list: {
      get () {
        return this.healthCenters
      },
      set (values) {
        this.healthCenters = values.map((value) => ({id: value.posto, name: value.nome}))
      }
    },
    user () {
      return this.healthCare.userid
    },
    password () {
      return this.healthCare.senha
    },
    healthSelected () {
      return this.healthCare.posto
    }
  },
  watch: {
    'healthCare.posto': function (value) {
      this.setHealthCenter(value)
    },
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
      } else if (this.isOption(value, this.list)){
        this.validate.posto = INVALID_OPTION
      } else {
        this.validate.posto = ''
      }
    } 
  },
  methods: {
    ...mapActions (NAMESPACED_AUTH, {
      login: AUTH_REQUEST
    }),
    ...mapMutations(NAMESPACED_AUTH, {
      setHealthCenter: SELECTED_HEALTHCENTER
    }),
    validateAll () {
      let fields = Object.keys(this.healthCare).filter(el => this.healthCare[el] == '')
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
        this.error(httpMessage({status: 111, data: 'postos'}))
      }
    },
    realizeLogin () {
      this.showLoader = true
      let { healthCare } = this
      this.$emit('loading', true)
      
      this.login({ 
          url: HEALTH_CENTER_AUTH, 
          credentials: healthCare, 
          typeUser: HEALTH_CENTER_TYPE 
        })
        .then((resp) => {

          this.success(resp.status, HEALTH_CENTER_ROUTE)
        })
        .catch(() => {
          this.error() 
          this.$emit('loading', false)
        })
    }
  }  
}
</script>
<style lang="sass" s.coped>
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

