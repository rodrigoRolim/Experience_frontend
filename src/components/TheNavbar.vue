<template>
  <div class="container">
    <span class="shadow-left"></span>
    <header class="navbar">
      <div class="navbar__logo">
        logo da empresa
      </div>
      <div class="navbar__profile">
        <user-perfil></user-perfil>
      </div>
    </header>
    <span class="shadow-right"></span>
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
.container
  display: flex
  justify-content: space-between
  position: relative
  top: 0
  left: 0
  display: flex
.navbar
  position: absolute
  display: flex
  flex-direction: row
  justify-content: space-between
  background-color: white
  width: 100%
  min-height: 50px
  z-index: 999
  top: 0
  left: 0
  
.shadow-right
  width: 400px
  height: 40px

  background-color: white
  -webkit-box-box-shadow: 0 8px 6px 1px rgba(0,0,0,0.1)
  -moz-box-shadow: 0 8px 6px 1px rgba(0,0,0,0.1)
  box-shadow: 0 8px 6px 1px rgba(0,0,0,0.1)
  transform: rotate(2deg)
.shadow-left
  width: 400px
  height: 40px
  
  background-color: white
  -webkit-box-box-shadow: 0 8px 6px 1px rgba(0,0,0,0.1)
  -moz-box-shadow: 0 8px 6px 1px rgba(0,0,0,0.1)
  box-shadow: 0 8px 6px 1px rgba(0,0,0,0.1)
  transform: rotate(-2deg)
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