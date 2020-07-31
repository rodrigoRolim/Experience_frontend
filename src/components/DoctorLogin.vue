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
            v-model="doctor.professionalCouncil"
            :width="7"
            :height="9"
            :error="validate.professionalCouncil"
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
            v-model="doctor.profissionalUF"
            :width="7"
            :height="9"
            :error="validate.profissionalUF"
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
          v-model="doctor.numberCr"
          color="#333"
          numeric
          :error="validate.numberCr"
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
          v-model="doctor.password"
          :error="validate.password"
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
        professionalCouncil: null,
        profissionalUF: null,
        numberCr: '',
        password: ''
      },
      validate: {
        professionalCouncil: '',
        profissionalUF: '',
        numberCr: '',
        password: ''
      }
    }
  },
  computed: {
    professionalCouncil () {
      return this.doctor.professionalCouncil < 0 ? '' : this.doctor.professionalCouncil
    },
    profissionalUF () {
      return this.doctor.profissionalUF < 0 ? '' : this.doctor.profissionalUF
    },
    numberCr () {
      return this.doctor.numberCr
    },
    password () {
      return this.doctor.password
    }
  },
  watch: {
    professionalCouncil (value) {
      if (this.required(value)) {
        this.validate.professionalCouncil = 'campo obrigatório'
      } else {
        this.validate.professionalCouncil = ''
      }
    },
    profissionalUF (value) {
      if (this.required(value)) {
        this.validate.profissionalUF = 'campo obrigatório'
      } else {
        this.validate.profissionalUF = ''
      }
    },
    numberCr (value) {
      if (this.required(value)) {
        this.validate.numberCr = 'campo obrigatório'
      } else {
        this.validate.numberCr = ''
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
      let fields = Object.keys(this.doctor).filter(el => this.doctor[el] == '' || this.doctor[el] == -1)
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
