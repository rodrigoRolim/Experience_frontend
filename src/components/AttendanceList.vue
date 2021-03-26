<template>
  <div class="attendances" ref="attendances">
    <code-message
      v-if="message"
      class="attendances__message"
      :message="message.content || ''"
      :type-message="message.type"
      position="center"
      icon="info-circle"
    />
    <attendance-list-item
      class="attendances_items"
      v-else
      v-for="attendance in attendances" :key="attendance.atendimento"
      :name="attendance.nomeCliente"
      :age="attendance.dataNas | ageByBirthday"
      :gender="attendance.sexo | sexByInitial"
      :attendance="attendance.atendimento.toString()"
      :health-center="attendance.posto.toString()"
      :agreement="attendance.nomeConvenio"
      :dataAttendance="attendance.dataAtd | dateFormat"
      :dataDelivery="attendance.dataEntrega | dateFormat"
      :exams="attendance.mnemonicos"
      :status="attendance.situacaoExamesExperience"
      :patient="attendance.registro.toString()"
      :doctor="attendance.nomeSolicitante"
      :health-insurance="attendance.nomeConvenio"
    ></attendance-list-item>
    <div class="attendances__loading" v-if="statusPush === 'loading'" >
      <code-message
        :message="messageLoad"
        :typeMessage="typeMessageLoad"
        position="center"
      >
        <template>
          <code-loading class="code-loading"
            v-if="statusPush === 'loading'"  
            sizeIcon="xs" 
            range="40px" 
            color="dimgray"
          />
        </template>
      </code-message>
    </div>
  </div>
</template>
<script>
import CodeMessage from './base/CodeMessage'
import CodeLoading from './base/CodeLoading'
import AttendanceListItem from './AttendanceListItem'
import { session } from '../mixins/session'
import { sex, date, age } from '../mixins/formater'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { 
  NAMESPACED_ATTENDANCE, 
  PUSH_ATTENDANCES_STORE, 
  GET_ATTENDANCES, 
  NEXT_PAGE, 
  LOAD_PUSH, 
  NAMESPACED_AUTH 
} from '../utils/alias'
export default {
  name: 'AttendanceList',
  props: {
    route: String 
  },
  mixins: [session, sex, age, date],
  components: {
    AttendanceListItem,
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
    ...mapGetters(NAMESPACED_AUTH, [
      'userTypeAuthed',
      'userId',
      'healthCenterLogged'
    ]),
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'attendances',
      'message',
      'status',
      'params',
      'statusPush'
    ]),
  },
  methods: {
    hasMoreAttendances () {
      let att = this.$refs.attendances
      return (window.innerHeight + window.scrollY >= att.offsetHeight) 
          && this.params.page < this.params.totalPages 
          && this.statusPush !== 'loading' && this.statusPush !== 'error' && this.status !== 'loading' && this.status !== 'error'
    },
    loadAttendancesByScroll () {

      window.addEventListener('scroll', this.getMoreAttendances)
    },
    destroyAttendancesByScroll () {
      window.removeEventListener('scroll', this.getMoreAttendances)
    },
    paramsQuery () {
      let queries = {}
      if (this.params.realizer) queries['postocadastro'] = this.params.realizer.id
      if (this.params.healthCenter) queries['postorealizante'] = this.params.healthCenter.id
      if (this.params.accomodation) queries['acomodacao'] = this.params.accomodation.id
      if (this.params.situation) queries['situacao'] = this.params.situation.id
      if (this.params.name) queries['nome'] = this.params.name
      queries['limit'] = this.params.limit
      queries['page'] = this.params.page
      
      return queries
    },
    configUserIdSession() {
     
      return this.healthCenterLogged !== undefined ? this.healthCenterLogged : this.userId
    },
    getURL() {
      let healthCenter = this.configUserIdSession()
      const urlName = GET_ATTENDANCES(
            healthCenter,
            this.params.begin.split(" - ").join("-"),
            this.params.end.split(" - ").join("-"),
            this.getTypeUser(this.userTypeAuthed)
          )
      return urlName
    },
    getMoreAttendances () {

      if (this.hasMoreAttendances()) {
   
        this.nextPage()
        let headers = {'X-Paginate': true}
        this.requestMoreAttendances({ url: this.getURL(), params: this.paramsQuery(), headers })
          .then(() => this.repositionScrollBar(window.innerHeight + window.scrollY))
          .catch(() => this.repositionScrollBar(window.innerHeight + window.scrollY))
      } 
    },
    repositionScrollBar(pos) {
      document.documentElement.scrollTop = pos
    },
    ...mapActions(NAMESPACED_ATTENDANCE, {
      requestMoreAttendances: PUSH_ATTENDANCES_STORE
    }),
    ...mapMutations(NAMESPACED_ATTENDANCE, {
      nextPage: NEXT_PAGE,
      pushing: LOAD_PUSH
    })
  }
}
</script>
<style lang="sass" scoped>
.attendances
  display: flex
  flex-direction: column
  margin-bottom: 45px
.attendances__message
  width: 400px
  align-self: center
  padding: 30px 0
  margin-top: 100px
  @include respond-to(handhelds)
    width:90%
.attendances__loading
  margin: 5px 
</style>