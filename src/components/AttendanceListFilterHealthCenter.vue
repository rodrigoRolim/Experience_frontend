<template>
  <code-drop-down text="Filtrar Atendimento" dropdown>
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
            label="posto responsável"
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
import { validator } from '../mixins/validations/validator'
import { session } from '../mixins/session'
import { isOption, endLtBegin, beginGtEnd, required, date } from '../mixins/validations/rules'
//import { messages } from '../mixins/user-messages'
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
  REGISTER,
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
  DATE_VALIDATOR,
  REINIT_PAGINATION,
  EMPTY_ATTENDANCES,
  MESSAGE
} from '../utils/alias'
import { httpMessage } from '../utils/statusMessages'
export default {
  name: 'AttendanceListFilter',
  props: {
    begin: String,
    end: String
  },
  mixins: [validator({ isOption, endLtBegin, beginGtEnd, required, date }), session],
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
      prevent: false
    }
  },
  created () {
    if (!this.params.begin || !this.params.end) {
      this.setInitialDates() 
    }
    
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'params',
      'status'
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
    beginAndEnd () {
      return `${this.params.begin}|${this.params.end}`
    },
    disableConfirm () {
      return this.status == 'loading'    || 
             this.statusAcc == 'loading' || 
             this.statusHc == 'loading'  || 
             this.statusRg == 'loading'
    }
  },
  watch: {
    'params.begin': function (value) {

      if (this.required(value)) {

        this.validate.begin = 'campo obrigatório'
        
      } else if (this.beginGtEnd(value, this.params.end)) {
        
        this.validate.begin = 'data de inicio inválida'
      } else if (this.endLtBegin(this.params.begin, this.params.end)){
        
        this.validate.end = 'data de fim inválida'
      } else if (!this.date(value, DATE_VALIDATOR)) {
        this.validate.begin = 'data inválida'
      } else {
        this.validate.begin = ''
        this.validate.end = ''
      }
    },
    'params.end': function (value) {
      if (this.required(value)) {
        this.validate.end = 'campo obrigatório'

      } else if (this.endLtBegin(this.params.begin, value)) {
        this.validate.end = 'data de fim inválida'
      } else if (this.beginGtEnd(this.params.begin, this.params.end)){
        this.validate.begin = 'início inválido'
      } else if (!this.date(value, DATE_VALIDATOR)){
        this.validate.end = 'data inválida'
      } else {
        this.validate.begin = ''
        this.validate.end = ''
      }
    },
    'params.healthCenter': function (value) {
      if (this.required(value)) {
        this.validate.healthCenter = 'campo obrigatório'
      } else if (this.isOption(value, this.healthCenters)) {
        this.validate.healthCenter = 'opção inválida'
      } else {
        this.validate.healthCenter = ''
      }
    },
    'params.accomodation': function (value) {

      if (this.required(value)) {
        this.validate.accomodation = 'campo obrigatório'
      } else if (this.isOption(value, this.accomodations)) {
        this.validate.accomodation = 'opção inválida'
      } else {
        this.validate.accomodation = ''
      }
    },
    'params.situation': function (value) {
      if (this.required(value)) {
        this.validate.situation = 'campo obrigatório'
      } else if (this.isOption(value, this.situations)) {
        this.validate.situation = 'opção inválida'
      } else {
        this.validate.situation = ''
      }
    },
    'params.realizer': function (value) {

      if (this.required(value)) {
        this.validate.realizer = 'campo obrigatório'
      } else if (this.isOption(value, this.registrants)) {
        this.validate.realizer = 'opção inválida'
      } else {
        this.validate.realizer = ''
      }
    },
    waitRequest () {
      return this.statusHc == 'loading'  || 
             this.statusRg == 'loading'  ||
             this.statusAcc == 'loading' ||
             this.status == 'loading'
    },
    beginAndEnd (value) {
      let [begin, end] = value.split('|')

      if (this.validatePeriod(begin, end)) {
        // this.backParamsToDefault()
        this.initComponent()
      }
    }
  },
  methods: {
    validatePeriod(begin, end) {
      return this.date(begin, DATE_VALIDATOR) && 
             this.date(end, DATE_VALIDATOR) && 
             !this.beginGtEnd(begin, end) &&
             !this.endLtBegin(begin, end) &&
             !this.required(begin) &&
             !this.required(end)
    },
    backParamsToDefault () {
      const defaultOption = {id: '', name: 'todos'}
      this.setHealthCenter(defaultOption)
      this.setAccomodation(defaultOption)
      this.setRealizer(defaultOption)
    },
    async initComponent () {

      try {
        await this.listRegisterHealthCenters()
        await this.listRegistrantsHealthCenters()
        await this.listAccomodations()
        await this.attendances()
      } catch (err) {
        if (!err.response) {
          this.message(408)
        } else {
          this.$emit('error', httpMessage({ status: err.response.status }))
        }
          
      }
    },
    catchErrorSelect (error) {
      if (!error) {
        this.requestPrevent = true
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
        let urlAccomodations = this.getURI(this.healthCenterLogged, this.getTypeUser(this.userTypeAuthed), ACCOMODATIONS)
        this.getAccomodations({ url: urlAccomodations })
          .then((accomodations) => {
            resolve(accomodations)     
          })
          .catch((err) => {

            reject(err)
          })
      })
    },
    listRegisterHealthCenters () {
      return new Promise((resolve, reject) => {
        let urlHealthCenters = this.getURI(this.healthCenterLogged, this.getTypeUser(this.userTypeAuthed),  REGISTER)
        this.getHealthCenters({ url: urlHealthCenters })
          .then((healthCenters) => {
  
            resolve(healthCenters)
          })
          .catch((err) => {

            reject(err)
          })
      })
    },
    listRegistrantsHealthCenters () {
      return new Promise((resolve, reject) => {
        let urlRealizers = this.getURI(this.healthCenterLogged, this.getTypeUser(this.userTypeAuthed), REGISTRANTS)
        this.getRegistrants({ url: urlRealizers })
          .then((healthCenters) => {
            resolve(healthCenters)
          })
          .catch((err) => {

            reject(err)
          })
      })
    },
    paramsQuery () {
      let queries = {}
      if (this.params.healthCenter.id) queries['postocadastro'] = this.params.healthCenter.id
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
          let healthCenter = this.healthCenterLogged//this.userId
  
          this.renitiPage()

          let urlName = GET_ATTENDANCES(
            healthCenter,
            this.params.begin.split(" - ").join("-"),
            this.params.end.split(" - ").join("-"),
            this.getTypeUser(this.userTypeAuthed))   
          this.getAttendances({ url: urlName, params: this.paramsQuery(), headers: headers })
          .then((res) => {
            
            resolve(res)
          })
          .catch((err) => {

            reject(err)
          })
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
      getRegistrants: GET_REGISTRANTS_STORE
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
    margin: 5px 0
    width: 100%
.attendance-list-filter-healthcenter__buttons
  width: 10%
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 30px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 40px
.attendance-list-filter-healthcenter__period
  width: 25%
  @include respond-to(medium-screens)
    width: 100%
    margin: 5px 0
  @include respond-to(handhelds)
    width: 100%
    margin: 10px 0
  display: flex
  flex-direction: column
</style>
