<template>
  <div class="patients">
    <div class="patients__header">
      <span class="patients__number">
        foram encontrados {{total}} atendimentos no período selecionado
      </span>
    </div>
    <div class="patient__body" ref="patients" >
      <code-message
        v-if="message"
        class="patients__message"
        :message="message.content || ''"
        :type-message="message.type"
        position="center"
        icon="info-circle"
      />
      <patient-list-item class="patitent__body__item"
        v-for="patient in patients"
        :key="patient.atendimento"
        :name="patient.nome_cliente"
        :sex="patient.sexo | sexByInitial"
        :age="patient.data_nas | ageByBirthday"
        :phone="patient.telefone | phoneTrim"
        :doctor="patient.nome_solicitante"
        :delivery-date="patient.data_entrega | dateFormat"
        :lastest-attendances="patient.ultimos_atendimentos"
        :patient-id="patient.registro"
        :attendance-id="patient.atendimento"
        :health-center-id="patient.posto"
        :health-insurance="patient.nome_convenio"
      />
      <div class="patients__loading" v-if="statusPush == 'loading'" >
        <code-message
          :message="messageLoad"
          :typeMessage="typeMessageLoad"
          position="center"
        >
          <template>
            <code-loading 
              class="code-loading"  
              sizeIcon="xs" 
              range="40px" 
              color="dimgray"
            />
          </template>
        </code-message>
      </div>
    </div>
  </div>
</template>
<script>
import PatientListItem from './PatientListItem'
import CodeMessage from './base/CodeMessage'
import CodeLoading from './base/CodeLoading'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { sex, phone, age, date } from '../mixins/formater'
import { NAMESPACED_PATIENT, GET_ATTENDANCES_REQUESTER, PUSH_PATIENT_STORE, NEXT_PAGE, LOAD_PUSH } from '../utils/alias'
export default {
  name: 'PatientList',
  mixins: [sex, phone, age, date],
  components: {
    PatientListItem,
    CodeMessage,
    CodeLoading
  },
  data () {
    return {
      messageLoad: 'carregando mais atendimentos',
      typeMessageLoad: 'default'
    }
  },
  mounted () {
    
    this.loadAttendancesByScroll()
  },
  destroyed () {
    this.destroyAttendancesByScroll()
  },
  computed: {
    ...mapGetters(NAMESPACED_PATIENT, [
      'patients',
      'total',
      'message',
      'status',
      'params',
      'statusPush'
    ])
  },
  methods: {
    loadAttendancesByScroll () {
      window.addEventListener('scroll', this.getMoreAttendances)
    },
    destroyAttendancesByScroll () {
      window.removeEventListener('scroll', this.getMoreAttendances)
    },
    paramsQuery () {
      let queries = {}
      if (this.params.name) queries['nome'] = this.params.name
      queries['limit'] = this.params.limit
      queries['page'] = this.params.page
      
      return queries
    },
    hasMorePatients() {
      let att = this.$refs.patients
      return (window.innerHeight + window.scrollY >= att.offsetHeight + 100) 
          && this.params.page < this.params.totalPages 
          && this.statusPush !== 'loading'
    },
    getURL() {
      const urlName = GET_ATTENDANCES_REQUESTER(
            this.params.begin.split(" - ").join("-"), 
            this.params.end.split(" - ").join("-")
          )
      return urlName
    },
    getMoreAttendances () {

      if (this.hasMorePatients()) {
       
        this.nextPage()
        let headers = {'X-Paginate': true}
        this.requestMoreAttendances({ url: this.getURL(), params: this.paramsQuery(), headers })
          .then(() => {
            this.repositionScrollBar(window.innerHeight + window.scrollY)
          })
          .catch(() => {
            this.repositionScrollBar(window.innerHeight + window.scrollY)
          })
      } 
    },
    repositionScrollBar(pos) {
      document.documentElement.scrollTop = pos
    },
    getDeliveryDate (dateString) {
      const delivery = new Date(dateString).toLocaleDateString("pt-BR")
      return delivery !== "Invalid Date" ? delivery : ""
    },
     ...mapActions(NAMESPACED_PATIENT, {
      requestMoreAttendances: PUSH_PATIENT_STORE
    }),
    ...mapMutations(NAMESPACED_PATIENT, {
      nextPage: NEXT_PAGE,
      pushing: LOAD_PUSH
    })
  }
}
</script>
<style lang="sass" scoped>
@import "../styles/__themes"
.patients
  display: flex
  flex-direction: column
.patients__header
  display: flex
  justify-content: center
  align-items: center 
  color: $color__letters
  background-color: $color__default
  position: fixed
  bottom: 0
  padding: 12px 0
  width: 100%
.patients__number
  font-size: 0.8rem
  @include respond-to(handhelds)
    font-size: 0.7rem
.patient__body
  display: flex
  flex-direction: row
  width: 100%
  flex-wrap: wrap
  justify-content: center
  padding: 0 10px
  margin-bottom: 50px
.patitent__body__item
  margin: 5px
  width: 100%
.patients__message
  width: 400px
  align-self: center
  padding: 30px 0
  margin-top: 100px
  @include respond-to(handhelds)
    width:90%
.patients__loading
  margin: 5px
  width: 100%  
</style>