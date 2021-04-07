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
          :options="healthCenterList"
          label="posto"
          option="Selecione um posto"
          v-model="healthCare.posto"
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
          :disabled="status == 'loading'"
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
import { required, isOption } from '../mixins/validations/rules'
import { validator } from '../mixins/validations/validator'
import { login } from '../mixins/login'
import { mapActions, mapMutations } from 'vuex'
import { httpMessage } from '../utils/statusMessages'
import { 
  NAMESPACED_AUTH,
  NAMESPACED_HEALTH_CENTERS,
  AUTH_REQUEST, 
  HEALTH_CENTER_AUTH, 
  HEALTH_CENTER_TYPE, 
  HEALTH_CENTER_ROUTE, 
  REQUIRED_INPUT, 
  SELECTED_HEALTHCENTER,
  GET_HEALTH_CENTERS_STORE,
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
  async created () {
    this.healthCenterList = await this.getHealthCenters()
  },
  computed: {
    healthCenterList: {
      get() {
        return this.healthCenters
      },
      set(values) {
        this.healthCenters = values.map((value) => ({id: value.posto, name: value.nome}))
      }
    },
    validateHealthCenter() {
      return this.healthCare.posto
    }
  },
  watch: {
    'healthCare.posto': function (value) {
      this.setHealthCenter(value)
    },
    'healthCare.userid': function(value) {
      if (this.required(value)) {
        this.validate.userid = REQUIRED_INPUT
      } else {
        this.validate.userid = ''
      }
    },
    'healthCare.senha': function(value) {
      if (this.required(value)) {
        this.validate.senha = REQUIRED_INPUT
      } else {
        this.validate.senha = ''
      }
    },
    validateHealthCenter(value) {
      if (this.required(value)) {
        this.validate.posto = REQUIRED_INPUT
      } else if (this.isOption(value, this.healthCenterList)){
        this.validate.posto = INVALID_OPTION
      } else {
        this.validate.posto = ''
      }
    } 
  },
  methods: {
    ...mapActions(NAMESPACED_HEALTH_CENTERS, {
      getHealthCenters: GET_HEALTH_CENTERS_STORE
    }),
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

      if (!emptyField && this.status !== 'loading') {
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

