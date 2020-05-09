<template>
  <div class="login-patient">
    <form class="login-p-form">
      <div class="login-p-radio">
        <code-group-radios :receive="valueRadio" @group="group">
          <template v-slot:header>
            <p>Acessar como:</p>
          </template>
          <template v-slot:radios>
            <code-radio
              
              name="login"
              value="CPF"
              label="Atendimento Único"
              @radio="radio"
              identifier="cpf"
              :visible="visibility"
            ></code-radio>
            <code-radio
             
              name="login"
              value="ID"
              label="Histórico de Resultados"
              @radio="radio"
              identifier="id"
              :visible="visibility"
            ></code-radio>
          </template> 
        </code-group-radios>
      </div>
      <div class="login-p-cpf" v-if="visibility == 'ID'">
        <code-label
          bind="cpf"
          label="Cpf"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
         ></code-label>
        <code-input
          placeholder="CPF"
          name="cpf"
          type="text"
          required
          v-model="patient.cpf"
          :width="9"
          :height="7"
          :weight="500"
          color="#333"
          icon="user"
        />
      </div>
      <div class="login-p-birthday" v-if="visibility == 'ID'">
         <code-label
          bind="birthDay"
          label="Data nascimento"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
         ></code-label>
        <code-input
          placeholder="Data de nascimento"
          :hasIcon="true"
          name="birthDay"
          type="text"
          required
          v-model="patient.birthDay"
          :width="9"
          :height="7"
          :weight="500"
          color="#333"
          icon="user"
        />
      </div>
      <div class="login-p-input-att" v-else>
        <code-label
          bind="idAttendance"
          label="Atendimento"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
         ></code-label>
        <code-input
          ref="idAttendance"
          placeholder="ID Atendimento"
          name="idAttendance"
          type="text"
          required
          v-model="patient.idAttendance"
          @focus="focusInput"
          :width="9"
          :height="7"
          :weight="600"
          color="#333"
          icon="user"
          :focused="focusedInput == 'idAttendance'"
        />
      </div>
      <div class="login-p-pass">
        <code-label
          bind="patient-password"
          label="Senha"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <code-input-password
          ref="password"
          name="password"
          id="patient-password"
          :width="9"
          :height="7"
          icon="lock"
          @focus="focusInput"
          v-model="patient.password"
          :focused="focusedInput == 'password'"
        />
      </div>
      <div class="doubt-keyboard">
        <small class="keyboard">
          <i v-if="visibility !== 'ID'" @click="displayKeyboard">
            <font-awesome-icon icon="keyboard" size="lg"/>
          </i>
        </small>
        <code-tooltip
          text="Clique aqui"
        >
          <template>
            <small @click="displayHelpToLogin">duvidas <i><font-awesome-icon icon="question-circle"/></i></small>
          </template>
        </code-tooltip> 
      </div>
      <div class="login-p-buttons">
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
        ></code-button>
      </div>
    </form>
    <div class="login-patient__softkeyboard" @click="keepFocus">
      <keyboard-self-service
        @write="write"
        @nextInput="nextInput"
        @previousInput="previousInput"
        @enter="enter"
        @backspace="backspace"
        @right="goRight"
        @left="goLeft"
        @space="space"

        :show="softKeyboard"
        :input="inputKeyboard"
        @close="softKeyboard=false" 
      />  
    </div>
  </div>
</template>
<script>
import CodeInput from './base/CodeInput'
import CodeButton from './base/CodeButton'
import CodeLabel from './base/CodeLabel'
import CodeRadio from './base/CodeRadio'
import CodeTooltip from './base/CodeTooltip'
import CodeGroupRadios from './base/CodeGroupRadios'
import CodeInputPassword from './base/CodeInputPassword'
import keyboardSelfService from './KeyboardSelfService'
export default {
  name: 'LoginPatient',
  props: {
    digit: String
  },
  components: {
    CodeButton,
    CodeInput,
    CodeLabel,
    CodeRadio,
    CodeTooltip,
    CodeGroupRadios,
    CodeInputPassword,
    keyboardSelfService
  },
  data () {
    return {
      patient: {
        cpf: '',
        birthDay: '',
        idAttendance: '',
        password: ''
      },
      receive: '',
      valueRadio: '',
      visibility: 'CPF',
      softKeyboard: false,
      inputKeyboard: '',
      focusInputList: [],
      indexFocusedInput: 0,
      focusedInput: ''
    }
  },
  mounted () {
    this.focusInputList = Object.keys(this.$refs)
    this.focusedInput = 'idAttendance'
  },
  methods: {
    nextInput () {
      let numInputs = this.focusInputList.length
      this.indexFocusedInput = (++this.indexFocusedInput)%numInputs
      this.focusedInput = this.focusInputList[this.indexFocusedInput]
    },
    previousInput () {
      let numInputs = this.focusInputList.length
      this.indexFocusedInput = (--this.indexFocusedInput)%numInputs
      this.focusedInput = this.focusInputList[this.indexFocusedInput]
      console.log(this.focusedInput)
    },
    enter () {
      
    },
    backspace () {
      let currentValue = this.patient[this.focusInputList[this.indexFocusedInput]]
      let length = currentValue.length
      this.patient[this.focusInputList] = currentValue.slice(0, length - 1)
    },
    goRight () {

    },
    goLeft () {

    },
    space () {

    },
    keepFocus () { 

    },
    write (e) {
      console.log('oi', e)
      this.focusedInput = this.focusInputList[this.indexFocusedInput]
      //this.$refs[this.focusedInput].focus({target: { name: this.focusedInput }})
      // this.$refs[this.focusedInput].select()
      this.patient[this.focusedInput] += e.target.value
    },
    focusInput (e) {
     
      this.focusedInput = e.target.name
    },
    radio (value) {
      this.valueRadio = value
    },
    group (value) {
     
      this.visibility = value
    },
    displayKeyboard () {
      this.softKeyboard = !this.softKeyboard
      if (this.softKeyboard) {
        
      }
    },
    displayHelpToLogin () {
      this.$emit('helptologin', true)
    }
  }  
}
</script>
<style lang="sass" scoped>
.login-patient
  background-color: white
  width: 100%
.login-p-form
  display: flex
  flex-direction: column
  padding: 20px
.login-patient__softkeyboard
  width: 100%
  align-self: flex-start
.login-p-input-att,
.login-p-pass,
.login-p-cpf
  margin: 7px 0
.login-p-buttons
  display: flex
  flex-direction: row
  width: 100%
.radio-input
  width: 100%
.login-p-radio
  margin-bottom: 20px
.doubt-keyboard
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: baseline
.doubt-keyboard small
  color: rgb(52, 181, 131)
  margin: 20px 0
  cursor: pointer
  text-decoration: underline
</style>