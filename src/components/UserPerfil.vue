<template>
  <div class="user-perfil" @mouseleave="show = false" id="user__perfil">
    <div class="user-perfil__button-wrap">
      <button @mouseenter="show = true" @click="show = true" class="user-perfil__button">
        <div class="user-perfil__user">
          <code-info
            left
            icon="user"
            info="rodrigo rolim veras"
            size="lg"
            color="lightslategray"
          />
          <!-- <span class="user-perfil__user__name">rodrigo rolim veras</span>
          <span class="user-perfil__user__date">17/06/1992</span> -->
        </div>
        <i class="user-perfil__icon">
          <transition name="fade" mode="out-in">
            <font-awesome-icon icon="caret-down" size="lg" v-if="!show" key="down"/>
            <font-awesome-icon icon="caret-up" size="lg" v-if="show" key="up"/>
          </transition>
        </i>
      </button>
    </div>
    <transition name="fade" mode="in-out">
      <div class="user-perfil__menu" v-if="show">
        <div class="user-perfil__user-info">
          <span class="user-perfil__birthdate">17/06/1992</span>
        </div>
        <div class="user-perfil__change-password-wrap" @click="enableModal"> 
          <i><font-awesome-icon icon="user-edit" :style="{color: 'gray'}"/></i>
          <span class="user-perfil__change-password">alterar senha</span>
        </div>
        <div class="user-perfil__logout-wrap">
          <i><font-awesome-icon icon="sign-out-alt" :style="{color: 'gray'}"/></i>
          <span class="user-perfil__logout">sair</span>
        </div>
      </div>
    </transition>
    <code-modal
     
      :normal="true"
      :display="showModal"
      @display="showModal = $event"
    >
      <template v-slot:modal> 
        <change-password-form @modal="showModal = $event"/>
      </template>
    </code-modal>
  </div>
</template>
<script>
import CodeModal from './base/CodeModal'
import CodeInfo from './base/CodeInfo'
import ChangePasswordForm from './ChangePasswordForm'
export default {
  name: 'UserPerfil',
  components: {
    ChangePasswordForm,
    CodeModal,
    CodeInfo
  },
  data () {
    return {
      showModal: false,
      show: false
    }
  },
  mounted () {

  },
  methods: {
    enableModal () {
      this.showModal = true
      this.show = false
    }
  }
}
</script>
<style lang="sass" scoped>
.user-perfil__button
  position: relative
  display: flex
  flex-direction: row 
  justify-content: center
  align-items: center
  background-color: white
  border: 1px solid lightgray
  outline: none
  border-radius: 4px
  padding: 2vh
  @include respond-to(handhelds)
    border: none
    background-color: transparent
.user-perfil__birthdate
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  font-size: 12px
  border-bottom: 1px solid lightgray
  min-height: 50px
.user-perfil__user
  display: flex
  flex-direction: row
  justify-content: center
.user-perfil__icon
  color: lightslategray
  margin-left: 13px
.user-perfil__menu
  right: 100px
  position: absolute
  background-color: white
  border: 1px solid lightgray
  border-radius: 4px
  margin-top: 5px
  display: flex
  flex-direction: column
  box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.02)
.user-perfil__menu::after
  content: " "
  position: absolute
  border-width: 6px
  right: 5px
  top: -12px
  border-style: solid
  border-color: transparent transparent lightgray transparent
.user-perfil__change-password-wrap,
.user-perfil__logout-wrap
  padding: 10px 14px 
  cursor: pointer
.user-perfil__change-password-wrap:hover,
.user-perfil__logout-wrap:hover
  background-color: rgba(0,0,0,0.1) 
.user-perfil__change-password,
.user-perfil__logout
  font-size: 13px
  text-transform: capitalize
  color: rgba(0,0,0,0.8)
  margin-left: 10px
.user-perfil__button-wrap
  margin-bottom: 0px
.button__perfil
  padding: 0
.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
  opacity: 0
</style>