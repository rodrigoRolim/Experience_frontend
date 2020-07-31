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
          v-model="healthCare.user"
          name="user"
          type="text"
          :width="7"
          :height="9"
          :weight="400"
          color="#333"
          icon="user"
          :error="validate.user"
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
          v-model="healthCare.password"
          :width="7"
          :height="9"
          icon="lock"
          color="#333"
          :error="validate.password"
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
          @selected="healthCare.healthSelected = value"
          size="0.9rem"
          name="healthcares"
          icon="clinic-medical"
          :width="7"
          :height="9"
          :error="validate.healthSelected"
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
          @click.prevent="confirm"
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
export default {
  name: 'LoginPatient',
  mixins: [validator({required})],
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
        user: '',
        password: '',
        healthSelected: null
      },
      validate: {
        user: '',
        password: '',
        healthSelected: ''
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
      return this.healthCare.user
    },
    password () {
      return this.healthCare.password
    },
    healthSelected () {
      return this.healthCare.healthSelected < 0 ? '' : this.healthCare.healthSelected 
    }
  },
  watch: {
    user (value) {
      if (this.required(value)) {
        this.validate.user = 'campo obrigatório'
      } else {
        this.validate.use = ''
      }
    },
    password (value) {
      if (this.required(value)) {
        this.validate.password = 'campo obrigatório'
      } else {
        this.validate.password = ''
      }
    },
    healthSelected (value) {
       if (this.required(value)) {
        this.validate.healthSelected = 'campo obrigatório'
      } else {
        this.validate.healthSelected = ''
      }
    }
  },
  methods: {
    validateAll () {
      let fields = Object.keys(this.healthCare).filter(el => this.healthCare[el] == '' || this.healthCare[el] == -1)
      fields.forEach(element => {
        this.validate[element] = 'campo obrigatório'
      })
      return fields.length > 0
    },
    confirm () {
      let validated = this.validateAll()
      this.messageValidation(validated)
    },
    messageValidation (validated) {
      this.$emit('error', {error: validated, message: 'corrija ou preencha os campos abaixo'})
    },
    getValue (value) {
      console.log(value)
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

