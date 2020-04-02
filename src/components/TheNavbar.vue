<template>
  <div class="navbar">
    <div class="navbar__logo">
      logo da empresa
    </div>
    <div class="navbar__profile">
      <user-perfil></user-perfil>
    </div>
  </div>
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