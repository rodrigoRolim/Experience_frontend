<template>
  <div class="health-center-patient">
    <div class="health-center-patient__patient" :class="{ 'health-center-patient__patient--up-hidden': hiddenElement }">
      <patient-exams-list-header
        :patient="parseInt(patient)"
        :health-center="parseInt(healthCenter)"
        :attendance="parseInt(attendance)"
        :health-insurance="healthInsurance"
        :attendanceDate="attendanceDate"
        :name="name"
        :age="age"
        :gender="gender"
        :delivery="delivery"
        :doctor="doctor"
      ></patient-exams-list-header>
    </div>
    <div class="health-center-patient__exams">
      <code-modal
        class="health-center-patient__modal"
        :display="displayLoading"
        position="center"
      >
        <template v-slot:modal>
          <code-loading
            class="health-center-patient__spin"   
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
import CodeModal from '../components/base/CodeModal'
import CodeLoading from '../components/base/CodeLoading'
import PatientExamsListHeader from '../components/PatientExamListHeader'
import PatientExamList from '../components/PatientExamList'
import { mapGetters } from 'vuex'
import { hiddenByScroll } from '../mixins/hiddenByScroll'
import { NAMESPACED_PROPS, NAMESPACED_EXAMS } from '../utils/alias'
export default {
  name: 'health-center-patientExams',
  mixins: [hiddenByScroll],
  components: {
    CodeModal,
    CodeLoading,
    PatientExamsListHeader,
    PatientExamList
  },
  computed: {
    ...mapGetters(NAMESPACED_PROPS, [
      'patient',
      'healthCenter',
      'healthInsurance',
      'attendance',
      'attendanceDate',
      'name',
      'age',
      'gender',
      'delivery',
      'doctor'
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
.health-center-patient
  display: flex
.health-center-patient__exams
  width:  100%
  margin-top: 100px
  @include respond-to(medium-screens)
    margin-top: 70px
    width: 100%
  @include respond-to(handhelds)
    width: 100%
.health-center-patient__modal
  z-index: 2
.health-center-patient__modal,
.health-center-patient__patient
  position: fixed
.health-center-patient__patient
  width: 100%
  z-index: 2
  top: inherit
  transition: top 0.3s
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
</style>