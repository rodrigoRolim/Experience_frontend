<template>
  <code-drop-down text="Filtrar Atendimento" dropdown :close-dropdown="closeDropdown">
    <template v-slot:content >
      <div class="attendance-painel-filter">
        <div class="attendance-painel-filter__title">
          <h1>Painel Atendimentos</h1>
        </div>
        <div class="attendance-painel-filter__qt-hr">
          <code-input 
            name="qt-hours"
            label="Qt. horas"
            label-color="text"
            v-model="hours"
            numeric
          />
        </div>
        <div class="attendance-painel-filter__accomodation">
          <code-select
            name="accomodation"
            option="selecione a acomodação"
            label="Acomodacão"
            label-color="text"
            :options="accomodations"
          ></code-select>
        </div>
        <div class="attendance-painel-filter__buttons">
          <code-button
            text="filtrar"
            name-icon="filter"
            borded
            bolded
            letters="uppercase"
            color="light"
            size="md"
            streched
            size-icon="lg"
          />
        </div>
      </div>
    </template>
  </code-drop-down>
</template>

<script>
import CodeDropDown from './base/CodeDropDown.vue'
import CodeSelect from "./base/CodeSelect";
import CodeInput from "./base/CodeInput";
import CodeButton from "./base/CodeButton";
import { NAMESPACED_AUTH, NAMESPACED_ACCOMODATIONS, NAMESPACED_ATTENDANCE, ACCOMODATIONS, GET_ACCOMODATIONS_STORE, GET_FILTERS, GET_ATTENDANCES } from "../utils/alias";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AttendancesPainelListFilter",
  components: {
    CodeDropDown,
    CodeSelect,
    CodeInput,
    CodeButton
  },
  data() {
    return {
      closeDropdown: false,
      hours: null
    }
  },
  created() {
    this.listAccomodations();
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'params'
    ]),
    ...mapGetters(NAMESPACED_ACCOMODATIONS, {
      accomodations: 'accomodations',
      statusAcc: 'status'
    }),
    ...mapGetters(NAMESPACED_AUTH, [
      'userId',
      'userTypeAuthed',
      'healthCenterLogged'
    ]),
  },
  methods: {
    listAccomodations () {
      let urlAccomodations = this.getURI(this.params.healthCenter.id, this.getTypeUser(this.userTypeAuthed), ACCOMODATIONS)
      this.getAccomodations({ url: urlAccomodations })
        .then(() => {})
        .catch(() => {})
     
    },
    getURI(id, typeUser, resource) {
      return GET_FILTERS(
              this.params.begin.split(" - ").join("-"), 
              this.params.end.split(" - ").join("-"), 
              typeUser,
              id, 
              resource
            )
    },
      paramsQuery () {
      let queries = {}
      // if (this.params.healthCenter.id) queries['postocadastro'] = this.params.healthCenter.id
      if (this.params.accomodation.id) queries['acomodacao'] = this.params.accomodation.id
      return queries
    },
    attendances () {
      if (!this.waitRequest) {
        let headers = { 'X-Paginate': true }
      
        this.renitiPage()
        let urlName = GET_ATTENDANCES(
          this.params.begin.split(" - ").join("-"),
          this.params.end.split(" - ").join("-"),
          this.getTypeUser(this.userTypeAuthed))   
        this.getAttendances({ url: urlName, params: this.paramsQuery(), headers: headers })
        .then(() => {})
        .catch(() => {})
      }
    },
    ...mapActions(NAMESPACED_ACCOMODATIONS, {
      getAccomodations: GET_ACCOMODATIONS_STORE
    }),
  }
}
</script>

<style lang="sass" scoped>
.attendance-painel-filter 
  display: flex
  justify-content: flex-end
  align-items: center
  padding: 10px 18px
.attendance-painel-filter__buttons
  align-self: flex-end
.attendance-painel-filter__qt-hr,
.attendance-painel-filter__accomodation,
.attendance-painel-filter__buttons
  margin-left: 20px
.attendance-painel-filter__qt-hr
  width: 75px
.attendance-painel-filter__title
  color: white
  margin-right: auto
  font-size: 0.7rem
</style>