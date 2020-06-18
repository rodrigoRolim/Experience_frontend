<template>
  <div class="health-center">
 <!--    <transition 
      name="dropdown-transition"
      enter-active-class="dropdown--hidden"
      leave-active-class="dropdown--visible"
    > -->
    <div class="navbar">
      <the-navbar logo="logo_cedro">
        <template v-slot:perfil>
          <user-perfil></user-perfil>
        </template>
      </the-navbar>
    </div>
    <!-- </transition> -->
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import UserPerfil from '../components/UserPerfil'

export default {
  name: 'HealthCenterHome',
  components: {
    TheNavbar,
    UserPerfil
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="sass" scoped>
@import "../styles/animations/_dropdown.sass"
.navbar
  position: fixed
  z-index: 5
  top: 0
  left: 0
  width: 100%
</style>