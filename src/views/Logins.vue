<template>
  <div class="logins">
    <div class="logins__navbar" v-if="!hiddenBanner">
      <the-navbar logo="logo_cedro"/>
    </div>
    <div class="logins__main">
      <div class="logins__content" :class="{'logins__content--up': hiddenBanner}">
         <div class="logins__banner" v-if="!hiddenBanner">
          <laboratory-banner logo="logo_cedro"></laboratory-banner>
        </div>

        <div class="logins__menu-abas">
          <code-menu-abas>
            <template v-slot:header>
              <div @click="aba = 1" class="aba" :class="{ 'active-aba': aba == 1 }">paciente</div>
              <div v-if="!hiddenBanner" @click="aba = 2" class="aba" :class="{ 'active-aba': aba == 2 }">medico</div>
              <div v-if="!hiddenBanner" @click="aba = 3" class="aba" :class="{ 'active-aba': aba == 3 }">parceiro</div>
              <div v-if="!hiddenBanner" @click="aba = 4" class="aba" :class="{ 'active-aba': aba == 4 }">posto</div>
              <div v-if="!hiddenBanner" @click="aba = 5" class="aba" :class="{ 'active-aba': aba == 5 }">QR code</div>
            </template>
            <template v-slot:body>
              <patient-login v-if="aba == 1" @keyboardActivated="hiddenBanner = $event" @modalHelp="helplogin = $event"></patient-login>
              <doctor-login v-if="aba == 2"></doctor-login>
              <partner-login v-if="aba == 3"></partner-login>
              <health-care-login v-if="aba == 4"></health-care-login>
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
    CodeMenuAbas,
    CodeModal,
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
      helplogin: false
    }
  }
}
</script>

<style lang="sass" scoped>
.logins
  display: flex
  flex-direction: column
.logins__main
  width: 100%
  display: flex
  flex-direction: row
  justify-content: space-evenly
.logins__content
  padding: 100px 0
  display: flex
  width: 90%
  justify-content: space-evenly
  @include respond-to(medium-screens)
    flex-direction: column
    align-items: center
    padding: 10px 0
    height: 100vh
  @include respond-to(handhelds)
    flex-direction: column
    align-items: center
    width: 100%

.logins__menu-abas
  width: 450px
  display: flex
  flex-direction: column
  @include respond-to(medium-screens)
    margin: 40px 0
    height: 65vh 
  @include respond-to(handhelds)
    margin: 40px 0
    width: 75%
    min-width: 320px
    height: 100% 
.logins__content--up
  margin: 10px 0

.logins__banner
  max-width: 350px
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-start
  @include respond-to(medium-screens)
    // position: absolute
    // top: 0
    // margin-top: 50px
  @include respond-to(handhelds)
    display: none
  // z-index: 1
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0
</style>