<template>
  <code-drop-down text="Filtrar Atendimento" dropdown>
    <template v-slot:content >
      <div class="attendance-list-filter-healthcenter">
        <div class="attendance-list-filter-healthcenter__period">
          <code-label
            label="Período"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <div class="period__dates">
            <attendance-list-filter-period
              :begin="params.begin"
              :end="params.end"
              @begin="setBegin"
              @end="setEnd"
              :error-begin="validate.begin"
              :error-end="validate.end"
            />
          </div>
        </div>
        <div class="attendance-list-filter-healthcenter__health-center">
          <code-label
            label="Posto"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-select
            name="postos"
            option="selecione o posto"
            :options="healthCenters"
            @input="setHealthCenter"
            :value="params.healthCenter"
            :error="validate.healthCenter"
          ></code-select>
        </div>
        <div class="attendance-list-filter-healthcenter__accomodation">
          <code-label
            label="Acomodação"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-select
            name="acomodacoes"
            option="selecione a acomodação"
            :options="accomodations"
            @input="setAccomodation"
            :value="params.accomodation"
            :error="validate.accomodation"
          ></code-select>
        </div>
        <div class="attendance-list-filter-healthcenter__situation">
          <code-label
            label="Situação"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-select
            name="situation"
            option="selecione a situação"
            :options="situations"
            @input="setSituation"
            :value="params.situation"
            :error="validate.situation"
          ></code-select>
        </div>
        <div class="attendance-list-filter-healthcenter__realizer">
          <code-label
            label="Posto Realizante"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-select
            name="realizer"
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
import CodeLabel from './base/CodeLabel.vue'
import CodeButton from './base/CodeButton.vue'
import AttendanceListFilterPeriod from './AttendanceListFilterPeriod'
import { validator } from '../mixins/validations/validator'
import { session } from '../mixins/session'
import { isOption, ltBegin, gtEnd, required, date } from '../mixins/validations/rules'
import { messages } from '../mixins/user-messages'
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
  ATTENDANCE_NOT_FOUND,
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
  EMPTY_ATTENDANCES
} from '../utils/alias'
export default {
  name: 'AttendanceListFilter',
  props: {
    begin: String,
    end: String
  },
  mixins: [messages, validator({ isOption, ltBegin, gtEnd, required, date }), session],
  components: {
    CodeButton,
    CodeSelect,
    CodeLabel,
    CodeDropDown,
    AttendanceListFilterPeriod
  },
  data () {
    return {
      typeUser: 'posto',
      BEGIN_INITIAL: '30/07/2019',
      END_INITIAL: '26/09/2020',
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
    //this.setInitialDates()
    //this.initFilters()
    //this.initComponent()
    //this.loadAttendancesByScroll()
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
      } else if (this.gtEnd(value, this.params.end)) {
        
        this.validate.begin = 'data inicial inválida'
      } else if (this.ltBegin(this.params.end, this.params.begin)){
        
        this.validate.end = 'data final inválida'
      } else {
        this.validate.begin = ''
        this.validate.end = ''
      }
    },
    'params.end': function (value) {
      if (this.required(value)) {
        this.validate.end = 'campo obrigatório'

      } else if (this.ltBegin(value, this.params.begin)) {
        this.validate.end = 'data final inválida'
      } else if (this.gtEnd(this.params.begin, this.params.end)){
        this.validate.begin = 'início inválido'
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
      if (this.date(begin, DATE_VALIDATOR) && this.date(end, DATE_VALIDATOR)) {
        // this.backParamsToDefault()
        this.initComponent()
      }
    }
  },
  methods: {
    initFilters () {
      this.filters = Object.assign({}, this.params)
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
        console.log({err})
        this.setMessage(this.message({ status: err.response.status, data: 'atendimento' }))
      }
    },
    catchErrorSelect (error) {
      if (!error) {
        this.requestPrevent = true
      }
    },
    async confirm () {

      if (this.allowRequest) {
        try {
          await this.attendances()
        } catch (err) {
           this.setMessage(this.message({ status: err.response.status, data: 'atendimento' }))
        }
      } else {
        this.$emit("error", this.message({ status: 111 }))
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
            console.log(err)
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
            console.log({err})
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
            console.log({err})
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
          //console.log("page: ", this.params.page)
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
            console.log({err})
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
      emptyAttendances: EMPTY_ATTENDANCES
    }),
    ...mapActions(NAMESPACED_ATTENDANCE, {
      getAttendances: GET_ATTENDANCES_STORE,
      setMessage: ATTENDANCE_NOT_FOUND
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
.attendance-list-filter-healthcenter
  display: flex
  flex-direction: row
  justify-content: space-between
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
  align-self: flex-end
  margin-bottom: 10px
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
