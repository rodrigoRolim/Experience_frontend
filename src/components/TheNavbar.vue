<template>
  <header class="navbar">
    <div class="navbar__logo">
      logo da empresa
    </div>
    <div class="navbar__profile">
      <user-perfil></user-perfil>
    </div>
  </header>
</template>
<script>
import UserPerfil from './UserPerfil'
export default {
  name: 'TheNavbar',
  components: {
    UserPerfil
  }
}
</script>
<style lang="sass" scoped>
.navbar
  display: flex
  flex-direction: row
  justify-content: space-between
  background-color: white
  width: 100%
  min-height: 50px
  margin-bottom: 20px
  -webkit-box-shadow: 0 8px 6px -8px black
  -moz-box-shadow: 0 8px 6px -8px black
  box-shadow: 0 8px 6px -8px black
.navbar__logo
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  margin-left: 20px
.navbar__profile
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  margin-right: 20px
</style>