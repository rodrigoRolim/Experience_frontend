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
    <div class="filter">
      <div class="filter__options">
        <attendance-list-filter />
      </div>
      <div class="filter__searcher" :class="{'filter__searcher--modal': searcherInModal}">
        <div class="filter__content">
          <i 
            class="searcher__arrow-back" 
            :class="{'searcher__arrow-back--hidden': !searcherInModal, 'searcher__arrow-back--show': searcherInModal}"
          >
            <font-awesome-icon icon="arrow-left" size="lg" color="lightslategray"/>
          </i>
          <attendance-list-search
            :class="{'filter__input': searcherInModal}"
            @focus="searcherInModal = true"
            @blur="searcherInModal = false"
          />
        </div>
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
    AttendanceListSearch,
  },
  data () {
    return {
      displayHeader: true,
      searcherInModal: true
    }
  },
  methods: {
  /*   hiddenHeader (value) {
      this.displayHeader = value
    } */
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
.main
  overflow: hidden
  margin-top: 9vh
.main--hidden-header
  margin-top: 0
  padding-top: 15vh
.filter
  position: fixed
  width: 100%
  z-index: 6
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
.filter__content
  width: 100%
  display: flex
  justify-content: space-around
  align-items: center
.searcher__arrow-back
  width: 2%
.searcher__arrow-back--hidden
  display: none
.searcher__arrow-back--show
  display: none
  @include respond-to(handhelds)
    display: block
.filter__searcher--modal
  @include respond-to(handhelds)
    align-items: flex-start
    overflow: auto
    margin: 0 auto
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    bottom: 0
    z-index: 4
    background-color: white
    display: flex
    justify-content: center
.filter__input
  @include respond-to(handhelds)
    width: 90%
</style>