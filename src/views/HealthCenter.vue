<template>
  <div class="health-center">
    <div class="health-center__navbar">
      <the-navbar logo="logo_cedro">
        <template v-slot:perfil>
          <user-perfil></user-perfil>
        </template>
      </the-navbar>
    </div>
    <div class="health-center__main">
      <router-view />
    </div>
    <div class="health-center__footer">
      <the-footer>
        <template>
          <div class="health-center__exams" @click="showExams">
            <code-info 
              icon="notes-medical"
              info="exames"
              color="rgba(71, 77, 94, 1)"
              size="1x"
              bottom
            />
          </div>
          <div class="health-center__patient" @click="showPatient">
            <code-info 
              icon="user-injured"
              info="paciente"
              color="rgba(71, 77, 94, 1)"
              size="1x"
              bottom
            />
          </div>
        </template>
      </the-footer>
    </div>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import UserPerfil from '../components/UserPerfil'
import TheFooter from '../components/TheFooter'
import CodeInfo from '../components/base/CodeInfo'
import { mapMutations } from 'vuex'
export default {
  name: 'HealthCenterHome',
  components: {
    TheNavbar,
    UserPerfil,
    TheFooter,
    CodeInfo
  },
  data () {
    return {
    }
  },
  created () {
    this.buildView()
    this.initResize()
  },
  beforeDestroy () {

    this.destroyResize()
  },
  methods: {
    ...mapMutations('patientExams', [
      'showExams',
      'showPatient',
      'setCollapser',
      'setAttendances',
      'setExams',
      'setPatient'
    ]),
    detectHandhelds () {
      return ( window.innerWidth <= 768 )
    },
    detectMediumScreens () {
      return ( window.innerWidth > 768 && window.innerWidth < 1023 )
    },
    detectWideScreen () {
      return  (window.innerWidth > 1023 )
    },
    initResize () {
      window.addEventListener('resize', this.buildView)
    },
    destroyResize () {
      window.removeEventListener('resize', this.buildView)
    },
    buildView () {
      if (this.detectHandhelds()) {

        this.setPatient({value: false})
        this.setExams({value: true})
      }
      if (this.detectMediumScreens()) {

        this.setPatient({value: true})
        this.setExams({value: true})
      }
      if (this.detectWideScreen()) {

        this.setPatient({value: true})
        this.setExams({value: true})
      }
      
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../styles/animations/_dropdown.sass"
.health-center__navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 3
.health-center__main
  margin-top: 60px
.health-center__footer
  display: none
  @include respond-to(handhelds)
    display: block
    position: fixed
    bottom: -1.5px
    width: 100%
    z-index: 5
.health-center__exams,
.health-center__patient
  cursor: default
</style>