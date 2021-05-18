<template>
  <div class="partner">
    <div
      class="partner__navbar" 
      :class="{ 'partner__navbar--up-hidden': hiddenElement }"
    > 
      <the-navbar logo="logo_cedro">
        <template v-slot:back v-if="isPartnerPatientExams">
          <router-link to="/parceiro">
            <code-info 
              icon="arrow-left"
              size="lg"
            />
          </router-link>
        </template>
        <template v-slot:painel>
          <router-link to="/parceiro/painel-atendimentos">
            <code-info
              size="lg"
              info="painel atendimentos"
            />
          </router-link>
        </template>
        <template v-slot:home v-if="showAccomodations()" >
          <code-select
            class="partner__accomodations"
            name="acomodacoes"
            placeholder="selecione a acomodação"
            label-color="text"
            :options="accomodations"
          />
        </template>
        <template v-slot:perfil>
          <user-perfil />
        </template>
      </the-navbar>
    </div>
    <div class="partner__main" :class="{ 'partner__main--up': hiddenElement}">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import UserPerfil from '../components/UserPerfil'
import CodeInfo from '../components/base/CodeInfo'
import CodeSelect from '../components/base/CodeSelect'
import { hiddenByScroll } from '../mixins/hiddenByScroll'
import { mapActions, mapGetters } from 'vuex'
import { GET_ACCOMODATIONS_STORE, NAMESPACED_ACCOMODATIONS, NAMESPACED_AUTH, GET_FILTERS, ACCOMODATIONS } from '../utils/alias'
import { session } from '../mixins/session'
export default {
  name: 'Partner',
  mixins: [hiddenByScroll, session],
  components: {
    TheNavbar,
    UserPerfil,
    CodeInfo,
    CodeSelect
  },
  data() {
    return { 
      accomodations: [{ id: 0, name: "asdasd"}],
      begin: '02 / 11 / 2019',
      end: '10 / 01 / 2021'
    }
  },
  created() {
    this.lisAccomodations()
  },
  computed: {
    ...mapGetters(NAMESPACED_AUTH, [
      'userTypeAuthed',
      'userId',
      'healthCenterLogged'
    ]),
    isPartnerPatientExams() {
      return this.$route.path === '/parceiro/paciente-exames'
    }
  },
  methods: {
    ...mapActions(NAMESPACED_ACCOMODATIONS, {
      getAccomodations: GET_ACCOMODATIONS_STORE
    }),
    showAccomodations() {
      return this.$route.path === '/parceiro/painel-atendimentos'
    },
    redirectToAttendanceListView() {
      if (this.$route.path !== '/parceiro')
        this.$router.replace('/parceiro')
    },
    configUserIdSession() {
     
      return this.healthCenterLogged !== undefined ? this.healthCenterLogged.id : this.userId
    },
    getURL(begin, end) {
      let healthCenter = this.configUserIdSession()
      
      const urlName = GET_FILTERS(
            begin.split(" / ").join("-"),
            end.split(" / ").join("-"),
            this.getTypeUser(this.userTypeAuthed),
            healthCenter,
            ACCOMODATIONS
          )
      return urlName
    },
    lisAccomodations() {
      this.getAccomodations({ url: this.getURL(this.begin, this.end) })
        .then((res) => {
          this.accomodations = res.data
          console.log(this.accomodations)
        })
        .catch((err) => console.log({err}))
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
.partner__main
  margin-top: 60px
  min-height: calc(100vh - 60px)
  transition: margin-top 0.2s linear
.partner__main--up
  margin-top: 0
  min-height: calc(100vh - 0px)
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
a
  display: flex
  text-decoration: none
  margin-left: 20px
  padding: 0
.partner__accomodations
  margin-right: 35px
  width: 320px
</style>