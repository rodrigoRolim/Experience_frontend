<template>
  <code-drop-down text="Filtrar pacientes" dropdown>
    <template v-slot:content>
      <div class="patient-list-filter">
        <div class="patient-list-filter__period">
          <code-label 
            class="patient-list-filter__label"
            label="Período"
            color="white"
            :font-weight="400"
            font-size="0.9rem"
          />
          <div class="patient-list-filter__calendars">
            <patient-list-filter-period
              :begin="params.begin"
              :end="params.end"
              @begin="setBegin"
              @end="setEnd"
              :error-begin="validate.begin"
              :error-end="validate.end"
            />
          </div>
        </div>
        <div class="patient-list-filter__name-patient">
          <code-label
            class="patient-list-filter__label"
            label="Nome do Paciente"
            bind="patientName"
            color="white"
            :font-weight="400"
            font-size="0.9rem"
          />
          <code-input 
            placeholder="digite o nome do paciente"
            name="patientName"
            @input="setNamePatient"
            :value="params.name"
          />
        </div>
        <div class="patient-list-filter__buttons">
          <code-button
            class="patient-list-filter__button"
            text="filtrar"
            name-icon="filter"
            borded
            bolded
            letters="uppercase"
            color="light"
            size="md"
            streched
            size-icon="lg"
            @click="confirm"
          />
        </div>
      </div>
    </template>
  </code-drop-down>
</template>

<script>
import CodeDropDown from '../components/base/CodeDropDown'
import CodeLabel from '../components/base/CodeLabel'
import CodeInput from '../components/base/CodeInput'
import CodeButton from '../components/base/CodeButton'
import PatientListFilterPeriod from '../components/PatientListFilterPeriod'
import { validator } from '../mixins/validations/validator'
import { endLtBegin, beginGtEnd, required, date } from '../mixins/validations/rules'
import { messages } from '../mixins/user-messages'
import { 
 GET_ATTENDANCES_REQUESTER,
 NAMESPACED_PATIENT, 
 GET_ATTENDANCES_REQUESTER_STORE, 
 NAME,
 BEGIN_DATE, 
 END_DATE,
 DEFAULT_DATES,
 ATTENDANCE_NOT_FOUND,
 DATE_VALIDATOR
} from '../utils/alias'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'PatientListFilter',
  mixins: [messages, validator({ endLtBegin, beginGtEnd, required, date })],
  components: {
    CodeDropDown,
    PatientListFilterPeriod,
    CodeLabel,
    CodeInput,
    CodeButton
  },
  data () {
    return {
      validate: {
        begin: '',
        end: ''
      }
    }
  },
  created () {
    if (!this.params.begin || !this.params.end) {
      this.setInitialDates() 
    }
    //this.patients()
    
  },
  watch: {
    'params.begin': function (value) {
      console.log(value)
      if (this.required(value)) {
        this.validate.begin = 'campo obrigatório'
      } else if (this.beginGtEnd(value, this.params.end)) {
        
        this.validate.begin = 'inicio inválido'
      } else if (this.endLtBegin(this.params.begin, this.params.end)){
        
        this.validate.end = 'final inválido'
      } else {
        this.validate.begin = ''
        this.validate.end = ''
      }
    },
    'params.end': function (value) {
      if (this.required(value)) {
        this.validate.end = 'campo obrigatório'

      } else if (this.endLtBegin(this.params.begin, value)) {
        this.validate.end = 'final inválido'
      } else if (this.beginGtEnd(this.params.begin, this.params.end)){
        this.validate.begin = 'início inválido'
      } else {
        this.validate.begin = ''
        this.validate.end = ''
      }
    },
    beginAndEnd (value) {
      let [begin, end] = value.split('|')
      if (this.validatePeriod(begin, end)) {
        this.patients()
      }
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_PATIENT, [
      'params'
    ]),
    beginAndEnd () {
      return `${this.params.begin}|${this.params.end}`
    },
    allowRequest () {
      return !Object.values(this.validate).find((val) => val !== '')
    },
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
    ...mapActions(NAMESPACED_PATIENT, {
      getPatients: GET_ATTENDANCES_REQUESTER_STORE,
      setMessage: ATTENDANCE_NOT_FOUND
    }),
    ...mapMutations(NAMESPACED_PATIENT, {
      setNamePatient: NAME,
      setBegin: BEGIN_DATE,
      setEnd: END_DATE,
      setInitialDates: DEFAULT_DATES
    }),
    paramsQuery () {
      let queries = {}
      if (this.params.name) queries['nome'] = this.params.name
      queries['limit'] = this.params.limit
      queries['page'] = this.params.page
      return queries
    },
    getURI () {
      return GET_ATTENDANCES_REQUESTER(
            this.params.begin.split(" - ").join("-"), 
            this.params.end.split(" - ").join("-")
          )
    },
    patients () {
      
      let headers = {
        'X-Paginate': true
      }
      this.getPatients({ url: this.getURI(this.params.begin, this.params.end), params: this.paramsQuery(), headers })
        .then((resp) => {
          console.log(resp)
        })
        .catch((err) => {
          //console.log(err)
          this.setMessage(this.message({status: err.response.status, data: 'paciente'}))
        })
    },
    confirm () {
      if (this.allowRequest) {
        this.patients()
        return
      }
      this.$emit("error", this.message({ status: 111 }))        
    }
  }
}
</script>

<style lang="sass" scoped>
.patient-list-filter
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
    height: 60vh
    max-height: 250px
    overflow-y: auto
    width: 100%
.patient-list-filter__name-patient
  width: 50%
.patient-list-filter__period
  width: 30%
.patient-list-filter__buttons
  display: flex
  align-items: flex-end
  justify-content: center
  width: 18%
  height: 60px
.patient-list-filter__name-patient,
.patient-list-filter__period,
.patient-list-filter__buttons
  @include respond-to(handhelds)
    width: 100%
    margin: 10px 0
</style>