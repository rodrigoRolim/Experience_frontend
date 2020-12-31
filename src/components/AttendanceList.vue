<template>
  <div class="attendances" ref="attendances">
    <code-message
      v-if="message.message"
      class="attendances__message"
      :message="message.message || ''"
      :type="message.type"
      position="center"
      icon="info-circle"
    />
    <attendance-list-item
      class="attendances_items"
      v-else
      v-for="attendance in attendances" :key="attendance.atendimento"
      :name="attendance.nome_cliente"
      :age="attendance.data_nas | age"
      :gender="attendance.sexo | sex"
      :attendance="attendance.atendimento.toString()"
      :health-center="attendance.posto.toString()"
      :agreement="attendance.nome_convenio"
      :dataAttendance="attendance.data_atd | date"
      :dataDelivery="attendance.data_entrega | date"
      :exams="attendance.mnemonicos"
      :status="attendance.situacao_exames_experience"
      :patient="attendance.registro.toString()"
      :doctor="attendance.nome_solicitante"
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
          color="dimgray"/>
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
  mixins: [session],
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
  filters: {
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
    sex (value) {

      return [{initial: 'M', value: 'masculino'}, {initial: 'F', value: 'feminino'}]
        .find((sex) => sex.initial === value).value
    },
    date (dateString) {
      const delivery = new Date(dateString).toLocaleDateString("pt-BR")
      return delivery !== "Invalid Date" ? delivery : ""
    }
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
    hasMoreAttendances () {
      let att = this.$refs.attendances
      return (window.innerHeight + window.scrollY >= att.offsetHeight + 100) 
          && this.params.page < this.params.totalPages 
          && this.statusPush !== 'loading' && this.statusPush !== 'error' && this.status !== 'loading'
    } 
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
      if (this.params.realizer.id) queries['postocadastro'] = this.params.realizer.id
      if (this.params.healthCenter.id) queries['postorealizante'] = this.params.healthCenter.id
      if (this.params.accomodation.id) queries['acomodacao'] = this.params.accomodation.id
      if (this.params.situation.id) queries['situacao'] = this.params.situation.id
      if (this.params.name) queries['nome'] = this.params.name
      queries['limit'] = this.params.limit
      queries['page'] = this.params.page
      
      return queries
    },
    getMoreAttendances () {

      if (this.hasMoreAttendances) {
        let healthCenter = this.healthCenterLogged || this.userId
        let urlName = GET_ATTENDANCES(healthCenter,
            this.params.begin.split(" - ").join("-"),
            this.params.end.split(" - ").join("-"),
            this.getTypeUser(this.userTypeAuthed))
        this.nextPage()
        let headers = {'X-Paginate': true}
        this.requestMoreAttendances({ url: urlName, params: this.paramsQuery(), headers })
          .then((resp) => {
            console.log(resp)
            this.repositionScrollBar(0)
          })
          .catch((err) => {
            console.log(this.statusPush)
            console.log({err})
            this.repositionScrollBar(0)
          })
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