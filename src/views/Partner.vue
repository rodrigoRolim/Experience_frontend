<template>
  <div class="partner">
    <div class="partner__navbar"> 
      <the-navbar logo="logo_cedro">
        <template v-slot:perfil>
          <user-perfil />
        </template>
      </the-navbar>
    </div>
    <div class="partner__main">
      <router-view />
    </div>
    <div class="partner__footer">
      <the-footer>
        <template>
          <div class="partner__exams" @click="showExams">
            <code-info 
              icon="notes-medical"
              info="exames"
              color="rgba(71, 77, 94, 1)"
              size="1x"
              bottom
            />
          </div>
          <div class="partner__patient" @click="showPatient">
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
import TheFooter from '../components/TheFooter'
import CodeInfo from '../components/base/CodeInfo'
import UserPerfil from '../components/UserPerfil'
import { mapMutations } from 'vuex'
export default {
  name: 'Partner',
  components: {
    TheNavbar,
    UserPerfil,
    TheFooter,
    CodeInfo
  },
  data () {
    return {
      viewport: null,
      screen: -1
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
      'setExams',
      'setPatient'
    ]),
    detectViewport () {
      if (window.innerWidth <= 768 && this.screen !== 0) {
        this.screen = 0
        return 'handhelds'
      }
      if ((window.innerWidth > 768 && window.innerWidth < 1023) && this.screen !== 1) {
        this.screen = 1
        return 'medium-screens'
      }
      if (window.innerWidth > 1023 && this.screen !== 2) {
        this.screen = 2
        return 'wide-screens'
      }
    },
    initResize () {
      
      window.addEventListener('resize', this.buildView)
    },
    destroyResize () {
      window.removeEventListener('resize', this.buildView)
    },
    buildView () {
      this.viewport = this.detectViewport()

      if (this.viewport === 'handhelds') {
        
        // this.setAttendances({value: false})
        this.setPatient({value: false})
        this.setExams({value: true})
      }
      if (this.viewport === 'medium-screens') {

        // this.setAttendances({value: false})
        this.setPatient({value: true})
        this.setExams({value: true})
      }
      if (this.viewport === 'wide-screens') {

        // this.setAttendances({value: true})
        this.setPatient({value: true})
        this.setExams({value: true})
      }
    } 
  } 
}
</script>

<style lang="sass" scoped>
.partner
  min-height: 100vh
.partner__navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 3
.partner__main
  margin-top: 60px
.partner__footer
  display: none
  @include respond-to(handhelds)
    display: block
    position: fixed
    bottom: -1.5px
    width: 100%
    z-index: 5
.partner__exams,
.partner__patient
  cursor: default
</style>