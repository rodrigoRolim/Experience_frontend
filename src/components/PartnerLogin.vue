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
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
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
        />
      </div>
      <div class="partner-login__password">
        <code-label
          bind="partnerPassword"
          label="Senha"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
         <code-input-password
          id="partnerPassword"
          name="partnerPassword"
          v-model="partner.password"
          :width="7"
          :height="9"
          icon="lock"
          color="#333"
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
/* import CodeTooltip from './base/CodeTooltip' */

export default {
  name: 'LoginPatient',
  components: {
    CodeButton,
    CodeInput,
    CodeInputPassword,
    CodeLabel,
   /*  CodeTooltip */
  },
  data () {
    return {
      partner: {
        code: '',
        password: ''
      }
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

