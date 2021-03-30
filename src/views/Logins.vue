<template>
  <div class="logins" id="login">
    <div class="logins__navbar" v-if="!fullscreenMode">
      <the-navbar logo="logo_cedro">
        <template v-slot:perfil>
          <div class="logins__menu">
            <code-button
              class="logins__manual"
              text="manuais"
              borded
              letters="uppercase"
              size="md"
              name-icon="book-medical"
              size-icon="lg"
              transparent
              @click="redirectToProcediments"
            />
          </div>
        </template>
      </the-navbar>
    </div>
    <transition name="slide-fade">
      <div class="logins__messages" v-if="messageToUser !== undefined">
        <code-message
          class="logins__message"
          :message="messageToUser.content"
          :type-message="messageToUser.type"
          position="center"
          icon="times-circle"
        />  
      </div>
    </transition>
    <div class="logins__main" :class="{ 'logins__main--unclickable': loading, 'logins_main--fullscreen': fullscreenMode }">
      <div class="logins__content" :class="{ 'logins__content--up': fullscreenMode }">
        <div class="logins__banner" >
          <laboratory-banner :fullscreenMode="!fullscreenMode"></laboratory-banner>
        </div>
        <div class="logins__menu-abas">
          <code-menu-abas>
            <template v-slot:header>
              <div @click="aba = 1" class="aba" :class="{ 'aba--active-aba': aba == 1 }">
                <code-info
                  icon="user"
                  info="paciente"
                  mobile-hidden
                />
              </div>
              <div v-if="!fullscreenMode" @click="aba = 2" class="aba" :class="{ 'aba--active-aba': aba == 2 }">
                 <code-info
                  icon="stethoscope"
                  info="médico"
                  mobile-hidden
                />
              </div>
              <div v-if="!fullscreenMode" @click="aba = 3" class="aba" :class="{ 'aba--active-aba': aba == 3 }">
                <code-info
                  icon="handshake"
                  info="parceiro"
                  mobile-hidden
                />
                
              </div>
              <div v-if="!fullscreenMode" @click="aba = 4" class="aba" :class="{ 'aba--active-aba': aba == 4 }">
                <code-info
                  icon="clinic-medical"
                  info="posto"
                  mobile-hidden
                />
              </div>
              <div @click="aba = 5" class="aba" :class="{ 'aba--active-aba': aba == 5 }">
                <code-info
                  icon="qrcode"
                  info="QR code"
                  mobile-hidden
                />
              </div>
            </template>
            <template v-slot:body>
              <patient-login @loading="loading = $event" v-if="aba == 1" @error="messages" @keyboardActivated="displayKeyboard" @modalHelp="helplogin = $event"></patient-login>
              <doctor-login @loading="loading = $event" @error="messages" v-if="aba == 2"></doctor-login>
              <partner-login @loading="loading = $event" @error="messages" v-if="aba == 3"></partner-login>
              <health-care-login @loading="loading = $event" @error="messages" v-if="aba == 4"></health-care-login>
              <Qrcode-login @loading="loading = $event" @error="messages" v-if="aba == 5" :play="aba == 5 ? true : false" />
            </template>
          </code-menu-abas>
          <div class="logins__help-modal" v-if="helplogin">
            <code-modal
              :normal="true"
              :display="helplogin"
              @display="helplogin = $event"
            >
              <template v-slot:modal>
                <help-to-login @close="helplogin = $event"></help-to-login>
              </template>
            </code-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeButton from '../components/base/CodeButton'
import CodeInfo from '../components/base/CodeInfo'
import CodeMessage from '../components/base/CodeMessage'
import CodeMenuAbas from '../components/base/CodeMenuAbas'
import CodeModal from '../components/base/CodeModal'
import DoctorLogin from '../components/DoctorLogin'
import HealthCareLogin from '../components/HealthCareLogin'
import HelpToLogin from  '../components/HelpToLogin'
import LaboratoryBanner from '../components/LaboratoryBanner'
import PartnerLogin from '../components/PartnerLogin'
import PatientLogin from '../components/PatientLogin'
import QrcodeLogin from '../components/QrcodeLogin'
import TheNavbar from '../components/TheNavbar'
import { mapGetters } from 'vuex'
import { 
  NAMESPACED_AUTH, 
  DOCTOR_TYPE, 
  PATIENT_TYPE, 
  HEALTH_CENTER_TYPE, 
  USER_TYPE, 
  ATTENDANCE_TYPE, 
  PARTNER_TYPE,
  DOCTOR_ROUTE,
  PARTNER_ROUTE,
  PROCEDIMENT_ROUTE,
  PATIENT_ROUTE,
  HEALTH_CENTER_ROUTE
} from '../utils/alias'
export default {
  name: 'Logins',
  components: {
    CodeButton,
    CodeInfo,
    CodeMenuAbas,
    CodeModal,
    CodeMessage,
    DoctorLogin,
    HealthCareLogin,
    HelpToLogin,
    LaboratoryBanner,
    PartnerLogin,
    PatientLogin,
    QrcodeLogin,
    TheNavbar
  },
  data () {
    return {
      aba: 1,
      fullscreenMode: false,
      helplogin: false,
      messageToUser: undefined,
      TIME_MESSAGE: 10000,
      loading: false
    }
  },
  watch: {
    aba () {
      this.messageToUser = undefined
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_AUTH, [
      'userTypeAuthed',
      'isAuthenticated'
    ])
  },
  created () {
    //this.redirectToPreviousPage() 
  },
  methods: {
    messages (value) {
      // console.log(value)
      this.messageToUser = value
      console.log(value)
      setTimeout(() => {
        this.messageToUser = undefined
      }, this.TIME_MESSAGE)
    },
    redirectToProcediments () {
      this.$router.push({ path: PROCEDIMENT_ROUTE })
    },
    displayKeyboard (value) {
      this.fullscreenMode = value
      let isFullscreen = (document.fullscreenElement) ? true : false
      console.log(value)
      console.log(this.fullscreenMode)
      if (value && !isFullscreen) {
        document.documentElement.requestFullscreen()
        return
      } else {
        document.exitFullscreen() 
      }
    },
    redirectToPreviousPage () {
      if (this.isAuthenticated) {
        switch (this.userTypeAuthed) {
          case DOCTOR_TYPE:
            this.$router.push({ path: DOCTOR_ROUTE })
            break
          case PATIENT_TYPE:
            this.$router.push({ path: PATIENT_ROUTE })
            break
          case HEALTH_CENTER_TYPE:
            this.$router.push({ path: HEALTH_CENTER_ROUTE })
            break
          case USER_TYPE:
            this.$router.push({ path: PATIENT_ROUTE })
            break
          case ATTENDANCE_TYPE:
            this.$router.push({ path: PATIENT_ROUTE })
            break
          case PARTNER_TYPE:
            this.$router.push({ path: PARTNER_ROUTE })
            break
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/transitions/__slide_fade.scss'
.logins__navbar
  position: fixed
  width: 100%
  top: 0
  right: 0
  z-index: 1
.logins
  display: flex
  flex-direction: column
  min-height: calc(100vh - 60px)
  overflow: auto
.logins__main
  margin-top: 95px
  width: 100%
  display: flex
  flex-direction: row
  justify-content: space-evenly
.logins_main--fullscreen
  margin-top: 0
.logins__main--unclickable
  pointer-events: none
  cursor: progress
.logins__messages
  position: fixed
  top: 60px
  align-self: flex-end
  width: 100%
  right: 0px
  @include respond-to(medium-screens)
    width: 100%
    right: 0
    left: 0
    top: 60px
html:fullscreen .logins__messages
  top: 0
.logins__message
  width: 100%
  min-height: 10vh
.logins__content
  display: flex
  width: 90%
  justify-content: space-evenly
  @include respond-to(medium-screens)
    flex-direction: column
    align-items: center
  @include respond-to(handhelds)
    flex-direction: column
    align-items: center
    width: 100%
.logins__menu-abas
  width: 460px
  display: flex
  flex-direction: column
  @include respond-to(medium-screens)
    height: 100%
  @include respond-to(handhelds)
    width: 90%
    max-width: 450px
    min-width: 320px
    height: 100%
    margin-bottom: 10px
.logins__content--up
  flex-direction: column
  align-items: center
  padding: 0
  margin-top: 0
  height: 67vh
.logins__banner
  max-width: 350px
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-start
  @include respond-to(medium-screens)
    display: none
  @include respond-to(handhelds)
    display: none
</style>