<template>
  <div>
    <div class="navbar">
      <the-navbar logo="logo_cedro">
        <template v-slot:collapser>
          <code-button-collapser />
        </template>
        <template v-slot:perfil>
          <user-perfil></user-perfil>
        </template>
      </the-navbar>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import UserPerfil from '../components/UserPerfil'
import CodeButtonCollapser from '../components/base/CodeButtonCollapser'
export default {
  name: 'Doctor',
  components: {
    TheNavbar,
    UserPerfil,
    CodeButtonCollapser
  }
}
</script>

<style lang="sass" scoped>
.navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 3
.filter
  position: fixed
  width: 100%
  top: 9vh
  left: 0
  z-index: 0
.navabar__collapser-btn
  @include respond-to(wide-screen)
    display: none
</style>