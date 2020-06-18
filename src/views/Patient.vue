<template>
  <div class="patient">
    <div class="patient__navbar">
      <the-navbar logo="logo_cedro">
        <template v-slot:collapser>
          <code-button-collapser />
        </template>
        <template v-slot:perfil>
          <user-perfil />
        </template>
      </the-navbar>
    </div>
    <div class="patient__main">
      <patient-exams />
    </div>
  </div>
</template>

<script>
import PatientExams from '../components/PatientExams'
import TheNavbar from '../components/TheNavbar'
import CodeButtonCollapser from '../components/base/CodeButtonCollapser'
import UserPerfil from '../components/UserPerfil'
export default {
  name: 'Patient',
  components: {
    PatientExams,
    TheNavbar,
    CodeButtonCollapser,
    UserPerfil
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="sass" scoped>
.navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 3
</style>