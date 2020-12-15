<template>
  <div class="patients">
    <div class="patients__header">
      <span class="patients__number">
        foram encontrados {{total}} atendimentos no período selecionado
      </span>
    </div>
    <div class="patient__body" id="patient__list">
      <code-message
        v-if="message.message"
        class="patients__message"
        :message="message.message || ''"
        :type="message.type"
        position="center"
        icon="info-circle"
      />
      <patient-list-item class="patitent__body__item"
        v-for="(patient, i) in patients"
        :key="i"
        :name="patient.nome_cliente"
        :sex="patient.sexo | sex"
        :age="patient.data_nas | age"
        :phone="patient.telefone | phone"
        :laster-attendances="patient.ultimos_atendimentos"
        :patient-id="patient.registro"
        :attendance-id="patient.atendimento"
        :health-center="patient.posto"
      />
      <div class="patients__loading" v-if="statusPush == 'loading'" >
        <code-message
          :message="messageLoad"
          :typeMessage="typeMessageLoad"
          position="center"
        >
          <template>
            <code-loading class="code-loading"  
            sizeIcon="xs" 
            range="40px" 
            color="dimgray"/>
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
import { NAMESPACED_PATIENT, GET_ATTENDANCES_REQUESTER, PUSH_ATTENDANCES_STORE, NEXT_PAGE, LOAD_PUSH } from '../utils/alias'
export default {
  name: 'PatientList',
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
  filters: {
    sex (value) {

      return [{initial: 'M', value: 'masculino'}, {initial: 'F', value: 'feminino'}]
        .find((sex) => sex.initial === value).value
    },
    age (dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      const ageDate = age.toString()
      return !isNaN(ageDate) ? ageDate : "";
    },
    phone (value) {
      return value.replace(/\s/g, '')
    }
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
    getMoreAttendances () {

      let att = document.getElementById('patient__list')

      if ((window.innerHeight + window.scrollY >= att.offsetHeight + 100) 
          && this.params.page < this.params.totalPages 
          && this.statusPush !== 'loading') {
        let urlName = GET_ATTENDANCES_REQUESTER(
            this.params.begin.split(" - ").join("-"), 
            this.params.end.split(" - ").join("-")
          )
        this.nextPage()
        let headers = {'X-Paginate': true}
        this.requestMoreAttendances({ url: urlName, params: this.paramsQuery(), headers })
          .then((resp) => {
            console.log(resp)
            document.documentElement.scrollTop = 0
          })
          .catch((err) => {
            console.log({err})
          })
       // window.removeEventListener('scroll', this.getMoreAttendances)
      } 
    },
     ...mapActions(NAMESPACED_PATIENT, {
      requestMoreAttendances: PUSH_ATTENDANCES_STORE
    }),
    ...mapMutations(NAMESPACED_PATIENT, {
      nextPage: NEXT_PAGE,
      pushing: LOAD_PUSH
    })
  }
}
</script>
<style lang="sass" scoped>
.patients
  display: flex
  flex-direction: column
.patients__header
  display: flex
  justify-content: center
  align-items: center 
  color: white
  background-color: $theme
  position: fixed
  bottom: 0
  padding: 15px 0
  width: 100%
.patients__number
  font-size: 0.9rem
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