<template>
  <div class="attendances" id="attendances">
    <code-message
      v-if="!isEmpty"
      class="attendances__message"
      :message="message.message || ''"
      :type="message.type"
      position="center"
      icon="info-circle"
    />
    <attendance-list-item
      class="attendances_items"
      v-else
      v-for="(attendance, i) in attendances" v-bind:key="i"
      :name="attendance.nome_cliente"
      :age="attendance.data_nas | age"
      :gender="attendance.sexo | sex"
      :idAttendance="attendance.posto | id(attendance.atendimento)"
      :agreement="attendance.nome_convenio"
      :dataAttendance="attendance.data_atd | date"
      :dataDelivery="attendance.data_entrega | date"
      :exams="attendance.mnemonicos"
      :status="attendance.situacao_exames_experience"
      :patient="attendance.registro.toString()"
    ></attendance-list-item>
    <div class="attendances__loading" v-show="statusPush == 'loading'" >
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
</template>
<script>
import CodeMessage from './base/CodeMessage'
import CodeLoading from './base/CodeLoading'
import AttendanceListItem from './AttendanceListItem'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { NAMESPACED_ATTENDANCE, PUSH_ATTENDANCES_STORE, GET_ATTENDANCES_HEALTH_CENTER, NEXT_PAGE } from '../utils/alias'
export default {
  name: 'AttendanceList',
  props: {
    route: String 
  },
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
  created () {
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
    id (healthCenter, attendance) {
      
      let hc = healthCenter
      let att = attendance

      if (healthCenter < 10) {
        hc = '00' + healthCenter
      }
      if (healthCenter > 9) {
        hc = '0' + healthCenter
      }
      if (attendance < 10) {
        att = '0000' + attendance
      }
      if (attendance > 9) {
        att = '000' + attendance
      }
      if (attendance > 99) {
        att = '00' + attendance
      }
      if (attendance > 999) {
        att = '0' + attendance
      }
      
      return hc + '/' + att
    },
    date (dateString) {
      const delivery = new Date(dateString).toLocaleDateString("pt-BR")
      return delivery !== "Invalid Date" ? delivery : ""
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'attendances',
      'message',
      'status',
      'params',
      'statusPush'
    ]),
    isEmpty () {
      return Object.keys(this.message).length === 0
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
      queries['limit'] = this.params.limit
      queries['page'] = this.params.page
      return queries
    },
    getMoreAttendances () {
      let att = document.getElementById('attendances')
      console.log(this.statusPush)
      if ((window.innerHeight + window.scrollY >= att.offsetHeight) 
          && this.params.page < this.params.totalPages && this.statusPush !== 'loading') {

        let healthCenter = 0
        let urlName = GET_ATTENDANCES_HEALTH_CENTER(healthCenter,
            this.params.begin.split(" - ").join("-"),
            this.params.end.split(" - ").join("-"))
        this.nextPage()
        this.requestMoreAttendances({ url: urlName, params: this.paramsQuery()})
          .then((resp) => {
            console.log(resp)
          })
          .catch((err) => {
            console.log({err})
          })
      }
    },
    ...mapActions(NAMESPACED_ATTENDANCE, {
      requestMoreAttendances: PUSH_ATTENDANCES_STORE
    }),
    ...mapMutations(NAMESPACED_ATTENDANCE, {
      nextPage: NEXT_PAGE
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