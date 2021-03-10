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
.patient-list-item-attendances
  display: flex
  flex-direction: column
  justify-content: center
  border: 1px solid lightgray
  padding: 0px 5px
  background-color: white
  border-radius: 4px
  min-width: 140px
  margin: 2px
  @include respond-to(handhelds)
    width: 49%
.patient-list-item-attendances__date,
.patient-list-item-attendances__id
  margin: 8px 0px
@media only screen and (max-width: 466px)
  .patient-list-item-attendances
    width: 100%
</style>