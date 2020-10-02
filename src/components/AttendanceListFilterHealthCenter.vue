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
              :begin="filters.begin"
              :end="filters.end"
              @begin="filters.begin = $event" 
              @end="filters.end = $event"
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
            v-model="filters.healthCenter"
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
            v-model="filters.accomodation"
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
            v-model="filters.situation"
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
            :options="list"
            v-model="filters.realizer"
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
import { messages } from '../mixins/user-messages'
import { mapActions, mapGetters } from 'vuex'
import { 
  GET_ATTENDANCES_HEALTH_CENTER, 
  NAMESPACED_ATTENDANCE, 
  GET_ATTENDANCES_STORE, 
  ATTENDANCE_NOT_FOUND,
  NAMESPACED_FILTERS,
  GET_FILTERS_STORE,
  GET_FILTERS,
  ACCOMODATIONS,
  REALIZERS
} from '../utils/alias'
export default {
  name: 'AttendanceListFilter',
  props: {
    begin: String,
    end: String
  },
  mixins: [messages],
  components: {
    CodeButton,
    CodeSelect,
    CodeLabel,
    CodeDropDown,
    AttendanceListFilterPeriod
  },
  data () {
    return {
      filters: {
        begin: '31/07/2020',
        end: '31/07/2020',
        healthCenter: null,
        accomodation: null,
        situation: null,
        realizer: null
      },
      list: [
        { id: 1, name: 'MATRIX' }
      ],
      BEGIN_INITIAL: '31-07-20',
      END_INITIAL: '31-07-20'
    }
  },
  created () {

    this.attendances()
    
  },
  computed: {
    ...mapGetters(NAMESPACED_FILTERS, [
      'healthCenters',
      'accomodations',
      'situations',
      'realizers'
    ])
  },
  methods: {
    formatterDateToApi (date) {
      let arrDate = date.split('/')
      let day = arrDate[0]
      let month = arrDate[1]
      let arrYear = arrDate[2].split('')
      let yearLastTwoDigits = arrYear[2] + arrYear[3]
      return day + '-' + month + '-' + yearLastTwoDigits
    },
    confirm () {

    },
    buildRequest () {
      let typeUser = 'posto'
      let id = 0
      let urlAccomodations = GET_FILTERS(
            this.formatterDateToApi(this.filters.begin), 
            this.formatterDateToApi(this.filters.end), 
            typeUser, 
            id, 
            ACCOMODATIONS
          )
      let urlRealizers = GET_FILTERS(
          this.formatterDateToApi(this.filters.begin), 
          this.formatterDateToApi(this.filters.end), 
          typeUser, 
          id, 
          REALIZERS
        )
      return [urlAccomodations, urlRealizers]
    },
    getFilters () {
      
      this.filterList(this.buildRequest())
        .then((res) => {
          console.log(res)
        })
    },
    params () {
      let limit = 10
      let page = 1
      let properties = ['postocadastro', 'postorealizante', 'acomodacao', 'situacao']
      let values = ['MATRIZ', 'ALVARO', 'GERAL', 'TF']
      let params = {}
      properties.map((prop, i) => {
        if (values[i]) {
          params[prop] = values[i]
        }
      })
     
      params['limit'] = limit
      params['page'] = page
      return params
    },
    attendances () {

      let healthCenter = 0

      let urlName = GET_ATTENDANCES_HEALTH_CENTER(healthCenter, 
        this.formatterDateToApi(this.filters.begin), 
        this.formatterDateToApi(this.filters.end))
      this.getAttendances({ url: urlName, params: this.params() })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          this.setMessage(this.message({ status: err.response.status, data: 'atendimento' }))
        })
    },
    ...mapActions(NAMESPACED_ATTENDANCE, {
      getAttendances: GET_ATTENDANCES_STORE,
      setMessage: ATTENDANCE_NOT_FOUND
    }),
    ...mapActions(NAMESPACED_FILTERS, {
      filterList: GET_FILTERS_STORE
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