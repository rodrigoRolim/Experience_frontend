<template>
  <div class="login-partner">
    <form class="login-pr-form">
      <div class="login-pr-cpf">
        <code-label
          bind="cpf"
          label="Código Parceiro"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <code-input
          placeholder="Código do parceiro"
          :hasIcon="true"
          name="cpf"
          type="text"
          required
          :width="9"
          :height="7"
          :weight="500"
          color="#333"
          icon="handshake"
        />
      </div>
      <div class="login-pr-pass">
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
          :width="9"
          :height="7"
          icon="lock"
        />
      </div>
      <div class="ctrl-pr">
        <!-- <small class="keyboard"><i><font-awesome-icon icon="keyboard" size="lg"/></i></small> -->
        <code-tooltip
          text="Clique aqui"
        >
          <template>
            <small>duvidas <i><font-awesome-icon icon="question-circle"/></i></small>
          </template>
        </code-tooltip> 
      </div>
      <div class="login-pr-buttons">
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
import CodeTooltip from './base/CodeTooltip'

export default {
  name: 'LoginPatient',
  components: {
    CodeButton,
    CodeInput,
    CodeLabel,
    CodeTooltip
  },
  data () {
    return {
      //-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?
    }
  },
  methods: {
   
  }  
}
</script>
<style lang="sass" scoped>
.login-partner
  background-color: white
.login-pr-form
  display: flex
  flex-direction: column
  padding: 20px
.login-pr-input-att,
.login-pr-pass,
.login-pr-cpf
  margin: 7px 0
.login-pr-buttons
  display: flex
  flex-direction: row
  width: 100%
.radio-input
  width: 100%
.login-pr-radio
  margin-bottom: 20px
.ctrl-pr
  display: flex
  flex-direction: row
  justify-content: flex-end
  align-items: baseline
  margin: 20px 0
.ctrl-pr small
  color: rgb(52, 181, 131)
  cursor: pointer
</style>

