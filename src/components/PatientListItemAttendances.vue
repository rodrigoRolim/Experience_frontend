<template>
  <div class="patient-list-item-attendances">
    <div class="patient-list-item-attendances__date">
      <code-info 
        icon="calendar-check"
        :info="attendanceDate"
        description="data atendimento"
        color="rgb(71, 77, 94)"
        size="lg"
      />
    </div> 
    <div class="patient-list-item-attendances__id">
      <code-info
        icon="heartbeat"
        :info="attendanceId"
        description="ID atendimento"
        color="rgb(71, 77, 94)"
        size="lg"
      />
    </div>
  </div>  
</template>

<script>
import CodeInfo from './base/CodeInfo'
export default {
  name: 'PatientListItemAttendances',
  props: {
    attendanceId: String,
    attendanceDate: String
  },
  components: {
    CodeInfo
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="sass" scoped>
.patient-list-item-attendances__date,
.patient-list-item-attendances__id
  display: flex
  margin: 8px 0px

</style>