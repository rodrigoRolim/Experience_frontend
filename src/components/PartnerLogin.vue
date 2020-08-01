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
          v-model="partner.code"
          :width="7"
          :height="9"
          :weight="500"
          color="#333"
          icon="handshake"
          :error="validate.code"
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
          v-model="partner.password"
          :width="7"
          :height="9"
          icon="lock"
          color="#333"
          :error="validate.password"
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
import { required } from '../mixins/validations/rules'
import { validator } from '../mixins/validations/validator' 
export default {
  name: 'PartnerLogin',
  mixins: [validator({required})],
  components: {
    CodeButton,
    CodeInput,
    CodeInputPassword,
    CodeLabel
  },
  data () {
    return {
      partner: {
        code: '',
        password: ''
      },
      validate: {
        code: '',
        password: ''
      }
    }
  },
  computed: {
    code () {
      return this.partner.code
    },
    password () {
      return this.partner.password
    }
  },
  watch: {
    code (value) {
      if (this.required(value)) {
        this.validate.code = 'campo obrigatório'
      } else {
        this.validate.code = ''
      }
    },
    password (value) {
      if (this.required(value)) {
        this.validate.password = 'campo obrigatório'
      } else {
        this.validate.password = ''
      }
    }
  },
  methods: {
    validateAll () {
      let fields = Object.keys(this.partner).filter(el => this.partner[el] == '' || this.partner[el] == -1)
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

