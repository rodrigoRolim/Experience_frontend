<template>
  <div class="doctor">
    <div class="doctor__navbar" :class="{ 'doctor__navbar--up-hidden': hiddenElement }">
      <the-navbar logo="logo_cedro">
        <template v-slot:home>
          <code-tooltip
            text="lista de pacientes"
          >
            <template v-slot:element>
              <code-button
                color="icon"
                name-icon="clipboard-list"
                size-icon="2x"
                size="sm"
                borded
                bolded
                @click="redirectToPatientListView"
              />
            </template>
          </code-tooltip>
        </template>
        <template v-slot:collapser v-if="isDoctorPatientExams">
          <code-button-collapser />
        </template>
        <template v-slot:perfil>
          <user-perfil />
        </template>
      </the-navbar>
    </div>
    <div class="doctor__main">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import UserPerfil from '../components/UserPerfil'
import CodeButtonCollapser from '../components/base/CodeButtonCollapser'
import CodeButton from '../components/base/CodeButton.vue'
import CodeTooltip from '../components/base/CodeTooltip.vue'
import { hiddenByScroll } from '../mixins/hiddenByScroll'
export default {
  name: 'Doctor',
  mixins: [hiddenByScroll],
  components: {
    TheNavbar,
    UserPerfil,
    CodeButtonCollapser,
    CodeButton,
    CodeTooltip
  },
  data () {
    return {
      
    }
  },
  computed: {
    isDoctorPatientExams() {
      return !(this.$route.path == '/medico')
    }
  },
  methods: {
    redirectToPatientListView() {
      if (this.$route.path !== '/medico')
        this.$router.replace('/medico')
    }
  }
}
</script>

<style lang="sass" scoped>
.doctor__navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 4
  transition: top 0.3s
.doctor__navbar--up-hidden
  top: -61px
.doctor__main
  width: 100%
.doctor__footer
  display: none
  @include respond-to(handhelds)
    display: block
    position: fixed
    bottom: -1.5px
    width: 100%
    z-index: 5
.doctor__attendances,
.doctor__exams,
.doctor__patient
  cursor: default
a
  text-decoration: none
  color: black
</style>