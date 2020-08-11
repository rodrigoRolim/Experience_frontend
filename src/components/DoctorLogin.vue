<template>
  <div class="doctor-login">
    <form class="doctor-login__form">
      <div class="doctor-login__selects">
        <div class="doctor-login__cr">
          <code-label
            bind="attendance"
            label="Conselho Profissional"
            color="#676a6c"
            :fontWeight="700"
            fontSize="0.8rem"
          ></code-label>
          <code-select
            class="d-cr"
            :options="crs"
            name="attendance"
            option="conselho profissional"
            v-model="doctor.sigla"
            :width="7"
            :height="9"
            :error="validate.sigla"
          ></code-select>
        </div>
       <div class="doctor-login__uf">
          <code-label
            bind="ufConselho"
            label="UF conselho"
            color="#676a6c"
            :fontWeight="700"
            fontSize="0.8rem"
          ></code-label>
          <code-select
            class="doctor-login__cr-select"
            name="ufConselho"
            :options="ufs"
            option="UF conselho"
            v-model="doctor.uf"
            :width="7"
            :height="9"
            :error="validate.uf"
          ></code-select>
       </div>
      </div>
      <div class="doctor-login__crm">
        <code-label
          bind="numcrm"
          label="Número Conselho Profissional"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          
        ></code-label>
        <code-input
          placeholder="Número Conselho Profissional"
          name="numcrm"
          :width="7"
          :height="9"
          :weight="500"
          icon="stethoscope"
          v-model="doctor.crm"
          color="#333"
          numeric
          :error="validate.crm"
        />
      </div>
      <div class="doctor-login__password">
        <code-label
          bind="doctorPassword"
          label="Senha"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
        ></code-label>
        <code-input-password
          id="doctorPassword"
          name="doctorPassword"
          :width="7"
          :height="9"
          icon="lock"
          v-model="doctor.senha"
          :error="validate.senha"
        />
      </div>
      <div class="doctor-login__doubt">
      </div>
      <div class="doctor-login__buttons">
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
import CodeSelect from './base/CodeSelect'
import CodeInput from './base/CodeInput'
import CodeInputPassword from './base/CodeInputPassword'
import CodeLabel from './base/CodeLabel'
import CodeButton from './base/CodeButton'
import { required } from '../mixins/validations/rules'
import { validator } from '../mixins/validations/validator'
import { mapActions } from 'vuex'
import { AUTH_REQUEST_NAMESPACED, DOCTOR_AUTH, DOCTOR_TYPE, REQUIRED_INPUT } from '../utils/alias'
export default {
  name: 'DoctorLogin',
  mixins: [validator({required})],
  components: {
    CodeSelect,
    CodeInput,
    CodeInputPassword,
    CodeLabel,
    CodeButton
  },
  data () {
    return {
      ufs: [{
        id: 1, name: 'MA'
      }],
      crs: [{id: 1, name: 'CRM'}],
      doctor: {
        sigla: null,
        uf: null,
        crm: '',
        senha: ''
      },
      validate: {
        sigla: '',
        uf: '',
        crm: '',
        senha: ''
      }
    }
  },
  watch: {
    'doctor.sigla': function (value) {
      if (this.required(value)) {
        this.validate.sigla = REQUIRED_INPUT
      } else {
        this.validate.sigla = ''
      }
    },
    'doctor.uf': function (value) {
      if (this.required(value)) {
        this.validate.uf = REQUIRED_INPUT
      } else {
        this.validate.uf = ''
      }
    },
    'doctor.crm': function (value) {
      if (this.required(value)) {
        this.validate.crm = REQUIRED_INPUT
      } else {
        this.validate.crm = ''
      }
    },
    'doctor.senha' (value) {
      if (this.required(value)) {
        this.validate.senha = REQUIRED_INPUT
      } else {
        this.validate.senha = ''
      }
    }
  },
  methods: {
    ...mapActions({
      login: AUTH_REQUEST_NAMESPACED
    }),
    validateAll () {
      let fields = Object.keys(this.doctor).filter(el => this.doctor[el] == '' || this.doctor[el] == -1)
      fields.forEach(element => {
        this.validate[element] = REQUIRED_INPUT
      })
      return fields.length > 0
    },
    confirm (e) {
      let { doctor } = this
      this.login({ url: DOCTOR_AUTH, credentials: doctor, typeUser: DOCTOR_TYPE })
        .then((logged) => console.log(logged))
        .catch((err) => console.log({err}))
      e.preventDefault()
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
.doctor-login
  width: 100%
  height: 100%
  background-color: white
.doctor-login__selects
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  width: 100%
.doctor-login__cr
  width:  48%
  @include respond-to(handhelds)
    width: 100%
.doctor-login__uf
  width: 48%
  @include respond-to(handhelds)
    width: 100%
.doctor-login__form
  display: flex
  flex-direction: column
  padding: 20px
.doctor-login__selects,
.doctor-login__crm,
.doctor-login__password,
.doctor-login__uf,
.doctor-login__cr
  margin: 7px 0
.d-selects
  display: flex
  flex-direction: row
  justify-content: space-between
.doctor-login__buttons
  display: flex
  flex-direction: row
  width: 100%
.doctor-login__doubt
  display: flex
  flex-direction: row
  justify-content: flex-end
  align-items: baseline
  margin: 20px 0
.doctor-login__doubt .doctor-login__doubt-button
  color: rgb(52, 181, 131)
  cursor: pointer
</style>
