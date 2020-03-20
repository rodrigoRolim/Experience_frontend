<template>
  <div class="login-patient">
    <form class="login-p-form">
      <div class="login-p-input-att">
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
          v-model="value"
        >
          <template v-slot:icon>
            <font-awesome-icon icon="user" :style="{ color: '#676a6c' }"></font-awesome-icon>
          </template>
        </code-input>
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
        >
          <template v-slot:icon>
            <font-awesome-icon icon="lock" :style="{ color: '#676a6c' }"></font-awesome-icon>
          </template>
        </code-input>
      </div>
      <div class="login-p-buttons">
        <code-button
          padding="6px 0"
          text="acessar"
          bcolor="#34b583"
          color="white"
          @click="submit"
        ></code-button>
      </div>  
      
    </form>
  </div>
</template>
<script>
import CodeInput from './base/CodeInput'
import CodeButton from './base/CodeButton'
import CodeLabel from './base/CodeLabel'
export default {
  name: 'LoginPatient',
  components: {
    CodeButton,
    CodeInput,
    CodeLabel
  }  
}
</script>
<style lang="sass" scoped>
.login-patient
  width: 100%
  background-color: white
.login-p-form
  display: flex
  flex-direction: column
  padding: 20px
.login-p-input-att,
.login-p-pass
  margin: 7px 0
.login-p-buttons
  display: flex
  flex-direction: row
  width: 100%
  margin-top: 50px
</style>