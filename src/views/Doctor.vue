<template>
  <div class="doctor">
    <div class="doctor__navbar">
      <the-navbar logo="logo_cedro">
        <template v-slot:collapser>
          <code-button-collapser />
        </template>
        <template v-slot:perfil>
          <user-perfil />
        </template>
      </the-navbar>
    </div>
    <div class="doctor__main">
      <router-view />
    </div>
    <div class="doctor__footer">
      <the-footer>
        <template>
          <div class="doctor__attendances" @click="showAttendances">
            <code-info 
              icon="list-ul"
              info="atendimentos"
              color="rgba(71, 77, 94, 1)"
              size="1x"
              bottom
            />
          </div>
          <div class="doctor__exams" @click="showExams">
            <code-info 
              icon="notes-medical"
              info="exames"
              color="rgba(71, 77, 94, 1)"
              size="1x"
              bottom
            />
          </div>
          <div class="doctor__patient" @click="showPatient">
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
import CodeButtonCollapser from '../components/base/CodeButtonCollapser'
import TheFooter from '../components/TheFooter'
import CodeInfo from '../components/base/CodeInfo'
import { mapMutations } from 'vuex'
export default {
  name: 'Doctor',
  components: {
    TheNavbar,
    UserPerfil,
    CodeButtonCollapser,
    TheFooter,
    CodeInfo
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
      'showAttendances',
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
    
        this.setAttendances({value: false})
        this.setPatient({value: false})
        this.setExams({value: true})
      }
      if (this.detectMediumScreens()) {

        this.setAttendances({value: false})
        this.setPatient({value: true})
        this.setExams({value: true})
      }
      if (this.detectWideScreen()) {

        this.setAttendances({value: true})
        this.setPatient({value: true})
        this.setExams({value: true})
      }
      
    }
  }
}
</script>

<style lang="sass" scoped>
.doctor
  min-height: 100vh
.doctor__navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 3
.doctor__main
  width: 100%
  margin-top: 60px
.doctor__footer
  display: none
  @include respond-to(handhelds)
    display: block
    position: fixed
    bottom: -1.5px
    width: 100%
    z-index: 5
.doctor__attendances,
.doctor__exams,
.doctor__patient
  cursor: default
a
  text-decoration: none
  color: black
</style>