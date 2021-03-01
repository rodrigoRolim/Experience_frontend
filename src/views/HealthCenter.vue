<template>
  <div class="health-center">
    <div
      v-if="hiddenNavOnPanelAttendaces"
      class="health-center__navbar" 
      :class="{ 'health-center--up-hidden': hiddenElement }"
    >
      <the-navbar>
        <template v-slot:home>
          <code-tooltip
            text="lista atendimentos"
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
import { hiddenByScroll } from '../mixins/hiddenByScroll'
export default {
  name: 'HealthCenterHome',
  mixins: [hiddenByScroll],
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
  computed: {
    hiddenNavOnPanelAttendaces() {
      return this.$route.path === '/posto/painel-attendances'
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