<template>
  <div class="patient-list-item-attendances">
    <div class="patient-list-item-attendances__date">
      <code-info 
        icon="calendar-check"
        info="07/04/2016"
        description="data atendimento"
        color="rgb(71, 77, 94)"
        size="lg"
      />
    </div> 
    <div class="patient-list-item-attendances__id">
      <code-info
        icon="heartbeat"
        info="0/0012889"
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
  justify-content: flex-start
  align-items: flex-start
  margin: 5px 10px
</style>