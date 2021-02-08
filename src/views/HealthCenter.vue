<template>
  <div class="health-center">
    <div class="health-center__navbar">
      <the-navbar>
        <template v-slot:home>
          <code-tooltip
            text="lista de atendimentos"
          >
            <template v-slot:element>
              <code-button
                color="icon"
                name-icon="clipboard-list"
                size-icon="2x"
                size="sm"
                borded
                bolded
                @click="redirectToAttendanceListView"
              />
            </template>
          </code-tooltip>
        </template>
        <template v-slot:perfil>
          <user-perfil></user-perfil>
        </template>
      </the-navbar>
    </div>
    <div class="health-center__main">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import UserPerfil from '../components/UserPerfil'
import CodeButton from '../components/base/CodeButton'
import CodeTooltip from '../components/base/CodeTooltip'
export default {
  name: 'HealthCenterHome',
  components: {
    TheNavbar,
    UserPerfil,
    CodeButton,
    CodeTooltip
  },
  data () {
    return {
      viewport: null,
      screen: -1
    }
  },
  methods: {
    redirectToAttendanceListView() {
      this.$router.replace('/posto')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../styles/animations/__dropdown.sass"
.health-center__navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 3
.health-center__footer
  display: none
  @include respond-to(handhelds)
    display: block
    position: fixed
    bottom: -1.5px
    width: 100%
    z-index: 5
.health-center__exams,
.health-center__patient
  cursor: default
</style>