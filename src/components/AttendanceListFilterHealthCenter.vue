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
            @error="requestPrevents.healthCenter = $event.error"
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
            @error="requestPrevents.accomodation = $event.error"
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
            @error="requestPrevents.situation = $event.error"
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
            v-model="filters.realizer"
            @error="requestPrevents.realizer = $event.error"
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
            :disable="prevent"
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
  NAMESPACED_ATTENDANCE, 
  NAMESPACED_AUTH,
  NAMESPACED_HEALTH_CENTERS,
  GET_ATTENDANCES_HEALTH_CENTER, 
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
  HEALTH_CENTER_TYPE_NAME
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
      typeUser: 'posto',
      filters: {
        begin: '31/07/2020',
        end: '31/07/2020',
        healthCenter: null,
        accomodation: null,
        situation: null,
        realizer: null
      },
      BEGIN_INITIAL: '30/07/2019',
      END_INITIAL: '26/09/2020',
      situations: SITUATIONS,
      requestPrevents: {
        healthCenter: false,
        accomodation: false,
        situation: false,
        realizer: false
      },
      prevent: false
    }
  },
  created () {
   
    this.initComponent()
  },
  computed: {
    ...mapGetters(NAMESPACED_AUTH, [
      'userId'
    ]),
    ...mapGetters(NAMESPACED_ACCOMODATIONS, {
      accomodations: 'accomodations',
      statusAcc: 'status'
    }),
    ...mapGetters(NAMESPACED_HEALTH_CENTERS, {
      healthCenters: 'healthCenters',
      statusHc: 'status'
    }),
    ...mapGetters(NAMESPACED_REGISTRANTS, [
      'registrants'
    ])
  },
  watch: {
    requestPrevents: {
      handler(values) {
        this.prevent = Object.values(values).find(r => r)
      },
      deep: true
    }
  },
  methods: {
    async initComponent () {
      
      try {
        await this.listRegisterHealthCenters()
        await this.listAccomodations()
        await this.listRegistrantsHealthCenters()
        //console.log(this.accomodations)
        //await this.attendances()
      } catch (err) {
        console.log({err})
        this.setMessage(this.message({ status: err.response.status, data: 'atendimento' }))
      }
    },
    formatterDateToApi (date) {
      let arrDate = date.split('/')
      let day = arrDate[0]
      let month = arrDate[1]
      let arrYear = arrDate[2].split('')
      let yearLastTwoDigits = arrYear[2] + arrYear[3]
      return day + '-' + month + '-' + yearLastTwoDigits
    },
    catchErrorSelect (error) {
      if (!error) {
        this.requestPrevent = true
      }
    },
    confirm () {
      console.log(this.filters)
      //if (this.prevent) {
        this.attendances()
        console.log('request stoped')
      //}
    },
    getURI(id, typeUser, resource) {
      return GET_FILTERS(
              this.formatterDateToApi(this.BEGIN_INITIAL), 
              this.formatterDateToApi(this.END_INITIAL), 
              typeUser,
              id, 
              resource
            )
    },
    listAccomodations () {
      return new Promise((resolve, reject) => {
        let urlAccomodations = this.getURI(0, HEALTH_CENTER_TYPE_NAME, ACCOMODATIONS)
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
        let urlHealthCenters = this.getURI(0, HEALTH_CENTER_TYPE_NAME,  REGISTER)
        this.getHealthCenters({ url: urlHealthCenters })
          .then((healthCenters) => {
            console.log(healthCenters)
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
        let urlRealizers = this.getURI(0, HEALTH_CENTER_TYPE_NAME, REGISTRANTS)
        this.getRegistrants({ url: urlRealizers })
          .then((healthCenters) => {
            console.log(healthCenters)
            resolve(healthCenters)
          })
          .catch((err) => {
            console.log({err})
            reject(err)
          })
      })
    },
    params () {
      let params = {}
      if (this.filters.realizer.id) params['postocadastro'] = this.filters.realizer.id
      if (this.filters.healthCenter.id) params['postorealizante'] = this.filters.healthCenter.id
      if (this.filters.accomodation.id) params['acomodacao'] = this.filters.accomodation.id
      if (this.filters.situation.id) params['situacao'] = this.filters.situation.id
      params['limit'] = 10
      params['page'] = 1
      return params
    },
    attendances () {
     // return new Promise((resolve, reject) => {
        let healthCenter = 0//this.userId
        let urlName = GET_ATTENDANCES_HEALTH_CENTER(healthCenter,
           this.filters.begin,
           this.filters.end)   
          //this.formatterDateToApi(this.filters.begin), 
          //this.formatterDateToApi(this.filters.end))
        this.getAttendances({ url: urlName, params: this.params() })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          this.setMessage(this.message({ status: err.response.status, data: 'atendimento' }))
          //reject(err)
        })
     // })
      
    },
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
