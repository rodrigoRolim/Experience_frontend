<template>
  <div class="patient">
    <div class="patient__navbar" :class="{ 'patient__navbar--up-hidden': hiddenElement }">
      <the-navbar logo="logo_cedro">
        <template v-slot:collapser>
          <code-button-collapser />
        </template>
        <template v-slot:perfil>
          <user-perfil />
        </template>
      </the-navbar>
    </div>
    <div class="patient__main"  :class="{ 'patient__main--up': hiddenElement }">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import CodeButtonCollapser from '../components/base/CodeButtonCollapser'
import UserPerfil from '../components/UserPerfil'
import { hiddenByScroll } from '../mixins/hiddenByScroll'
export default {
  name: 'Patient',
  mixins: [hiddenByScroll],
  components: {
    TheNavbar,
    CodeButtonCollapser,
    UserPerfil
  },
  data () {
    return {
      viewport: null,
      screen: -1
    }
  }
}
</script>

<style lang="sass" scoped>
.navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
.patient__navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 33
.patient__navbar--up-hidden
  top: -61px
.patient__main
  margin-top: 60px
  min-height: calc(100vh - 60px)
.patient__main--up
  margin-top: 0
  min-height: calc(100vh - 0px)
.patient__footer
  display: none
  @include respond-to(handhelds)
    display: block
    position: fixed
    bottom: -1.5px
    width: 100%
    z-index: 5
.patient__attendances,
.patient__exams,
.patient__patient
  cursor: default
</style>