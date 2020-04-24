<template>
  <div class="login-healthcare">
    <form class="login-hc-form">
      <div class="login-hc-cpf">
        <code-label
          bind="user"
          label="Usuário"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
         ></code-label>
        <code-input
          placeholder="Usuário"
          :hasIcon="true"
          name="user"
          type="text"
          :width="9"
          :height="7"
          :weight="400"
          color="#333"
          icon="user"
        /> 
      </div>
      <div class="login-hc-pass">
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
      <div class="login-hc-healthcares">
        <code-label
          bind="healthcares"
          label="Posto"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <code-select
          :options="list"
          option="Selecione um posto"
          size="0.9rem"
          name="healthcares"
          :hasIcon="true"
          :width="9"
          :height="7"
        >
          <template v-slot:icon>
            <font-awesome-icon icon="clinic-medical" :style="{ color: '#676a6c' }"></font-awesome-icon>
          </template>
        </code-select>
      </div>
      <div class="ctrl-hc">
        <!-- <small class="keyboard"><i><font-awesome-icon icon="keyboard" size="lg"/></i></small> -->
        <code-tooltip
          text="Clique aqui"
        >
          <template>
            <small>duvidas <i><font-awesome-icon icon="question-circle"/></i></small>
          </template>
        </code-tooltip> 
      </div>
      <div class="login-hc-buttons">
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
import CodeSelect from './base/CodeSelect'
export default {
  name: 'LoginPatient',
  components: {
    CodeButton,
    CodeInput,
    CodeLabel,
    CodeTooltip,
    CodeSelect
  },
  data () {
    return {
      list: [
        { id: 1, item: 'fake news'},
        { id: 2, item: 'fake news'},
        { id: 3, item: 'fake news'},
        { id: 4, item: 'fake news'},
        { id: 5, item: 'fake news'},
        { id: 6, item: 'fake news'},
        { id: 7, item: 'fake news'},
      ]
    }
  },
  methods: {
   
  }  
}
</script>
<style lang="sass" scoped>
.login-partner
  background-color: white
.login-hc-form
  display: flex
  flex-direction: column
  padding: 20px
.login-hc-input-att,
.login-hc-pass,
.login-hc-cpf,
.login-hc-healthcares
  margin: 7px 0
.login-hc-buttons
  display: flex
  flex-direction: row
  width: 100%
.radio-input
  width: 100%
.login-hc-radio
  margin-bottom: 20px
.ctrl-hc
  display: flex
  flex-direction: row
  justify-content: flex-end
  align-items: baseline
  margin: 20px 0
.ctrl-hc small
  color: rgb(52, 181, 131)
  cursor: pointer
</style>

