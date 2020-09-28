<template>
  <div class="attendances" >
    <attendance-list-item
      v-for="(attendance, i) in attendances" v-bind:key="i"
      :name="attendance.nome_cliente"
      :age="attendance.data_nas | age"
      :gender="attendance.sexo | sex"
      :idAttendance="attendance.posto | id(attendance.atendimento)"
      :agreement="attendance.nome_convenio"
      :dataAttendance="attendance.data_atd | date"
      :dataDelivery="attendance.data_entrega | date"
      :exams="attendance.mnemonicos"
      :situation="attendance.situacao_exames_experience"
      :patient="attendance.registro.toString()"
    ></attendance-list-item>
  </div>
</template>
<script>
import AttendanceListItem from './AttendanceListItem'
import { mapGetters } from 'vuex'
import { NAMESPACED_ATTENDANCE } from '../utils/alias'
export default {
  name: 'AttendanceList',
  props: {
    route: String 
  },
  components: {
    AttendanceListItem
  },
  data () {
    return {

    }
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
      'attendances'
    ])
  }
}
</script>
<style lang="sass" scoped>
.attendances
  display: flex
  flex-direction: column
</style>