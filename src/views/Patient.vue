<template>
  <div class="patient">
    <div class="patient__navbar">
      <the-navbar logo="logo_cedro">
        <template v-slot:collapser>
          <code-button-collapser />
        </template>
        <template v-slot:perfil>
          <user-perfil />
        </template>
      </the-navbar>
    </div>
    <div class="patient__main">
      <router-view />
    </div>
    
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import CodeButtonCollapser from '../components/base/CodeButtonCollapser'
import UserPerfil from '../components/UserPerfil'
export default {
  name: 'Patient',
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
.patient__main
  margin-top: 60px
.patient__navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 33
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