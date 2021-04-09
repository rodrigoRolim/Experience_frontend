<template>
  <code-drop-down text="Filtrar Atendimento" dropdown :close-dropdown="closeDropdown">
    <template v-slot:content >
      <div class="attendance-list-filter-healthcenter">
        <div class="attendance-list-filter-healthcenter__period">
          <attendance-list-filter-period
            label-color="text"
            :begin="params.begin"
            :end="params.end"
            @begin="setBegin"
            @end="setEnd"
            :error-begin="validate.begin"
            :error-end="validate.end"
          />
        </div>
        <div class="attendance-list-filter-healthcenter__health-center">
          <code-select
            name="postos"
            option="selecione o posto"
            label="posto cadastro"
            label-color="text"
            :options="healthCenters"
            @input="setHealthCenter"
            @change="loadRealizersAndAccomodations"
            :value="params.healthCenter"
            :error="validate.healthCenter"
          ></code-select>
        </div>
        <div class="attendance-list-filter-healthcenter__accomodation">
          <code-select
            name="acomodacoes"
            option="selecione a acomodação"
            label="acomodacão"
            label-color="text"
            :options="accomodations"
            @input="setAccomodation"
            :value="params.accomodation"
            :error="validate.accomodation"
          ></code-select>
        </div>
        <div class="attendance-list-filter-healthcenter__situation">
          <code-select
            name="situation"
            option="selecione a situação"
            label="situação"
            label-color="text"
            :options="situations"
            @input="setSituation"
            :value="params.situation"
            :error="validate.situation"
          ></code-select>
        </div>
        <div class="attendance-list-filter-healthcenter__realizer">
          <code-select
            name="realizer"
            label="posto realizante"
            label-color="text"
            option="selecione posto realizante"
            :options="registrants"
            @input="setRealizer"
            :value="params.realizer"
            :error="validate.realizer"
          ></code-select>
        </div>
        <div class="attendance-list-filter-healthcenter__buttons">
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
            :disable="disableConfirm"
            :loading="disableConfirm"
            @click.prevent="confirm"
          />
        </div>
      </div>
    </template>
  </code-drop-down>
</template>
<script>
import CodeDropDown from './base/CodeDropDown.vue'
import CodeSelect from './base/CodeSelect.vue'
import CodeButton from './base/CodeButton.vue'
import AttendanceListFilterPeriod from './AttendanceListFilterPeriod'
import { session } from '../mixins/session'
import { begin, end, healthCenter, accomodation, situation, realizer } from '../mixins/validations/paramsValidator'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { 
  NAMESPACED_ATTENDANCE, 
  NAMESPACED_AUTH,
  NAMESPACED_HEALTH_CENTERS,
  GET_ATTENDANCES, 
  GET_ATTENDANCES_STORE,
  GET_ACCOMODATIONS_STORE,
  NAMESPACED_ACCOMODATIONS,
  GET_HEALTH_CENTERS_STORE,
  GET_FILTERS, 
  ACCOMODATIONS,
  /* REGISTER, */
  SITUATIONS, 
  NAMESPACED_REGISTRANTS, 
  GET_REGISTRANTS_STORE, 
  REGISTRANTS,
  BEGIN_DATE,
  END_DATE,
  HEALTH_CENTER,
  ACCOMODATION,
  SITUATION,
  REALIZER,
  DEFAULT_DATES,
  REINIT_PAGINATION,
  EMPTY_ATTENDANCES,
  MESSAGE,
  DATE_VALIDATOR
} from '../utils/alias'
import { httpMessage } from '../utils/statusMessages'
export default {
  name: 'AttendanceListFilter',
  props: {
    begin: String,
    end: String
  },
  mixins: [
    session,
    begin, 
    end, 
    healthCenter, 
    accomodation, 
    situation, 
    realizer
  ],
  components: {
    CodeButton,
    CodeSelect,
    CodeDropDown,
    AttendanceListFilterPeriod
  },
  data () {
    return {
      situations: SITUATIONS,
      validate: {
        healthCenter: '',
        accomodation: '',
        situation: '',
        realizer: '',
        begin: '',
        end: ''
      },
      prevent: false,
      closeDropdown: false
    }
  },
  created() {
    if (!this.params.begin || !this.params.end) {
      this.setInitialDates() 
    }
    
  },
  mounted() {
    if (!this.hasAttendances) {
      this.loadInitialParams()
    }
    
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'params',
      'status',
      'hasAttendances'
    ]),
    ...mapGetters(NAMESPACED_AUTH, [
      'userId',
      'userTypeAuthed',
      'healthCenterLogged'
    ]),
    ...mapGetters(NAMESPACED_ACCOMODATIONS, {
      accomodations: 'accomodations',
      statusAcc: 'status'
    }),
    ...mapGetters(NAMESPACED_HEALTH_CENTERS, {
      healthCenters: 'healthCenters',
      statusHc: 'status'
    }),
    ...mapGetters(NAMESPACED_REGISTRANTS, {
      registrants: 'registrants',
      statusRg: 'status'
    }),
    allowRequest () {
      return !Object.values(this.validate).find((val) => val !== '')
    },
    disableConfirm() {
      return this.status === 'loading'
    },
    periodChanged() {
      return `${this.params.begin}|${this.params.end}`
    }
  },
  watch: {
    waitRequest() {
      return this.disableConfirm()
    },
    periodChanged(value) {
      let [begin, end] = value.split('|')
      if (this.date(begin, DATE_VALIDATOR) && this.date(end, DATE_VALIDATOR)) {
        this.loadRealizersAndAccomodations(this.healthCenterLogged)
        this.backParamsToDefault()
      }
    }
  },
  methods: {
    backParamsToDefault(option) {
      const defaultOption = {id: '', name: 'todos'}
      if (option) this.setHealthCenter(option)
      
      if (this.accomodations) this.setAccomodation(defaultOption)
      if (this.registrants) this.setRealizer(defaultOption)
      this.setSituation(defaultOption)
    },
    async loadInitialParams () {
      try {
        await this.listRegister()
        this.backParamsToDefault(this.healthCenterLogged) 
        this.loadRealizersAndAccomodations()
        await this.attendances()
        
      } catch (err) {
        if (!err.response) {
          this.message(408)
        } else {
          this.message(err.response.status)
        }          
      }
    },
    async loadRealizersAndAccomodations() {
      try {
        await this.listAccomodations()
        await this.listRealizers()
      } catch(e) {
        console.log({e})
      }
    },
    async confirm() {

      if (this.allowRequest) {
        
        await this.attendances()
      } else {
       
        this.$emit("error", httpMessage({ status: 111 }))
      }
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
    listAccomodations () {
      return new Promise((resolve, reject) => {
        let urlAccomodations = this.getURI(this.params.healthCenter.id, this.getTypeUser(this.userTypeAuthed), ACCOMODATIONS)
        this.getAccomodations({ url: urlAccomodations })
          .then((accomodations) => resolve(accomodations))
          .catch((err) => reject(err))
      })
    },
    listRegister() {
      return new Promise((resolve, reject) => {
        this.getHealthCenters()
          .then((healthCenters) => resolve(healthCenters))
          .catch((err) => reject(err))
      })
    },
    listRealizers() {
      return new Promise((resolve, reject) => {
        let urlRealizers = this.getURI(this.params.healthCenter.id, this.getTypeUser(this.userTypeAuthed), REGISTRANTS)
        this.getRealizers({ url: urlRealizers })
          .then((healthCenters) => resolve(healthCenters))
          .catch((err) => reject(err))
      })
    },
    paramsQuery () {
      let queries = {}
      // if (this.params.healthCenter.id) queries['postocadastro'] = this.params.healthCenter.id
      if (this.params.realizer.id) queries['postorealizante'] = this.params.realizer.id
      if (this.params.accomodation.id) queries['acomodacao'] = this.params.accomodation.id
      if (this.params.situation.id) queries['situacao'] = this.params.situation.id
      queries['limit'] = this.params.limit
      queries['page'] = this.params.page
      return queries
    },
    attendances () {
      if (!this.waitRequest) {
        let headers = { 'X-Paginate': true }
        return new Promise((resolve, reject) => {
          this.renitiPage()
          let urlName = GET_ATTENDANCES(
            this.params.healthCenter.id,
            this.params.begin.split(" - ").join("-"),
            this.params.end.split(" - ").join("-"),
            this.getTypeUser(this.userTypeAuthed))   
          this.getAttendances({ url: urlName, params: this.paramsQuery(), headers: headers })
          .then((res) => resolve(res))
          .catch((err) => reject(err))
        })
      }
    },
    ...mapMutations(NAMESPACED_ATTENDANCE, {
      setBegin: BEGIN_DATE,
      setEnd: END_DATE,
      setHealthCenter: HEALTH_CENTER,
      setAccomodation: ACCOMODATION,
      setRealizer: REALIZER,
      setSituation: SITUATION,
      setInitialDates: DEFAULT_DATES,
      renitiPage: REINIT_PAGINATION,
      emptyAttendances: EMPTY_ATTENDANCES,
      message: MESSAGE
    }),
    ...mapActions(NAMESPACED_ATTENDANCE, {
      getAttendances: GET_ATTENDANCES_STORE
    }),
    ...mapActions(NAMESPACED_ACCOMODATIONS, {
      getAccomodations: GET_ACCOMODATIONS_STORE
    }),
    ...mapActions(NAMESPACED_HEALTH_CENTERS, {
      getHealthCenters: GET_HEALTH_CENTERS_STORE
    }),
    ...mapActions(NAMESPACED_REGISTRANTS, {
      getRealizers: GET_REGISTRANTS_STORE
    })
  }
}
</script>
<style lang="sass" scoped>
@import "../styles/__themes"
.attendance-list-filter-healthcenter
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: flex-end
  width: 100%
  padding: 12px 10px
  @include respond-to(medium-screens)
    max-height: 250px
    flex-wrap: wrap
  @include respond-to(handhelds)
    flex-direction: column
    height: 75vh
    max-height: 500px
    overflow-y: auto
    width: 100%
.attendance-list-filter-healthcenter__label
  color: $color__text
.attendance-list-filter-healthcenter__health-center,
.attendance-list-filter-healthcenter__accomodation,
.attendance-list-filter-healthcenter__situation,
.attendance-list-filter-healthcenter__realizer
  width: 15%
  @include respond-to(medium-screens)
    width: 24%
  @include respond-to(handhelds)
    margin-bottom: 10px
    width: 100%
.attendance-list-filter-healthcenter__buttons
  width: 10%
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 30px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 30px
.attendance-list-filter-healthcenter__period
  width: 25%
  @include respond-to(medium-screens)
    width: 100%
    margin: 10px 0
  @include respond-to(handhelds)
    width: 100%
    margin-bottom: 10px
  display: flex
  flex-direction: column
</style>
