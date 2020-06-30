<template>
  <div class="patient-exams__header">
    <strong class="patient-exams__name patient-exams__title--capitalize">rodrigo rolim veras</strong>
    <div class="patient-exams__body">
      <div class="patient-exams__patient-info">
        <code-info 
          class="patient-exams__age"
          icon="birthday-cake"
          size="lg"
          description="idade"
          info="27 anos"
          color="rgba(71, 77, 94, 1)"
        />
        <code-info
          class="patient-exams__gender"
          icon="mars"
          size="lg"
          description="sexo"
          info="masculino"
          color="rgba(71, 77, 94, 1)"
        />  
      </div>
      <code-drop-down text="detalhes" bcolor="white" class="patient-exams__dropdown" 
      :dropdown="noDropdownMobile">
        <template v-slot:content>
          <div class="patient-exams__attendance-detail">
            <strong class="patient-exams__title patient-exams__title--capitalize">detalhe atendimento</strong>
            <div class="patient-exams__attendance-datas">
              <code-info
                class="patient-exams__icon"
                icon="calendar-check"
                size="lg"
                description="data atendimento"
                info="12/03/1998"
                color="rgba(71, 77, 94, 1)"
              />
              <code-info 
                icon="clock"
                size="lg"
                class="patient-exams__icon"
                description="previsão entrega"
                info="15/10/2020"
                color="rgba(71, 77, 94, 1)"
              />
              <code-info 
                class="patient-exams__icon"
                icon="heartbeat"
                size="lg"
                description="ID atendimento"
                info="0/198901"
                color="rgba(71, 77, 94, 1)"
              />
              <code-info
                class="patient-exams__icon"
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
  },
  computed: {
    noDropdownMobile () {
      return !( window.innerWidth <= 768 )
    }
  }
}
</script>

<style lang="sass" scoped>
.patient-exams__header
  display: flex
  flex-direction: column
  background-color: white
  @include respond-to(medium-screens)
    flex-direction: column
  @include respond-to(handhelds)
    flex-direction: column
    width: 100%
    min-height: calc(100vh - 100px)
  border-bottom: 1px solid rgba(0,0,0,0.1)
  padding: 15px 10px
.patient-exams__age,
.patient-exams__gender
  margin: 10px
.patient-exams__body
  display: flex
  flex-direction: row
  flex-wrap: wrap
  @include respond-to(medium-screens)
    flex-direction: column
  @include respond-to(handhelds)
    flex-direction: column
    align-items: center
    justify-content: center
    width: 100%
.patient-exams__patient-info
  display: flex
  flex-direction: row
  align-items: flex-start
  @include respond-to(medium-screens)
    width: 95%
    padding: 4px 19px
  @include respond-to(handhelds)
    width: 100%
    flex-direction: column
    justify-content: space-between
  width: 34%
.patient-exams__attendance-detail
  @include respond-to(medium-screens)
    margin-top: 25px
    width: 95%
    margin: 25px auto 0 auto
  @include respond-to(handhelds)
    margin-top: 20px
  width: 100%
.patient-exams__dropdown
  width: 100%
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
  justify-content: space-between
  width: 100%
  margin-top: 15px
  @include respond-to(handhelds)
    flex-direction: column
.patient-exams__icon
  @include respond-to(handhelds)
    margin: 10px 0
</style>