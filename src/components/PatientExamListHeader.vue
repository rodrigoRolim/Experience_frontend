<template>
  <div class="patient-exams__header">
    <code-info
      size="lg"
      description="paciente"
      info="RODRIGO ROLIM VERAS"
      color="rgba(71, 77, 94, 1)"
      size-info="0.9rem"
    />
    <code-drop-down bcolor="white" text="detalhes" dropdown>
      <template v-slot:content>
        <div class="patient-exams__patient-info">
          <code-info 
            class="patient-exams--margin patient-exams__info"
            icon="birthday-cake"
            size="lg"
            description="idade"
            info="27 anos"
            color="rgba(71, 77, 94, 1)"
          />
          <code-info
            class="patient-exams--margin patient-exams__info"
            icon="mars"
            size="lg"
            description="sexo"
            info="masculino"
            color="rgba(71, 77, 94, 1)"
          />
          <code-info 
            icon="clock"
            size="lg"
            class="patient-exams--margin patient-exams__info"
            description="previsão entrega"
            info="15/10/2020"
            color="rgba(71, 77, 94, 1)"
          />
          <code-info
            class="patient-exams--margin patient-exams__info"
            icon="user-md"
            size="lg"
            description="médico solicitante"
            info="Dr. Alexandre Magno de Carvalo"
            color="rgba(71, 77, 94, 1)"
          />
        </div>
      </template>
    </code-drop-down>
  </div>
</template>

<script>
import CodeInfo from './base/CodeInfo'
import CodeDropDown from './base/CodeDropDown'
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
  flex-direction: column
  background-color: white
  @include respond-to(handhelds)
    flex-direction: column
    width: 100%
  border-bottom: 1px solid rgba(0,0,0,0.1)
  padding: 15px 10px 0px 10px
.patient-exams--margin
  margin: 10px
.patient-exams__patient-info
  display: flex
  flex-direction: row
  align-items: flex-start
  justify-content: space-between
  width: 100%
  @include respond-to(medium-screens)
    width: 100%
    padding: 4px 19px
  @include respond-to(handhelds)
    width: 100%
    flex-direction: column
    justify-content: space-between
.patient-exams__title
  display: flex
  flex-direction: row
  font-size: 1.0rem
.patient-exams__name
  margin-left: 10px
  font-size: 1.0rem
  @include respond-to(medium-screens)
    padding: 4px 19px
  @include respond-to(handhelds)
    text-align: center
.patient-exams__title--capitalize
  text-transform: capitalize
.patient-exams__attendance-datas
  display: flex
  flex-direction: row
  width: 100%
  @include respond-to(handhelds)
    flex-direction: column
</style>