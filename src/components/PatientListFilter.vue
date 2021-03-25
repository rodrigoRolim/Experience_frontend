<template>
  <code-drop-down text="Filtrar pacientes" dropdown>
    <template v-slot:content>
      <div class="patient-list-filter">
        <div class="patient-list-filter__period">
          <patient-list-filter-period
            label-color="text"
            :begin="params.begin"
            :end="params.end"
            @begin="setBegin"
            @end="setEnd"
            :error-begin="validate.begin"
            :error-end="validate.end"
          />
        </div>
        <div class="patient-list-filter__name-patient">
          <code-input
            label="nome do paciente"
            label-color="text"
            placeholder="digite o nome do paciente"
            name="patientName"
            @input="setNamePatient"
            :value="params.name"
          />
          <div class="patient-list-filter__clean" @click="clearName" v-if="params.name">
            <code-info 
              icon="times"
            />
          </div>
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
import CodeInput from '../components/base/CodeInput'
import CodeButton from '../components/base/CodeButton'
import CodeInfo from '../components/base/CodeInfo'
import PatientListFilterPeriod from '../components/PatientListFilterPeriod'
import { begin, end, accomodation, situation } from '../mixins/validations/paramsValidator'
import { 
 GET_ATTENDANCES_REQUESTER,
 NAMESPACED_PATIENT, 
 GET_PATIENT_STORE, 
 NAME,
 BEGIN_DATE, 
 END_DATE,
 DEFAULT_DATES,
} from '../utils/alias'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { httpMessage } from '../utils/statusMessages'
export default {
  name: 'PatientListFilter',
  mixins: [
    begin,
    end,
    accomodation,
    situation,
  ],
  components: {
    CodeDropDown,
    PatientListFilterPeriod,
    CodeInput,
    CodeButton,
    CodeInfo
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
   
    
  },
  mounted() {
    if(!this.hasPatients) {
      this.patients()
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_PATIENT, [
      'params',
      'hasPatients'
    ]),
  /*   beginAndEnd () {
      return `${this.params.begin}|${this.params.end}`
    }, */
    allowRequest () {
      return !Object.values(this.validate).find((val) => val !== '')
    },
  },
  methods: {
    clearName() {
      this.setNamePatient('')
    },
   /*  validatePeriod(begin, end) {
      return this.date(begin, DATE_VALIDATOR) && 
             this.date(end, DATE_VALIDATOR) && 
             !this.beginGtEnd(begin, end) &&
             !this.endLtBegin(begin, end) &&
             !this.required(begin) &&
             !this.required(end)
    }, */
    ...mapActions(NAMESPACED_PATIENT, {
      getPatients: GET_PATIENT_STORE
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
    async patients () {
      
      let headers = {
        'X-Paginate': true
      }
      try {
         await this.getPatients({ url: this.getURI(this.params.begin, this.params.end), params: this.paramsQuery(), headers })
      } catch(err) {
        const status = err.response.status
        if (status !== 404) {
          this.$emit('error', httpMessage({ status: err.response.status, data: 'paciente' }))
          return
        }
      }
    },
    confirm () {
      if (this.allowRequest) {
        this.patients()
        return
      }
      this.$emit("error", httpMessage({ status: 111 }))        
    }
  }
}
</script>

<style lang="sass" scoped>
.patient-list-filter
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: flex-end
  width: 100%
  padding: 15px 10px
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
  width: 56%
.patient-list-filter__period
  width: 30%
.patient-list-filter__buttons
  width: 12%
.patient-list-filter__name-patient,
.patient-list-filter__period,
.patient-list-filter__buttons
  @include respond-to(handhelds)
    width: 100%
    margin: 10px 0
.patient-list-filter__name-patient
  position: relative
.patient-list-filter__clean
  position: absolute
  top: 52%
  right: 10px
  cursor: pointer
</style>