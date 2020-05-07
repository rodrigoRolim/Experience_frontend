<template>
  <div class="user_perfil" @mouseleave="show = false" id="user__perfil">
    <div class="user_perfil__button">
      <button @mouseenter="show = true" @click="show = true" class="button_perfil">
        <div class="perfil_info">
          <code-info
            left
            icon="user"
            info="rodrigo rolim veras"
            size="lg"
            color="lightslategray"
          />
          <!-- <span class="perfil_info__name">rodrigo rolim veras</span>
          <span class="perfil_info__date">17/06/1992</span> -->
        </div>
        <i class="perfil_info__icon">
          <transition name="fade" mode="out-in">
            <font-awesome-icon icon="caret-down" size="lg" v-if="!show" key="down"/>
            <font-awesome-icon icon="caret-up" size="lg" v-if="show" key="up"/>
          </transition>
        </i>
      </button>
    </div>
    <transition name="fade" mode="in-out">
      <div class="perfil__content" v-if="show">
        <div class="perfil__content__user-info">
          <span class="perfil__content__user-info__date">17/06/1992</span>
        </div>
        <div class="perfil__content__pass" @click="enableModal"> 
          <i><font-awesome-icon icon="user-edit" :style="{color: 'gray'}"/></i>
          <span class="perfil__content__pass__change">alterar senha</span>
        </div>
        <div class="perfil__content__logout">
          <i><font-awesome-icon icon="sign-out-alt" :style="{color: 'gray'}"/></i>
          <span class="perfil__content__logout__out">sair</span>
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
.button_perfil
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
    padding: 0 2vh
    display: flex
   
.perfil__content__user-info__date
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  font-size: 12px
  border-bottom: 1px solid lightgray
  min-height: 50px
.perfil_info
  display: flex
  flex-direction: row
  justify-content: center
.perfil_info__icon
  color: lightslategray
  margin-left: 13px
.perfil__content
  right: 100px
  position: absolute
  background-color: white
  border: 1px solid lightgray
  border-radius: 4px
  display: flex
  flex-direction: column
  box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.02)
.perfil__content__pass,
.perfil__content__logout 
  padding: 10px 14px 
  cursor: pointer
.perfil__content__pass:hover,
.perfil__content__logout:hover
  background-color: rgba(0,0,0,0.1) 
.perfil__content__pass__change,
.perfil__content__logout__out
  font-size: 13px
  text-transform: capitalize
  color: rgba(0,0,0,0.8)
  margin-left: 10px
.user_perfil__button
  margin-bottom: 0px
.button__perfil
  padding: 0
.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
  opacity: 0
</style>