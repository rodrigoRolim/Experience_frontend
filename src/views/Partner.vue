<template>
  <div class="partner">
    <div
      v-if="hiddenNavOnPanelAttendaces"
      class="partner__navbar" 
      :class="{ 'partner__navbar--up-hidden': hiddenElement }"
    > 
      <the-navbar logo="logo_cedro">
        <template v-slot:home>
          <code-tooltip
            text="lista de atendimentos"
          >
            <template v-slot:element>
              <code-button
                class="partner__home-btn"
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
          <user-perfil />
        </template>
      </the-navbar>
    </div>
    <div class="partner__main">
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
  name: 'Partner',
  mixins: [hiddenByScroll],
  components: {
    TheNavbar,
    UserPerfil,
    CodeTooltip,
    CodeButton
  },
  data () {
    return {
     
    }
  },
  computed: {
    hiddenNavOnPanelAttendaces() {
      return this.$route.path === '/parceiro/painel-attendances'
    }
  },
  methods: {
    redirectToAttendanceListView() {

      if (this.$route.path !== '/parceiro')
        this.$router.replace('/parceiro')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/__themes'
.partner__navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 4
  transition: top 0.3s
.partner__navbar--up-hidden
  top: -61px
.partner__footer
  display: none
  @include respond-to(handhelds)
    display: block
    position: fixed
    bottom: -1.5px
    width: 100%
    z-index: 5
.partner__exams,
.partner__patient
  cursor: default
.partner__home-btn
  @include respond-to(handhelds)
    background-color: transparent
    color: $color__icon
</style>