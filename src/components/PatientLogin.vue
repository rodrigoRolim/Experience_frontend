<template>
  <div class="login-patient">
    <form class="login-patient__form">
      <div class="login-patient__radio-buttons" v-if="!softKeyboard">
        <code-group-radios :receive="valueRadio" @group="group">
          <template v-slot:header>
            <p class="login-patient__radios-title">Acessar como:</p>
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
      <div class="login-patient__cpf" v-if="visibility == 'ID'">
        <code-label
          bind="cpf"
          label="Cpf"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
         ></code-label>
        <code-input
          placeholder="CPF"
          name="cpf"
          type="text"
          required
          v-model="patient.cpf"
          :width="7"
          :height="9"
          :weight="500"
          color="#333"
          icon="user"
          :error="validate.cpf"
        />
      </div>
      <div class="login-patient__birthday" v-if="visibility == 'ID'">
         <code-label
          bind="birthDay"
          label="Data nascimento"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
         ></code-label>
        <code-input
          placeholder="Data de nascimento"
          name="birthDay"
          type="text"
          v-model="patient.birthDay"
          :width="7"
          :height="9"
          :weight="500"
          color="#333"
          icon="user"
          :error="validate.birthDay"
        />
      </div>
      <div class="login-patient__attendance" v-else>
        <code-label
          bind="idAttendance"
          label="Atendimento"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
         ></code-label>
        <code-input
          ref="idAttendance"
          placeholder="ID Atendimento"
          name="idAttendance"
          type="text"
          required
          v-model="patient.idAttendance"
          :focused="focusedInput == 'idAttendance'"
          @focus="focusInput"
          :width="7"
          :height="9"
          :weight="600"
          color="#333"
          icon="user"
          :error="validate.idAttendance"
        />
      </div>
      <div class="login-patient__password">
        <code-label
          bind="patient-password"
          label="Senha"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
        ></code-label>
        <code-input-password
          ref="password"
          name="password"
          id="patient-password"
          :width="7"
          :height="9"
          icon="lock"
          @focus="focusInput"
          v-model="patient.password"
          :focused="focusedInput == 'password'"
          :error="validate.password"
        />
      </div>
      <div class="login-patient__actions">
        <small class="login-patient__keyboard">
          <i v-if="visibility !== 'ID'" @click="displayKeyboard" class="keyboard__icon">
            <font-awesome-icon icon="keyboard" size="lg"/>
          </i>
        </small>
        <code-tooltip
          text="Clique aqui"
        >
          <template>
            <small class="login-patient__doubt" @click="displayHelpToLogin">duvidas <i><font-awesome-icon icon="question-circle"/></i></small>
          </template>
        </code-tooltip> 
      </div>
      <div class="login-patient__buttons">
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
import CodeLabel from './base/CodeLabel'
import CodeRadio from './base/CodeRadio'
import CodeTooltip from './base/CodeTooltip'
import CodeGroupRadios from './base/CodeGroupRadios'
import CodeInputPassword from './base/CodeInputPassword'
import keyboardSelfService from './KeyboardSelfService'
import { required } from '../mixins/validations/rules'
import { validator } from '../mixins/validations/validator'
export default {
  name: 'LoginPatient',
  mixins: [validator({required})],
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
      validate: {
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
      focusedInput: '',
      caretPosition: 0,
      keyboardActive: false,
      focusedElement: null
    }
  },
  mounted () {
    this.focusInputList = Object.keys(this.$refs)
  },
  computed: {
    cpf () {
      return this.patient.cpf
    },
    birthDay () {
      return this.patient.birthDay
    },
    idAttendance () {
      return this.patient.idAttendance
    },
    password () {
      return this.patient.password
    }
  },
  watch: {
    visibility () {
      this.validate.cpf = ''
      this.validate.birthDay = ''
      this.validate.idAttendance = ''
      this.validate.password = ''
    },
    softKeyboard (value) {

      if (!value) {
        this.focusedInput = ''
      }
    },
    cpf (value) {
      if (this.required(value)) {
        this.validate.cpf = 'campo obrigatório'
      } else {
        this.validate.cpf = ''
      }
    },
    birthDay (value) {
      if (this.required(value)) {
        this.validate.birthDay = 'campo obrigatório'
      } else {
        this.validate.birthDay = ''
      }
    },
    idAttendance (value) {
      if (this.required(value)) {
        this.validate.idAttendance = 'campo obrigatório'
      } else {
        this.validate.idAttendance = ''
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
    hiddenSoftKeyboard () {

      this.softKeyboard = false
      this.keyboardActive = false
      this.$emit('keyboardActivated', this.keyboardActive)
    },
    inputModel (e) {

      this.patient.idAttendance = e.target.value
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
    validateAll () {
      let fields = Object.keys(this.patient).filter(el => this.patient[el] == '')
      if (this.visibility !== 'ID') {
        fields = fields.filter(el => el !== 'cpf' && el !== 'birthDay')
      }
      fields.forEach(element => {
        this.validate[element] = 'campo obrigatório'
      })
      return fields.length > 0
    },
    confirm () {
      let res = this.validateAll()
      this.messageValidation(res)
    },
    messageValidation (value) {
      this.$emit('error', {error: value, message: 'corrija ou preencha os campos abaixo'})
    },
    backspace () {

      const caretPosition = this.getCaretPosition()
     
      let currentValue = this.patient[this.focusInputList[this.indexFocusedInput]];
      const newValue = this.deleteChar(currentValue, caretPosition - 1);
      this.patient[this.focusInputList[this.indexFocusedInput]] = newValue;

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
     
      this.patient[this.focusedInput] = this.insertChar(this.patient[this.focusedInput], currentPositionCursor, e.target.value);
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
        this.$refs[this.focusedInput].$el.focus();
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
  color: rgb(52, 181, 131)
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