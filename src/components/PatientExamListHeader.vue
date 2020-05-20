<template>
  <div class="patient-exams__header">
    <div class="patient-exams__patient-info">
      <strong class="patient-exams__title patient-exams__title--capitalize">rodrigo rolim veras</strong>
      <div class="patient-exams__personal-info">
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
    <code-drop-down text="detalhes" bcolor="white" class="patient-exams__dropdown" dropdown>
      <template v-slot:content>
        <div class="patient-exams__attendance-detail">
          <strong class="patient-exams__title patient-exams__title--capitalize">detalhe atendimento</strong>
          <div class="patient-exams__attendance-datas">
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
      </template>
    </code-drop-down>
  </div>
</template>

<script>
import CodeInfo from './base/CodeInfo'
import CodeDropDown from './base/CodeDropDown.vue'
export default {
  name: 'PatientExamListHeader',
  components: {
    CodeInfo,
    CodeDropDown
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="sass" scoped>
.patient-exams__header
  display: flex
  flex-direction: row
  margin-top: 20px
  margin-bottom: 5px
  background-color: white
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5) 
  @include respond-to(medium-screens)
    flex-direction: column
  @include respond-to(handhelds)
    flex-direction: column
.patient-exams__patient-info
  display: flex
  flex-direction: column
  padding: 10px
  @include respond-to(medium-screens)
    width: 95%
    margin: 0 auto
  @include respond-to(handhelds)
    width: 100%
  width: 70%
.patient-exams__personal-info
  margin-top: 20px
  display: flex
  justify-content: space-between
  width: 170px
.patient-exams__attendance-detail
  @include respond-to(medium-screens)
    margin-top: 25px
    width: 95%
    margin: 25px auto 0 auto
  @include respond-to(handhelds)
    width: 100%
    margin-top: 20px
  width: 95%
.patient-exams__dropdown
  width: 100%
.patient-exams__title
  display: flex
  flex-direction: row
  justify-content: space-between
  @include respond-to(handhelds)
    flex-direction: column
  @include respond-to(medium-screens)
    width: 22%
  width: 40%
  margin-top: 10px
  font-size: 1.0rem
.patient-exams__title--capitalize
  text-transform: capitalize
.patient-exams__attendance-datas
  display: flex
  flex-direction: row
  justify-content: space-between
  width: 100%
  margin-top: 20px
  @include respond-to(handhelds)
    flex-direction: column
</style>