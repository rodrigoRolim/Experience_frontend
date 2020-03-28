<template>
  <div class="patient-exam-list-header">
    <div class="patient-info">
      <strong>rodrigo rolim veras</strong>
      <div class="gender-age">
        <code-info 
          icon="birthday-cake"
          size="lg"
          description="idade"
          info="27 anos"
          color="rgba(71, 77, 94, 1)"
        />
        <code-info 
          icon="mars"
          size="lg"
          description="sexo"
          info="masculino"
          color="rgba(71, 77, 94, 1)"
        />  
      </div>
    </div>
    <div class="detail-attendance">
      <strong>detalhe atendimento</strong>
      <div class="datas-att">
        <code-info 
          icon="calendar-check"
          size="lg"
          description="data atendimento"
          info="12/03/1998"
          color="rgba(71, 77, 94, 1)"
        />
        <code-info 
          icon="clock"
          size="lg"
          description="previsão entrega"
          info="15/10/2020"
          color="rgba(71, 77, 94, 1)"
        />
        <code-info 
          icon="heartbeat"
          size="lg"
          description="ID atendimento"
          info="0/198901"
          color="rgba(71, 77, 94, 1)"
        />
        <code-info 
          icon="user-md"
          size="lg"
          description="médico solicitante"
          info="Dr. Alexandre Magno de Carvalo"
          color="rgba(71, 77, 94, 1)"
        />
      </div> 
    </div>
  </div>
</template>

<script>
import CodeInfo from './base/CodeInfo'
export default {
  name: 'PatientExamListHeader',
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
.patient-exam-list-header
  display: flex
  flex-direction: row
  margin-top: 20px
  border: 1px solid transparent
  background-color: white
  padding: 15px
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.5)
  @include respond-to(medium-screens)
    flex-direction: column
.patient-info strong
  font-size: 1.0rem
.patient-info
  display: flex
  flex-direction: column
  @include respond-to(medium-screens)
    width: 50%
  width: 45%
.detail-attendance
  @include respond-to(medium-screens)
    margin-top: 25px
    width: 70%
  width: 55%
.gender-age
  display: flex
  flex-direction: row
  justify-content: space-between
  width: 35%
  margin-top: 20px
strong
  text-transform: capitalize
.datas-att
  display: flex
  flex-direction: row
  justify-content: space-between
  width: 100%
  margin-top: 20px
</style>