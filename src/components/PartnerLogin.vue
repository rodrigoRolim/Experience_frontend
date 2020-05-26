<template>
  <div class="partner-login">
    <form class="partner-login__form">
      <div class="partner-login__cpf">
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
      <div class="partner-login__password">
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
      <div class="partner-login__utilities">
        <!-- <small class="keyboard"><i><font-awesome-icon icon="keyboard" size="lg"/></i></small> -->
        <code-tooltip
          text="Clique aqui"
        >
          <template>
            <small class="partner-login__doubt">duvidas <i><font-awesome-icon icon="question-circle"/></i></small>
          </template>
        </code-tooltip> 
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
.partner-login
  width: 100%
.partner-login__form
  display: flex
  flex-direction: column
  padding: 20px
.partner-login__password,
.partner-login__cpf
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

