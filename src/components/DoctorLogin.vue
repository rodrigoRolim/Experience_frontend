<template>
  <div class="doctor-login">
    <form class="doctor-login__form">
      <div class="doctor-login__selects">
        <div class="doctor-login__cr">
          <code-select
            class="d-cr"
            :options="cps"
            label="conselho profissional"
            name="attendance"
            option="conselho profissional"
            v-model="doctor.sigla"
            :error="validate.sigla"
          ></code-select>
        </div>
       <div class="doctor-login__uf">
          <code-select
            class="doctor-login__cr-select"
            name="ufConselho"
            label="UF conselho"
            :options="ufs"
            option="UF conselho"
            v-model="doctor.uf"
            :error="validate.uf"
          ></code-select>
       </div>
      </div>
      <div class="doctor-login__crm">
        <code-input
          placeholder="Número Conselho Profissional"
          label="número conselho profissional"
          name="numcrm"
          icon="stethoscope"
          v-model="doctor.crm"
          color="#333"
          numeric
          :error="validate.crm"
          @enter="confirm"
        />
      </div>
      <div class="doctor-login__password">
        <code-input-password
          id="doctorPassword"
          name="doctorPassword"
          label="senha"
          :width="7"
          :height="9"
          icon="lock"
          @enter="confirm"
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
import CodeSelect from './base/CodeSelect'
import CodeInput from './base/CodeInput'
import CodeInputPassword from './base/CodeInputPassword'
import CodeButton from './base/CodeButton'
import { required, min } from '../mixins/validations/rules'
import { validator } from '../mixins/validations/validator'
import { login } from '../mixins/login'
import { mapActions } from 'vuex'
import { NAMESPACED_AUTH, AUTH_REQUEST, DOCTOR_AUTH, DOCTOR_ROUTE, DOCTOR_TYPE, REQUIRED_INPUT, /* INCOMPLETE_CP */ UFS, CPS } from '../utils/alias'
import { httpMessage } from '../utils/statusMessages'
export default {
  name: 'DoctorLogin',
  mixins: [validator({required, min}), login],
  components: {
    CodeSelect,
    CodeInput,
    CodeInputPassword,
    CodeButton
  },
  data () {
    return {
      ufs: UFS,
      cps: CPS,
      doctor: {
        sigla: '',
        uf: '',
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
  computed: {
    validator () {
    
      return (  
        this.validate.sigla !== '' || 
        this.validate.uf !== '' ||
        this.validate.crm !== '' ||
        this.validate.senha !== ''
      )
    },
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
      /*  else if (this.min(value, 4)){
        this.validate.crm = INCOMPLETE_CP */
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
    ...mapActions(NAMESPACED_AUTH, {
      login: AUTH_REQUEST
    }),
    validateAllFields () {
      let fields = Object.keys(this.doctor).filter(el => this.doctor[el] == '')
      fields.forEach(element => {
        this.validate[element] = REQUIRED_INPUT
      })
      return fields.length > 0
    },
    confirm () {

      let emptyInvalidFields = this.validateAllFields()
      if (!emptyInvalidFields && this.status !== 'loading' && !this.validator) {
        this.realizeLogin()
        return
      } 
      if (emptyInvalidFields || this.validator) {
        this.error(httpMessage({status: 111}))
      }    
    },
    async realizeLogin () {
      this.showLoader = true
      let { doctor } = this
      let auth = {
        crm: doctor.crm,
        senha: doctor.senha,
        sigla: doctor.sigla.name.toUpperCase(),
        uf: doctor.uf.name.toUpperCase()
      }
      this.$emit('loading', true)
      try {
        let resp = await this.login({ url: DOCTOR_AUTH, credentials: auth, typeUser: DOCTOR_TYPE })
        this.success(resp.status, DOCTOR_ROUTE)
      } catch (err) {
       
        this.error()
        this.$emit('loading', false)
      }
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
