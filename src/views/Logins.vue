<template>
  <div class="logins">
    <div class="logins__navbar" v-if="!hiddenBanner">
      <the-navbar logo="logo_cedro">
        <template v-slot:perfil>
          <div class="logins__menu">
            <code-button
              class="logins__manual"
              text="manuais"
              borded
              letters="uppercase"
              size="md"
              transparent
              @click="redirectToProcediments"
            />
          </div>
        </template>
      </the-navbar>
    </div>
    <transition name="slide-fade">
      <div class="logins__messages"  v-if="showMessage">
        <code-message
        
          class="logins__message"
          :message="contentMessage"
          type="error"
          position="flex-start"
          icon="times-circle"
        />
      </div>
    </transition>
    <div class="logins__main">
      <div class="logins__content" :class="{'logins__content--up': hiddenBanner}">
         <div class="logins__banner" v-if="!hiddenBanner">
          <laboratory-banner logo="logo_cedro"></laboratory-banner>
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
              <div v-if="!hiddenBanner" @click="aba = 2" class="aba" :class="{ 'aba--active-aba': aba == 2 }">
                 <code-info
                  icon="stethoscope"
                  info="médico"
                  mobile-hidden
                />
              </div>
              <div v-if="!hiddenBanner" @click="aba = 3" class="aba" :class="{ 'aba--active-aba': aba == 3 }">
                <code-info
                  icon="handshake"
                  info="parceiro"
                  mobile-hidden
                />
                
              </div>
              <div v-if="!hiddenBanner" @click="aba = 4" class="aba" :class="{ 'aba--active-aba': aba == 4 }">
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
              <patient-login v-show="aba == 1" @error="messages" @keyboardActivated="hiddenBanner = $event" @modalHelp="helplogin = $event"></patient-login>
              <doctor-login @error="messages" v-show="aba == 2"></doctor-login>
              <partner-login @error="messages" v-show="aba == 3"></partner-login>
              <health-care-login @error="messages" v-show="aba == 4"></health-care-login>
              <Qrcode-login v-if="aba == 5" :play="aba == 5 ? true : false"></Qrcode-login>
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
      hiddenBanner: false,
      helplogin: false,
      showMessage: false,
      contentMessage: ''
    }
  },
  created () {
    
  },
  watch: {
    aba () {
      this.showMessage = false
      this.contentMessage = ''
    }
  },
  methods: {
    messages (value) {
      this.showMessage = value.error
      this.contentMessage = value.message
      setTimeout(() => {
        this.showMessage = false
        this.contentMessage = ''
      }, 6000)
    },
    redirectToProcediments () {
      this.$router.push({path: '/manuais'})
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/transitions/__slide_fade.scss'
@import '../styles/transitions/__fade.scss'
.logins
  display: flex
  flex-direction: column
  min-height: 100vh
.logins__main
  width: 100%
  display: flex
  flex-direction: row
  justify-content: space-evenly
  min-height: 89vh
.logins__messages
  position: fixed
  top: 80px
  box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.1)
  align-self: flex-end
  width: 35%
  right: 30px
  @include respond-to(medium-screens)
    width: 100%
    right: 0
    left: 0
    top: 62px
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
  margin-top: 7%
.logins__menu-abas
  width: 460px
  display: flex
  flex-direction: column
  @include respond-to(medium-screens)
    margin: 40px 0
    height: 100%
  @include respond-to(handhelds)
    margin: 40px
    width: 90%
    max-width: 450px
    min-width: 320px
    height: 100%
.logins__content--up
  padding: 0
  margin-top: 20px
  height: 70vh
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