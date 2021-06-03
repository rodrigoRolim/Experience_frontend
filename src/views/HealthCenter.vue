<template>
  <div class="health-center">
    <div
      class="health-center__navbar" 
      :class="{ 'health-center--up-hidden': hiddenElement }"
    >
      <the-navbar>
        <template v-slot:back v-if="isHealthCenterPatientExams">
          <router-link to="/posto">
            <code-info
              icon="arrow-left"
              size="lg"
            />
          </router-link>
        </template>
        <template v-slot:painel>
          <router-link to="/posto/painel-atendimentos" v-if="!isPanelAttendances">
            <code-info
              info="Painel Atendimentos"
            />
          </router-link>
          <router-link to="/posto" v-if="isPanelAttendances">
            <code-info
              info="atendimentos"
            />
          </router-link>
        </template>
        <template v-slot:perfil>
          <user-perfil></user-perfil>
        </template>
      </the-navbar>
    </div>
    <div 
      class="health-center__main" 
      :class="{ 'health-center__main--up': hiddenElement || !hiddenNavOnPanelAttendaces }"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import UserPerfil from '../components/UserPerfil'
import CodeInfo from '../components/base/CodeInfo'
import { hiddenByScroll } from '../mixins/hiddenByScroll'
export default {
  name: 'HealthCenterHome',
  mixins: [hiddenByScroll],
  components: {
    TheNavbar,
    UserPerfil,
    CodeInfo,
  },
  data () {
    return {
      viewport: null,
      screen: -1
    }
  },
  computed: {
    isHealthCenterPatientExams() {
      return this.$route.path === '/posto/paciente-exames'
    },
    hiddenNavOnPanelAttendaces() {
      return this.$route.path !== '/posto/painel-atendimentos'
    },
    isPanelAttendances() {
      return this.$route.path === '/posto/painel-atendimentos'
    }
  },
  methods: {
    redirectToAttendanceListView() {
      if (this.$route.path !== '/posto')
        this.$router.replace('/posto')
    }
  }
}
</script>

<style lang="sass" scoped>
.health-center__navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 3
  transition: top 0.3s
.health-center--up-hidden
  top: -61px
.health-center__main
  margin-top: 60px
  min-height: calc(100vh - 60px)
  transition: margin-top 0.2s linear
.health-center__main--up
  margin-top: 0
  min-height: calc(100vh - 0px)
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
a
  display: flex
  text-decoration: none
  margin-left: 20px
  padding: 0
</style>