<template>
  <div class="health-center-patient">
    <div class="health-center-patient__main" >
      <div class="health-center-patient__patient" :class="{ 'health-center-patient__patient--up-hidden': hiddenElement }">
        <patient-exams-list-header
         :patient="parseInt(patient)"
         :health-center="parseInt(healthCenter)"
         :attendance="parseInt(attendance)"
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
      'attendance',
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
  margin-top: 60px
  @include respond-to(handhelds)
    margin-top: 60px
.health-center-patient__main
  width: 100%
  display: flex
  flex-direction: column
  align-items: flex-end
  @include respond-to(medium-screens)
    margin-left: 0
    width: 100%
  @include respond-to(handhelds)
    margin-top: 0
    margin-left: 0
    width: 100%
.health-center-patient__exams
  width:  100%
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
.health-center-patient__modal
  z-index: 2
.health-center-patient__modal,
.health-center-patient__sidebar,
.health-center-patient__patient
  position: fixed
.health-center-patient__sidebar
  width: 360px
  overflow-y: auto
  height: 100vh
  z-index: 4
  @include respond-to(medium-screens)
    overflow-x: hidden
  @include respond-to(handhelds)
    width: 100%
    margin-top: 0px
    height: auto
    position: relative
    z-index: 0
.health-center-patient__patient
  width: 100%
  z-index: 2
  top: 60px
  transition: top 0.3s
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
.health-center-patient__patient--up-hidden
  top: 0
</style>