<template>
  <div class="patient-exams__header">
    <div class="patient-exams__name-checkall">
      <code-info
        size="lg"
        class="patient-exams__patient"
        description="paciente"
        :info="name"
        color="rgba(71, 77, 94, 1)"
        
      />
      <div class="patient-exams__checkall" v-if="someFinalizedExam">
        <code-checkbox
          text="selecionar todos"
          left
          none
          color="primary"
          size="md"
          name="all-exams"
          :checked="allExamsChecked"
          @click="checkAllExams"
        />
      </div>
    </div>
    <code-drop-down bcolor="white" text="detalhes" dropdown>
      <template v-slot:content>
        <div class="patient-exams__patient-info">
          <code-info 
            class="patient-exams--margin patient-exams__info"
            icon="birthday-cake"
            size="lg"
            description="idade"
            :info="age"
            color="rgba(71, 77, 94, 1)"
          />
          <code-info
            class="patient-exams--margin patient-exams__info"
            icon="mars"
            size="lg"
            description="sexo"
            :info="gender"
            color="rgba(71, 77, 94, 1)"
          />
          <code-info
            v-if="attendanceDate"
            icon="clock"
            size="lg"
            class="patient-exams--margin patient-exams__info"
            description="data atendimento"
            :info="attendanceDate"
            color="rgba(71, 77, 94, 1)"
          />
          <code-info 
            icon="clock"
            size="lg"
            class="patient-exams--margin patient-exams__info"
            description="previsão entrega"
            :info="delivery"
            color="rgba(71, 77, 94, 1)"
          />
          <code-info
            class="patient-exams--margin patient-exams__info"
            icon="credit-card"
            size="lg"
            description="convenio"
            :info="healthInsurance"
            color="rgba(71, 77, 94, 1)"
          />
          <code-info
            class="patient-exams--margin patient-exams__info"
            icon="heartbeat"
            size="lg"
            description="atendimento"
            :info="healthCenter | id(attendance)"
            color="rgba(71, 77, 94, 1)"
          />
          <code-info
            class="patient-exams--margin patient-exams__info"
            icon="user-md"
            size="lg"
            description="médico solicitante"
            :info="doctor"
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
import CodeCheckbox from '../components/base/CodeCheckbox'
import { attendance } from '../mixins/formater'
import { mapGetters, mapMutations } from 'vuex'
import { NAMESPACED_EXAMS, CHECKED_ALL_EXAMS, UNCHECKED_ALL_EXAMS, NAMESPACED_PROPS } from '../utils/alias'
export default {
  name: 'PatientExamListHeader',
  mixins: [attendance],
  components: {
    CodeInfo,
    CodeDropDown,
    CodeCheckbox
  },
  computed: {
    ...mapGetters(NAMESPACED_EXAMS, [
      'someFinalizedExam',
      'allExamsChecked'
    ]),
    ...mapGetters(NAMESPACED_PROPS, [
        'healthCenter',
        'attendance',
        'patient',
        'name',
        'age',
        'gender',
        'delivery',
        'doctor',
        'healthInsurance',
        'attendanceDate'
    ])
  },
  data () {
    return {
      
    }
  },
  methods: {
    checkAllExams (checkbox) {
     
      if (checkbox.checked) {

        this.checkExams()
        return
      }
      this.uncheckExams()
    },
    ...mapMutations(NAMESPACED_EXAMS, {
      checkExams: CHECKED_ALL_EXAMS,
      uncheckExams: UNCHECKED_ALL_EXAMS
    })
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
.patient-exams__checkall
  @include respond-to(handhelds)
    align-self: flex-end
.patient-exams__name-checkall
  display: flex
  justify-content: space-between
  @include respond-to(handhelds)
    flex-direction: column
.patient-exams--margin
  margin: 10px 5px
.patient-exams__patient-info
  display: flex
  flex-direction: row
  flex-wrap: wrap
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
.patient-exams__patient
  @include respond-to(handhelds)
    font-size: 10px
.patient-exams__title--capitalize
  text-transform: capitalize
.patient-exams__attendance-datas
  display: flex
  flex-direction: row
  width: 100%
  @include respond-to(handhelds)
    flex-direction: column
</style>