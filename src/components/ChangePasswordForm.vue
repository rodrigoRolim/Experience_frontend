<template>
  <div class="change-password">
    <div class="header">
      <div class="header__name">
        Alterar Senha de acesso
      </div>
      <div class="header__close" @click="closeModal">
        <font-awesome-icon icon="times" size="lg" color="red"/>
      </div>
    </div>
    <div class="body">
      <div class="change-pass__message"></div>
      <div class="inputs">
        <div class="inputs__current-password">
          <code-label
            label="Senha atual"
            color="#676a6c"
            :fontWeight="600"
            fontSize=".9rem"
            bind="currentPassword"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-input
            label="currentPassword"
            placeholder="senha atual"
            :hasIcon="true"
            name="currentPassword"
            type="password"
            :width="9"
            :height="7"
            required
            v-model="currentPassword"
          >
            <template v-slot:icon>
              <font-awesome-icon icon="lock" :style="{ color: '#676a6c' }"></font-awesome-icon>
            </template>
          </code-input>
        </div>
        <div class="inputs__new-password">
          <code-label
            label="Nova senha"
            color="#676a6c"
            :fontWeight="600"
            fontSize=".9rem"
            bind="newPassword"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-input
            label="newPassword"
            placeholder="nova senha"
            :hasIcon="true"
            name="newPassword"
            type="password"
            :width="9"
            :height="7"
            required
            v-model="newPassword"
          >
            <template v-slot:icon>
              <font-awesome-icon icon="lock" :style="{ color: '#676a6c' }"></font-awesome-icon>
            </template>
          </code-input>
        </div>
        <div class="inputs__confirm-password">
          <code-label
            label="Confirmar nova senha"
            color="#676a6c"
            :fontWeight="600"
            fontSize=".9rem"
            bind="confirmPassword"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-input
            label="confirmPassword"
            placeholder="Confimar nova senha"
            :hasIcon="true"
            name="confirmPassword"
            type="password"
            :width="9"
            :height="7"
            required
            v-model="confirmPassword"
          >
            <template v-slot:icon>
              <font-awesome-icon icon="lock" :style="{ color: '#676a6c' }"></font-awesome-icon>
            </template>
          </code-input>
        </div>
      </div>
      <div class="button">
        <code-button
          class="button__confirm"
          padding="9px 0"
          text="confirmar"
          bcolor="dodgerblue"
          color="white"
        ></code-button>
      </div>
    </div>
  </div>  
</template>
<script>

import CodeInput from './base/CodeInput'
import CodeLabel from './base/CodeLabel'
import CodeButton from './base/CodeButton'
export default {
  name: 'ChangePasswordForm',
  components: {
    CodeInput,
    CodeLabel,
    CodeButton
  },
  
  computed: {

  },
  data () {
    return {
      show: true,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
    closeModal () {
      this.$emit('modal', false)
    }
  }
}
</script>
<style lang="sass" scoped>
.change-password
  display: flex
  flex-direction: column
  width: 550px
  background-color: white
  @include respond-to(handhelds)
    width: 100vw
    height: 100%
.header
  width: 100%
.header__name
  color: gray
  align-self: center
  margin: 0 auto
.body
  display: flex
  flex-direction: column
  width: 100%
  padding: 30px 20px
  @include respond-to(handhelds)
    justify-content: center
    
.inputs__current-password,
.inputs__new-password,
.inputs__confirm-password
  margin: 20px 0
  width: 100%
.header
  background-color: white
  padding: 20px
  display: flex
  flex-direction: row
  justify-content: space-between
  border-bottom: 1px solid lightgray
  width: 100%
.button
  display: flex
  flex-direction: row
  justify-content: flex-end
  width: 100%
  @include respond-to(handhelds)
   
.button__confirm
  width: 20%
  @include respond-to(handhelds)
    width: 100%
    margin-top: 30px
</style>