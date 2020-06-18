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
  }
}
</script>

<style lang="sass" scoped>
.partner__navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 4
.partner__main
  margin-top: 9vh 
</style>