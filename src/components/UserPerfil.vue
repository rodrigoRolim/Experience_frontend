<template>
  <div class="user-perfil"  id="user-perfil" >
    <div class="user-perfil__button-wrap">
      <button class="user-perfil__button">
        <div class="user-perfil__user">
          <code-info
            left
            icon="user"
            size="lg"
            size-info="0.625rem"
            color="lightslategray"
            mobile-hidden
          />
        </div>
        <i class="user-perfil__icon">
          <transition name="fade" mode="out-in">
            <font-awesome-icon icon="caret-down" size="lg" v-if="!show" key="down" />
            <font-awesome-icon icon="caret-up" size="lg" v-if="show" key="up" />
          </transition>
        </i>
      </button>
    </div>
    <transition name="fade" mode="in-out">
      <div class="user-perfil__menu" v-show="show">
        <div class="user-perfil__user-info">
          <span class="user-perfil__name" v-if="userTypeAuthed === '0'">{{doctorName}}</span>
          <div class="user-perfil__plus">
            <code-info
              :icon="typeUserIcon"
              size="2x"
              :info="typeUser"
              :description="typeUserDescription"
              color="lightslategray"
            />
          </div>
        </div>
        <div class="user-perfil__change-password-wrap" @click="enableModal"> 
          <i><font-awesome-icon icon="user-edit" :style="{color: 'lightslategray'}"/></i>
          <span class="user-perfil__change-password">alterar senha</span>
        </div>
        <div class="user-perfil__logout-wrap" @click="realizeLogout">
          <i><font-awesome-icon icon="sign-out-alt" :style="{color: 'lightslategray'}"/></i>
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
    <code-modal
      class="user-perfil__load"
      :display="showLoadLogout"
    >
      <template v-slot:modal>
        <code-loading/>
      </template>
    </code-modal>
  </div>
</template>
<script>
import CodeModal from './base/CodeModal'
import CodeInfo from './base/CodeInfo'
import CodeLoading from './base/CodeLoading'
import ChangePasswordForm from './ChangePasswordForm'
import { logout } from '../mixins/logout'
import { mapGetters } from 'vuex'
import { NAMESPACED_AUTH } from '../utils/alias'
export default {
  name: 'UserPerfil',
  mixins: [logout],
  components: {
    ChangePasswordForm,
    CodeModal,
    CodeInfo,
    CodeLoading
  },
  data () {
    return {
      showModal: false,
      show: false
    }
  },
  mounted () {
    this.dropdownEvent()
  },
  computed: {
    ...mapGetters(NAMESPACED_AUTH, [
      'userName',
      'userId',
      'userTypeAuthed'
    ]),
    doctorName() {
      return 'Dr(a). ' + this.userName
    },
    typeUser () {

      if (this.userTypeAuthed !== '0') {
        return this.userName
      }
      return this.userId
    },
    typeUserIcon () {
      switch (this.userTypeAuthed) {
        case '0':
          return 'stethoscope'
        case '1' || '3' || '4': 
          return 'birthday-cake'
        case '2':
          return 'clinic-medical'
        case '5':
          return 'clinic-medical'
        default: 
          return ''
      }
    },
    typeUserDescription () {
      switch (this.userTypeAuthed) {
        case '0':
          return 'crm'
        case '1': 
          return 'paciente'
        case '2':
          return 'posto'
        case '3':
          return 'paciente'
        case '4':
          return 'paciente'
        case '5':
          return 'posto'
        default: 
          return ''
      }
    }
  },
  methods: {
    date (value) {
      const date = new Date(value).toLocaleDateString("pt-BR")
      return date !== "Invalid Date" ? date : ""
    },
    dropdownEvent () {
      document.addEventListener('click', this.openDropdown)
    },
    openDropdown (e) {
      
      if (e.target.closest('#user-perfil')) {
        this.show = true
      } else {
        this.show = false
      }
    },
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
  padding: 15px
  @include respond-to(handhelds)
    border: none
    background-color: transparent
.user-perfil__plus,
.user-perfil__name
  flex-direction: row
  justify-content: center
  align-items: center
  font-size: 12px
  letter-spacing: 0.5px
  border-bottom: 1px solid lightgray
  min-height: 50px
.user-perfil__plus
  display: flex
  padding: 10px 14px
.user-perfil__name
  display: flex
  padding: 0 10px
.user-perfil__user
  display: flex
  flex-direction: row
  justify-content: center
.user-perfil__icon
  color: lightslategray
  margin-left: 13px
.user-perfil__menu
  right: 30px
  @include respond-to(handhelds)
    right: 70px
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
.user-perfil__load
  z-index: 4
.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
  opacity: 0
</style>