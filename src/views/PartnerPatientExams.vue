<template>
 <div class="partner-patient">
    <div class="partner-patient__header">
      <patient-exams-list-header
        :patient="parseInt(patient)"
        :health-center="parseInt(healthCenter)"
        :attendance="parseInt(attendance)"
        :name="name"
        :age="age"
        :gender="gender"
        :delivery="delivery"
        :doctor="doctor"
        :attendance-date="attendanceDate"
        :health-insurance="healthInsurance"
      />
    </div>
    <div class="partner-patient__exams">
      <code-modal
        class="partner-patient__modal"
        :display="displayLoading"
        position="center"
      >
        <template v-slot:modal>
          <code-loading
            class="partner-patient__spin"   
            range="50px"
            velocity="1x"
          />
        </template>
      </code-modal>
      <patient-exam-list 
        :patient="parseInt(patient)"
        :health-center="parseInt(healthCenter)"
        :attendance="parseInt(attendance)"
      />
    </div>
  </div>
</template>

<script>
import PatientExamsListHeader from '../components/PatientExamListHeader'
import PatientExamList from '../components/PatientExamList'
import CodeModal from '../components/base/CodeModal'
import CodeLoading from '../components/base/CodeLoading'
import { NAMESPACED_PROPS, NAMESPACED_EXAMS } from '../utils/alias'
import { mapGetters } from 'vuex'

export default {
  name: 'partner-patientPatientExams',
  components: {
    PatientExamsListHeader,
    PatientExamList,
    CodeModal,
    CodeLoading
  },
  computed: {
    ...mapGetters(NAMESPACED_PROPS, [
      'patient',
      'healthCenter',
      'attendance',
      'name',
      'age',
      'gender',
      'delivery',
      'doctor',
      'attendanceDate',
      'healthInsurance'
    ]),
    ...mapGetters(NAMESPACED_EXAMS, [
      'status'
    ]),
    displayLoading () {
      return this.status === 'loading'
    }
  }
}
</script>

<style lang="sass" scoped>
.partner-patient
  display: flex
.partner-patient__main
  width: 100%
  display: flex
  flex-direction: column
  align-items: flex-end
  width: 100%
  @include respond-to(medium-screens)
    margin-left: 0
    width: 100%
  @include respond-to(handhelds)
    margin-top: 0
    margin-left: 0
    width: 100%
.partner-patient__exams
  width: 100%
  margin-top: 98px
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 78px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 108px
.partner-patient__header
  position: fixed
  width: 100%
  z-index: 3
  top: inherit
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
.partner-patient__header--up-hidden
  top: 0
.partner-patient__modal
  position: fixed
  z-index: 2
</style>