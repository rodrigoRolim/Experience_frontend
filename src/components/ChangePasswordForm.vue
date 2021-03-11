<template>
  <form class="change-password" @keypress.prevent.enter="confirm">
    <div class="change-password__header">
      <div class="change-password__name">
        Alterar Senha de acesso
      </div>
      <div class="change-password__close" @click="closeModal">
        <font-awesome-icon icon="times" size="lg" color="dimgray"/>
      </div>
    </div>
    <div class="change-password__body">
      <div class="change-password__message">
        <code-message
          v-if="show"
          message="senha inválida ou não combinantes"
          typeMessage="error"
          position="flex-start"
        >
          <template v-slot:icon>
            <font-awesome-icon icon="times-circle"></font-awesome-icon>
          </template>
        </code-message>
      </div>
      <div class="change-password__inputs">
        <div class="change-password__current-password">
          <code-input
            label="senha"
            placeholder="senha atual"
            :hasIcon="true"
            name="currentPassword"
            type="password"
            :width="9"
            :height="7"
            required
            icon="lock"
            color-icon="dimgray"
            v-model="currentPassword"
          />
        </div>
        <div class="change-password__new-password">
         
          <code-input
            label="nova senha"
            placeholder="nova senha"
            :hasIcon="true"
            name="newPassword"
            type="password"
            :width="9"
            :height="7"
            required
            icon="lock"
            color-icon="dimgray"
            v-model="newPassword"
          />
        </div>
        <div class="change-password__confirm-password">
          <code-input
            label="confirmar nova senha"
            placeholder="Confimar nova senha"
            :hasIcon="true"
            name="confirmPassword"
            type="password"
            :width="9"
            :height="7"
            required
            icon="lock"
            color-icon="dimgray"
            v-model="confirmPassword"
          />
        </div>
      </div>
      <div class="change-password__button">
        <code-button
          class="change-password__confirm"
          text="confirma"
          @click="confirm"
          borded
          bolded
          letters="uppercase"
          color="dark"
          size="lg"
          shading
          streched
        ></code-button>
      </div>
    </div>
  </form>  
</template>
<script>

import CodeInput from './base/CodeInput'
import CodeButton from './base/CodeButton'
import CodeMessage from './base/CodeMessage'
export default {
  name: 'ChangePasswordForm',
  components: {
    CodeInput,
    CodeButton,
    CodeMessage
  },
  
  computed: {

  },
  data () {
    return {
      show: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
    closeModal () {
      this.$emit('modal', false)
    },
    confirm () {
      if (this.currentPassword !== this.newPassword) {
        this.show = true
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.change-password
  display: flex
  flex-direction: column
  justify-content: center
  width: 550px
  background-color: white
  border-radius: 6px
  @include respond-to(handhelds)
    width: 95vw
    border-radius: 6px
.change-password__name
  color: gray
  align-self: center
  margin: 0 auto
.change-password__body
  display: flex
  flex-direction: column
  width: 100%
  padding: 6vh 20px
  @include respond-to(handhelds)
    justify-content: center
    
.change-password__current-password,
.change-password__new-password,
.change-password__confirm-password
  margin: 3vh 0
  width: 100%
.change-password__header
  background-color: white
  padding: 20px
  display: flex
  flex-direction: row
  justify-content: space-between
  border-bottom: 1px solid lightgray
  width: 100%
  border-top-left-radius: 6px
  border-top-right-radius: 6px
.change-password__button
  display: flex
  flex-direction: row
  justify-content: flex-end
  width: 100%
  @include respond-to(handhelds)
    justify-content: center
.change-password__confirm
  width: 25%
  @include respond-to(handhelds)
    width: 100%
    margin-top: 30px
</style>