<template>
  <div class="login-patient" id="merda">
    <form class="login-patient__form">
      <div class="login-patient__radio-buttons" v-if="!softKeyboard">
        <code-group-radios :receive="valueRadio" @group="group">
          <template v-slot:header>
            <p class="login-patient__radios-title">Acessar como:</p>
          </template>
          <template v-slot:radios>
            <code-radio
              name="login"
              value="ID"
              label="Atendimento Único"
              @radio="radio"
              identifier="id"
              :visible="visibility"
            ></code-radio>
            <code-radio
              name="login"
              value="CPF"
              label="Histórico de Resultados"
              @radio="radio"
              identifier="cpf"
              :visible="visibility"
            ></code-radio>
          </template> 
        </code-group-radios>
      </div>
      <div class="login-patient__cpf" v-if="visibility !== 'ID'">
        <code-input
          placeholder="CPF"
          label="cpf"
          name="cpf"
          type="text"
          required
          v-model="cpf"
          color="#333"
          icon="user"
          :error="validate.cpf"
          @enter="confirm"
        />
      </div>
      <div class="login-patient__birthday" v-if="visibility !== 'ID'">
         <code-calendar
            class="calendars__calendar"
            v-model="birthDay"
            label="data nascimento"
            name="begin"
            icon="birthday-cake" 
            placeholder="data de nascimento"
            :error="validate.nascimento"
            @enter="confirm"
         />

      </div>
      <div class="login-patient__attendance" v-else>
        <code-input
          ref="atendimento"
          placeholder="ID Atendimento"
          label="atendimento"
          label-color="default"
          name="atendimento"
          type="text"
          required
          v-model="idAttendance"
          :focused="focusedInput == 'atendimento'"
          @focus="focusInput"
          @enter="confirm"
          color="#333"
          icon="user"
          :error="validate.atendimento"
        />
      </div>
      <div class="login-patient__password">
        <code-input-password
          ref="senha"
          name="senha"
          id="patient-password"
          label="senha"
          icon="lock"
          @focus="focusInput"
          @enter="confirm"
          v-model="password"
          :focused="focusedInput == 'senha'"
          :error="validate.senha"
        />
      </div>
      <div class="login-patient__actions">
        <small class="login-patient__keyboard">
          <i v-if="visibility === 'ID'" @click="displayKeyboard" class="keyboard__icon">
            <font-awesome-icon icon="keyboard" size="lg"/>
          </i>
        </small>
       <!--  <code-tooltip
          text="Clique aqui"
        >
          <template> -->
            <small class="login-patient__doubt" @click="displayHelpToLogin">duvidas <i><font-awesome-icon icon="question-circle"/></i></small>
         <!--  </template> -->
      <!--   </code-tooltip>  -->
      </div>
      <div class="login-patient__buttons">
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
          @click.prevent.stop="confirm"
          :disabled="authState == 'loading'"
        ></code-button>
      </div>
    </form>
    <div class="login-patient__softkeyboard">
      <keyboard-self-service
        @write="write"
        @nextInput="nextInput"
        @previousInput="previousInput"
        @confirm="confirm"
        @backspace="backspace"
        @right="goRight"
        @left="goLeft"
        @space="space"
        :show="softKeyboard"
        :input="inputKeyboard"
        @close="hiddenSoftKeyboard" 
      />  
    </div>
  </div>
</template>
<script>
import CodeInput from './base/CodeInput'
import CodeButton from './base/CodeButton'
import CodeCalendar from './base/CodeCalendar'
import CodeRadio from './base/CodeRadio'
//import CodeTooltip from './base/CodeTooltip'
import CodeGroupRadios from './base/CodeGroupRadios'
import CodeInputPassword from './base/CodeInputPassword'
import keyboardSelfService from './KeyboardSelfService'
import { required, min, date, cpfValide, areAllInputsEmpty } from '../mixins/validations/rules'
import { validator } from '../mixins/validations/validator'
import { cpf, identifier } from '../mixins/masks'
import { login } from '../mixins/login';
import { httpMessage } from '../utils/statusMessages'
import {
  NAMESPACED_AUTH, 
  AUTH_REQUEST, 
  ATTENDANCE_AUTH,
  PATIENT_AUTH,
  PATIENT_TYPE, 
  PATIENT_ROUTE, 
  REQUIRED_INPUT,
  INCOMPLETE_ID,
  INCOMPLETE_CPF,
  INVALID_DATA
} from '../utils/alias'
import { mapActions } from 'vuex'
export default {
  name: 'LoginPatient',
  mixins: [validator({required, min, date, cpfValide, areAllInputsEmpty }), cpf, identifier, login],
  props: {
    digit: String
  },
  components: {
    CodeButton,
    CodeInput,
    CodeCalendar,
    CodeRadio,
    CodeGroupRadios,
    CodeInputPassword,
    keyboardSelfService
  },
  data () {
    return {
      patient: {
        cpf: '',
        nascimento: '',
        atendimento: '',
        posto: '',
        senha: ''
      },
      code: '',
      validate: {
        cpf: '',
        nascimento: '',
        atendimento: '',
        posto: '',
        senha: ''
      },
      receive: '',
      valueRadio: '',
      visibility: 'ID',
      softKeyboard: false,
      inputKeyboard: '',
      focusInputList: [],
      indexFocusedInput: 0,
      focusedInput: '',
      caretPosition: 0,
      keyboardActive: false,
      focusedElement: null
    }
  },
  created () {
    
    this.focusInputList = ['atendimento', 'senha']
  },
  mounted () {
    this.focusedInput = 'atendimento'
  },
  computed: {
    cpf: {
      get () {
        return this.patient.cpf
      },
      set (value) {
        this.patient.cpf = value
      }
    },
    identifier: {
      get () {
        return this.code
      },
      set (value) {
        let arrIdentifier = this.splitIdAttendance(value)
        this.attendance = arrIdentifier[1]
        this.healthCenter = this.getNumberHealthCenter(arrIdentifier[0])
        this.code = value
      }
    },
    birthDay: {
      get () {
        return this.patient.nascimento
      },
      set (value) {
        this.patient.nascimento = this.formatterDate(value)
      }
    },
    idAttendance: {
      get () {
        return this.identifier
      },
      set (value) {
        this.identifier = value
      }
    },
    attendance: {
      get() {
        return this.patient.atendimento
      },
      set(value) {
        this.patient.atendimento = value
      }
    },
    healthCenter: {
      get() {
        return this.patient.posto
      },
      set(value) {
        this.patient.posto = value
      }
    },
    password: {
      get() {
        return this.patient.senha
      },
      set(value) {
        this.patient.senha = value
      }
    },
    getCredentials() {
      
      let { patient } = this
      
      if (this.visibility === 'CPF') {
        return Object.assign({
          cpf: patient.cpf.replace(/\s/g, ''), 
          nascimento: patient.nascimento.replace(/\s/g, ''), 
          senha: patient.senha
        })
      }

      return Object.assign({
        atendimento: patient.atendimento, 
        posto: patient.posto, 
        senha: patient.senha
      })
    },
    validator() {
      if (this.visibility === 'CPF') {
        return (
          this.validate.cpf !== '' || 
          this.validate.nascimento !== '' || 
          this.validate.senha !== '')
      }
      return (  
        this.validate.atendimento !== '' || 
        this.validate.posto !== '' ||
        this.validate.senha !== ''
      )
    },
  },
  watch: {
    
    visibility () {

      this.patient.cpf = ''
      this.patient.nascimento = ''
      this.idAttendance = ''
      this.patient.posto = ''
      //this.patient.senha = ''

      this.validate.cpf = ''
      this.validate.nascimento = ''
      this.validate.atendimento = ''
      this.validate.posto = ''
      this.validate.senha = ''

    },
    softKeyboard(value) {

      if (!value) {
        this.focusedInput = ''
      }
    },
    cpf(value) {
 
      if (this.required(value)) {
        this.validate.cpf = REQUIRED_INPUT
      } else if (this.cpfValide(value, /[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/g)){
        this.validate.cpf = INCOMPLETE_CPF
      } else {
        this.validate.cpf = ''
      }
    },
    birthDay(value) {

      if (this.required(value)) {
        this.validate.nascimento = REQUIRED_INPUT
        //eslint-disable-next-line
      } else if (!this.date(value, /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g)){
        this.validate.nascimento = INVALID_DATA
      } else {
        this.validate.nascimento = ''
      }
    },
    idAttendance(value) {
      
      const mask = JSON.parse(localStorage.getItem('custom-access')).mask
      const hcSize = +mask.split(':')[0]
      const attSize = +mask.split(':')[1] + hcSize + 3

      if (this.required(value)) {
        this.validate.atendimento = REQUIRED_INPUT
      } else if (this.min(value, attSize)) {
        this.validate.atendimento = INCOMPLETE_ID
      } else {
        this.validate.atendimento = ''
      }
    },
    password (value) {
      if (this.required(value)) {
        this.validate.senha = REQUIRED_INPUT
      } else {
        this.validate.senha = ''
      } 
    }
  },
  methods: {
    ...mapActions (NAMESPACED_AUTH, {
      login: AUTH_REQUEST
    }),
    hiddenSoftKeyboard () {

      this.softKeyboard = false
      this.keyboardActive = false
      this.$emit('keyboardActivated', this.keyboardActive)
    },
    inputModel (e) {

      this.patient.atendimento = e.target.value
    },
    nextInput () {

      let numInputs = this.focusInputList.length
      this.indexFocusedInput = (++this.indexFocusedInput)%numInputs
      this.focusedInput = this.focusInputList[this.indexFocusedInput]
    },
    previousInput () {

      let numInputs = this.focusInputList.length
      this.indexFocusedInput = -(--this.indexFocusedInput)%numInputs
      this.focusedInput = this.focusInputList[this.indexFocusedInput]
    },

    checkFormInputs() {
      let fields = Object.keys(this.patient).filter(el => this.patient[el] === '')

      if (this.visibility == 'CPF') {
   
        fields = fields.filter(el => el == 'cpf' || el == 'nascimento' || el == 'senha')
        return this.areAllInputsEmpty(fields, this.validate, REQUIRED_INPUT)
      }

      fields = fields.filter(el => !(el == 'cpf' || el == 'nascimento'))
      return this.areAllInputsEmpty(fields, this.validate, REQUIRED_INPUT)
      
    },
    confirm () {
      
      //e.preventDefault()

      let hasInputsEmpty = this.checkFormInputs()

      if (!hasInputsEmpty && this.authState !== 'loading' && !this.validator) {
        
        this.realizeLogin ()
        return
      }
      if (hasInputsEmpty || this.validator) {
        this.error(httpMessage({ status: 111 }))
      }

    },
    splitIdAttendance (idAttendance) {
      return idAttendance.split('/').map(item => item.trim())
    },
    getNumberHealthCenter (healthCenter) {
      return healthCenter.replace(/^[0]{1,2}/g, '')
    },
    formatterDate (date) {
      return date.replace(/\s/g, '')
    },
    realizeLogin () {
      this.showLoader = true
      this.$emit('loading', true)

      this.login({ 
          url: (this.visibility === 'CPF') ? PATIENT_AUTH : ATTENDANCE_AUTH,
          uniqueAttendance: !(this.visibility === 'CPF'),
          credentials: this.getCredentials,
          typeUser: PATIENT_TYPE
        })
        .then((resp) => {
          this.success(resp.status, PATIENT_ROUTE)
        })
        .catch(() => {
          this.error() 
          this.$emit('loading', false)
        })
        
    },
    
    backspace () {

      const caretPosition = this.getCaretPosition()
     
      let currentValue = (this.indexFocusedInput === 0)? this.idAttendance : 
        this.patient[this.focusInputList[this.indexFocusedInput]];
      
      const newValue = this.deleteChar(currentValue, caretPosition - 1);
      
      if (this.indexFocusedInput === 0) {
        this.idAttendance = newValue
      } else {
        this.patient[this.focusInputList[this.indexFocusedInput]] = newValue;
      }
      
      this.updateCurrentInput(newValue);
      let inputElement = this.focusedElement;
      this.setCaretPosition(inputElement, caretPosition - 1);
    },
    deleteChar (str, pos) {

      let arrStr = str.split('');
      arrStr[pos] = '';
      return arrStr.join('');
    },
    insertChar (str, pos, char) {

      return str.substr(0, pos) + char + str.substr(pos, str.length)
    },
    getCaretPosition () {

      let el = this.focusedElement;
      if (el.selectionStart) {
        return el.selectionStart;
      } else if (document.selection) {
        el.focus();
        var r =  document.selection.createRange();
        if (r == null) {
          return 0;
        }

        let rangeElement = el.target.createTextRange(),
            rangeCopy = rangeElement.duplicate();
        rangeElement.moveToBookmark(r.getBookmark());
        rangeCopy.setEndPoint('EndToStart', rangeElement);

        return rangeCopy.text.length;
      }
      return 0
    },
    updateCurrentInput (newValue) {

      this.focusedElement.value = newValue;
    },
    goRight () {

      this.caretPosition = this.getCaretPosition()
      let positionRightLimit = this.patient[this.focusedInput].length;
      let inputElement = this.focusedElement
      if (this.caretPosition < positionRightLimit) {
        this.caretPosition++; 
      }
      this.setCaretPosition(inputElement, this.caretPosition);

    },
    goLeft () {

      this.caretPosition = this.getCaretPosition()
      let positionLeftLimit = 0
      let inputElement = this.focusedElement
     
      if (this.caretPosition > positionLeftLimit) {
        this.caretPosition--;
      }
      this.setCaretPosition(inputElement, this.caretPosition)
    },
    space () {

      let e = Object.assign({ target: { value: ' ' } })
      this.write(e)
    },
    setCaretPosition (el, pos) {

      if (el.setSelectionRange) {  
        el.focus();
        el.setSelectionRange(pos,pos);
      } else if (el.createTextRange) {
        var range = el.createTextRange();
        range.moveStart('Character', pos);
        range.select();
      }
    },
    write (e) {
 
      this.indexFocusedInput = this.focusInputList.indexOf(this.focusedInput)
      let currentPositionCursor = this.getCaretPosition()
      if (this.focusedInput === 'atendimento') {
        this.idAttendance = this.insertChar(this.idAttendance, currentPositionCursor, e.target.value);
      } else {
        this.patient[this.focusedInput] = this.insertChar(this.patient[this.focusedInput], currentPositionCursor, e.target.value);
      }
      this.updateCurrentInput(this.patient[this.focusedInput])
      let inputElement = this.focusedElement
      this.setCaretPosition(inputElement, currentPositionCursor + 1)
    },
    focusInput (e) {
      this.focusedElement = e.target
      this.indexFocusedInput = this.focusInputList.indexOf(e.target.name);
      this.focusedInput = e.target.name;
    },
    radio (value) {

      this.valueRadio = value
    },
    group (value) {
      this.visibility = value
    },
    displayKeyboard () {
     
      this.focusedInput = this.focusInputList[this.indexFocusedInput]
      this.softKeyboard = !this.softKeyboard
      if (this.softKeyboard) {
        this.focusedInput = 'atendimento'
      }
      this.keyboardActive = !this.keyboardActive
      this.$emit('keyboardActivated', this.keyboardActive)
    },
    displayHelpToLogin () {

      this.$emit('modalHelp', true)
    }
  }  
}
</script>
<style lang="sass" scoped>
@import "../styles/__themes"
.login-patient
  width: 100%
.login-patient__form
  display: flex
  flex-direction: column
  padding: 20px
.login-patient__softkeyboard
  width: 100%
  align-self: flex-start
.login-patient__attendance,
.login-patient__password,
.login-patient__cpf,
.login-patient__birthday
  margin: 7px 0
.login-patient__buttons
  display: flex
  flex-direction: row
  width: 100%
.radio-input
  width: 100%
.login-patient__radio-buttons
  margin-bottom: 20px
.login-patient__actions
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: baseline
.login-patient__keyboard,
.login-patient__doubt
  color: $color__default
  margin: 20px 0
  cursor: pointer
.login-patient__doubt:hover
  text-decoration: underline
.keyboard__icon
  @include respond-to(handhelds)
    display: none
.login-patient__radios-title
  margin: 7px 0
  padding: 0
  font-weight: 600
  font-size: 0.80rem
  color: #676a6c
</style>