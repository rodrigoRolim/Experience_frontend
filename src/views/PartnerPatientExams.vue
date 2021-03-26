<template>
 <div class="partner-patient">
    <div class="partner-patient__header" 
     :class="{ 'partner-patient__header--up-hidden': hiddenElement }">
      <patient-exams-list-header
        :patient="parseInt(patient)"
        :health-center="parseInt(healthCenter)"
        :attendance="parseInt(attendance)"
        :name="name"
        :age="age"
        :gender="gender"
        :delivery="delivery"
        :doctor="doctor"
        :attendaceData="attendanceDate"
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
import { hiddenByScroll } from '../mixins/hiddenByScroll'
export default {
  name: 'partner-patientPatientExams',
  mixins: [hiddenByScroll],
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
      'attendanceDate'
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
  @include respond-to(handhelds)
    margin-top: 60px
    margin-bottom: 40px
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
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
.partner-patient__header
  position: fixed
  width: 100%
  z-index: 3
  top: 60px
  transition: top 0.3s
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