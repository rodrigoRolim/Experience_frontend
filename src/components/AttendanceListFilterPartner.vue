<template>
  <code-drop-down dropdown text="filtrar atendimento">
    <template v-slot:content>
      <div class="attendances-filter-partner">
        <div class="attendances-filter-partner__period">
          <code-label
            class="attendances-filter-partner__label"
            label="Período"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          />
          <div class="attendances-filter-partner__calendars">
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
        <div class="attendances-filter-partner__accomodation">
          <code-label
            class="attendances-filter-partner__label"
            label="Acomodação"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          />
          <code-select
            class="attendances-filter-partner__select"
            name="acomodations"
            option="selecione a acomodação"
            :options="accomodations"
            @input="setAccomodation"
            :value="params.accomodation"
            :error="validate.accomodation"
          />
        </div>
        <div class="attendances-filter-partner__situation">
          <code-label
            class="attendances-filter-partner__label"
            label="Situação"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          />
          <code-select
            class="attendances-filter-partner__select"
            name="situation"
            option="selecione a situação"
            :options="situations"
            @input="setSituation"
            :value="params.situation"
            :error="validate.situation"
          />
        </div>
        <div class="attendances-filter-partner__patient-name">
          <code-label
            class="attendances-filter-partener__label"
            label="nome paciente"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          />
          <code-input 
            class="attendances-filter-partner__input"
            placeholder="digite o nome do paciente"
            name="patientName"
            @input="setName"
            :value="params.name"
          />
        </div>
        <div class="attendances-filter-partner__buttons">
          <code-button
            class="attendances-filter-partner__filter"
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
import CodeDropDown from '../components/base/CodeDropDown'
import CodeLabel from '../components/base/CodeLabel'
import CodeSelect from '../components/base/CodeSelect'
import CodeInput from '../components/base/CodeInput'
import CodeButton from '../components/base/CodeButton'
import AttendanceListFilterPeriod from '../components/AttendanceListFilterPeriod'
import { validator } from '../mixins/validations/validator'
import { session } from '../mixins/session'
import { isOption, ltBegin, gtEnd, required, date } from '../mixins/validations/rules'
import { messages } from '../mixins/user-messages'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { 
  NAMESPACED_ATTENDANCE, 
  NAMESPACED_AUTH,
  GET_ATTENDANCES, 
  GET_ATTENDANCES_STORE,
  GET_ACCOMODATIONS_STORE,
  NAMESPACED_ACCOMODATIONS,
  GET_FILTERS, 
  ACCOMODATIONS,
  SITUATIONS, 
  BEGIN_DATE,
  END_DATE,
  ACCOMODATION,
  SITUATION,
  DEFAULT_DATES,
  DATE_VALIDATOR,
  REINIT_PAGINATION,
  EMPTY_ATTENDANCES,
  NAME,
  CANCEL_PENDING_REQUESTS,
  MESSAGE
} from '../utils/alias'
export default {
  name: 'AttendanceListFilterPartner',
  mixins: [messages, validator({ isOption, ltBegin, gtEnd, required, date }), session],
  components: {
    CodeDropDown,
    CodeLabel,
    CodeSelect,
    CodeInput,
    CodeButton,
    AttendanceListFilterPeriod
  },
  data () {
    return {
      list: [],
      period: null,
      situations: SITUATIONS,
      validate: {
        accomodation: '',
        situation: '',
        begin: '',
        end: ''
      },
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
    ]),
    ...mapGetters(NAMESPACED_ACCOMODATIONS, {
      accomodations: 'accomodations',
      statusAcc: 'status'
    }),
    allowRequest () {
      return !Object.values(this.validate).find((val) => val !== '')
    },
    beginAndEnd () {
      return `${this.params.begin}|${this.params.end}`
    },
    disableConfirm () {
      return this.status == 'loading' || this.statusAcc == 'loading' 
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
    waitRequest () {
      return this.statusAcc == 'loading' || this.status == 'loading'
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
        await this.listAccomodations()
        await this.attendances()
      } catch (err) {
        this.message(err.response.status)
      }
    },
    catchErrorSelect (error) {
      if (!error) {
        this.requestPrevent = true
      }
    },
    async confirm () {

      if (this.allowRequest) {
          //this.cancel()
          //document.documentElement.scrollTop = 0
        await this.attendances()
      } else {
        const messageAlert = { 
          message: 'preencha ou corrija os campos alertados', 
          type: 'error'
        }
        this.$emit("error", messageAlert)
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
        let urlAccomodations = this.getURI(this.userId, this.getTypeUser(this.userTypeAuthed), ACCOMODATIONS)
        this.getAccomodations({ url: urlAccomodations })
          .then((accomodations) => {
            resolve(accomodations)     
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
      if (this.params.name) queries['nome'] = this.params.name
      queries['limit'] = this.params.limit
      queries['page'] = this.params.page
      return queries
    },
    attendances () {
      if (!this.waitRequest) {
        let headers = { 'X-Paginate': true }
        //this.repositionScrollBar(0)
        return new Promise((resolve, reject) => {
          let healthCenter = this.userId
  
          this.renitiPage()
          //console.log("page: ", this.params.page)
          let urlName = GET_ATTENDANCES(
            healthCenter,
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
      setAccomodation: ACCOMODATION,
      setName: NAME,
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
    ...mapActions({
      cancel:CANCEL_PENDING_REQUESTS
    })
  }
}
</script>

<style lang="sass" scoped>
.attendances-filter-partner
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
    max-height: 450px
    overflow-y: auto
    width: 100%
.attendances-filter-partner__accomodation,
.attendances-filter-partner__situation
  width: 15%
  @include respond-to(medium-screens)
    width: 27%
  @include respond-to(handhelds)
    width: 100%
    margin: 5px 0
.attendances-filter-partner__patient-name
  width: 30%
  @include respond-to(medium-screens)
    width: 43%
  @include respond-to(handhelds)
    width: 100%
    margin: 5px 0
.attendances-filter-partner__buttons
  width: 10%
  align-self: center
  margin-top: 10px
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 30px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 40px
.attendances-filter-partner__period
  width: 27%
  @include respond-to(medium-screens)
    width: 100%
    margin: 10px 0
  @include respond-to(handhelds)
    width: 100%
    margin: 5px 0
  display: flex
  flex-direction: column
</style>