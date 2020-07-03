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
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import UserPerfil from '../components/UserPerfil'

export default {
  name: 'Partner',
  components: {
    TheNavbar,
    UserPerfil
  },
  data () {
    return {
     
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