<template>
  <div class="doctor">
    <div class="doctor__navbar">
      <the-navbar logo="logo_cedro">
        <template v-slot:collapser>
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
    <div class="doctor__footer">
      <the-footer>
        <template>
          <div class="doctor__attendances" @click="getAttendances">
            <code-info 
              icon="list-ul"
              info="atendimentos"
              color="rgba(71, 77, 94, 1)"
              size="1x"
              bottom
            />
          </div>
          <div class="doctor__exams" @click="getExams">
            <code-info 
              icon="notes-medical"
              info="exames"
              color="rgba(71, 77, 94, 1)"
              size="1x"
              bottom
            />
          </div>
          <div class="doctor__patient" @click="getPatientInfo">
            <code-info 
              icon="user-injured"
              info="paciente"
              color="rgba(71, 77, 94, 1)"
              size="1x"
              bottom
            />
          </div>
        </template>
      </the-footer>
    </div>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import UserPerfil from '../components/UserPerfil'
import CodeButtonCollapser from '../components/base/CodeButtonCollapser'
import TheFooter from '../components/TheFooter'
import CodeInfo from '../components/base/CodeInfo'
import { bus } from '../main'
export default {
  name: 'Doctor',
  components: {
    TheNavbar,
    UserPerfil,
    CodeButtonCollapser,
    TheFooter,
    CodeInfo
  },
  methods: {
    getAttendances () {
      bus.$emit('attendances', true)
    },
    getExams () {
      bus.$emit('exams', true)
    },
    getPatientInfo () {
      bus.$emit('patient', true)
    }
  }
}
</script>

<style lang="sass" scoped>
.doctor
  min-height: 100vh
.doctor__navbar
  position: fixed
  width: 100%
  top: 0
  left: 0
  z-index: 3
.doctor__main
  width: 100%
.doctor__footer
  display: none
  @include respond-to(handhelds)
    display: block
    position: fixed
    bottom: 0
    width: 100%
.doctor__attendances,
.doctor__exams,
.doctor__patient
  cursor: default
a
  text-decoration: none
  color: black
</style>