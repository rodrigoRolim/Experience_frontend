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
              class="radio-input"
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
          :hasIcon="true"
          name="cpf"
          type="text"
          required
          v-model="value"
          :width="9"
          :height="7"
          :weight="500"
          color="#333"
          icon="user"
        />
      </div>
      <div class="login-p-birthday" v-if="visibility == 'ID'">
         <code-label
          bind="cpf"
          label="Data nascimento"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
         ></code-label>
        <code-input
          placeholder="Data de nascimento"
          :hasIcon="true"
          name="cpf"
          type="text"
          required
          v-model="value"
          :width="9"
          :height="7"
          :weight="500"
          color="#333"
          icon="user"
        />
      </div>
      <div class="login-p-input-att" v-else>
         <code-label
          bind="attendance"
          label="Atendimento"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
         ></code-label>
        <code-input
          placeholder="ID"
          :hasIcon="true"
          name="attendance"
          type="text"
          required
          v-model="digit"
          :width="9"
          :height="7"
          :weight="600"
          color="#333"
          icon="user"
        />
      </div>
      <div class="login-p-pass">
        <code-label
          bind="password"
          label="Senha"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <code-input
          placeholder="Senha"
          :hasIcon="true"
          name="password"
          type="password"
          required
          v-model="value"
          :width="9"
          :height="7"
          icon="lock"
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
  </div>
</template>
<script>
import CodeInput from './base/CodeInput'
import CodeButton from './base/CodeButton'
import CodeLabel from './base/CodeLabel'
import CodeRadio from './base/CodeRadio'
import CodeTooltip from './base/CodeTooltip'
import CodeGroupRadios from './base/CodeGroupRadios'

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
    CodeGroupRadios
  },
  data () {
    return {
      receive: '',
      value: '',
      valueRadio: '',
      visibility: 'CPF'
    }
  },
  methods: {
    radio (value) {
      this.valueRadio = value
    },
    group (value) {
      console.log(value)
      this.visibility = value
    },
    displayKeyboard () {
      this.$emit('keyboard', true)
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