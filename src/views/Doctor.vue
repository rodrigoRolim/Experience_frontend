<template>
  <div class="doctor">
    <div class="doctor__navbar" :class="{ 'doctor__navbar--up-hidden': hiddenElement }">
      <the-navbar>
        <template v-slot:back v-if="isDoctorPatientExams">
          <router-link to="/medico">
            <code-info
              icon="arrow-left"
              size="lg"
            />
          </router-link>
        </template>
        <template v-slot:collapser v-if="isDoctorPatientExams">
          <code-button-collapser />
        </template>
        <template v-slot:perfil>
          <user-perfil />
        </template>
      </the-navbar>
    </div>
    <div class="doctor__main" :class="{ 'doctor__main--up': hiddenElement }">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import UserPerfil from '../components/UserPerfil'
import CodeInfo from '../components/base/CodeInfo'
import CodeButtonCollapser from '../components/base/CodeButtonCollapser'
import { hiddenByScroll } from '../mixins/hiddenByScroll'
export default {
  name: 'Doctor',
  mixins: [hiddenByScroll],
  components: {
    TheNavbar,
    UserPerfil,
    CodeButtonCollapser,
    CodeInfo,
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
  transition: top 0.2s linear
.doctor__navbar--up-hidden
  top: -61px
.doctor__main
  margin-top: 60px
  min-height: calc(100vh - 60px)
  transition: margin-top 0.2s linear
.doctor__main--up
  margin-top: 0
  min-height: calc(100vh - 0px)
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
  display: flex
  text-decoration: none
  margin-left: 20px
  padding: 0
</style>