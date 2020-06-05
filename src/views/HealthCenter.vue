<template>
  <div class="health-center-home">
    <div class="navbar">
      <the-navbar logo="logo_cedro">
      <template v-slot:perfil>
        <user-perfil></user-perfil>
      </template>
    </the-navbar>
    </div>
    <div class="filter">
      <div class="filter__options">
        <attendance-list-filter></attendance-list-filter>
      </div>
      <div class="filter__searcher">
        <attendance-list-search></attendance-list-search>
      </div>
    </div>
    <div class="main">
      <router-view />
    </div>
    <!-- <div class="footer">
      <the-footer />
    </div> -->
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
/* import TheFooter from '../components/TheFooter' */
import UserPerfil from '../components/UserPerfil'
import AttendanceListFilter from '../components/AttendanceListFilter'
import AttendanceListSearch from '../components/AttendanceListSearch'
export default {
  name: 'HealthCenterHome',
  components: {
    TheNavbar,
    /* TheFooter, */
    UserPerfil,
    AttendanceListFilter,
    AttendanceListSearch
  }
}
</script>

<style lang="sass" scoped>
.main
  overflow: hidden
  margin-top: 24vh
  @include respond-to(medium-screens)
    margin-top: 15vh
  @include respond-to(handhelds)
    margin-top: 15vh
.footer
  position: fixed
  bottom: 0
  width: 100%
.filter
  position: fixed
  width: 100%
.filter__searcher
  display: flex
  align-items: center
  width: 100%
  padding: 10px 10px
  height: 10vh
  background-color: white
  -webkit-box-box-shadow: 0 2px 4px 1px rgba(0,0,0,0.1)
  -moz-box-shadow: 0 2px 4px 1px rgba(0,0,0,0.1)
  box-shadow: 0 2px 4px 1px rgba(0,0,0,0.1)
</style>