<template>
  <div class="patient" @click="patientExamsView">
    <div class="patient__info-patient">
      <strong class="patient__name">{{name}}</strong>
      <div class="patient__perfil">
        <div class="patient__sex patient--margin" v-if="sex">
          <code-info 
            class="icon"
            :icon="genderIcon"
            :info="sex"
            description="sexo"
            color="rgb(71, 77, 94)"
            size="lg"
          />
        </div>
        <div class="patient__age patient--margin">
          <code-info
            class="icon" 
            icon="birthday-cake"
            :info="age"
            description="idade"
            color="rgb(71, 77, 94)"
            size="lg"
          />
        </div>
        <div class="patient__contact-items">
          <div class="patient__phones patient--margin" v-if="phone">
            <code-info 
              class="icon"
              icon="phone"
              :info="phone"
              description="telefone"
              color="rgb(71, 77, 94)"
              size="lg"
            />
          </div>
          <div class="patient__email patient--margin" v-if="email">
            <code-info
              class="icon"
              icon="envelope"
              :info="email"
              description="email"
              color="rgb(71, 77, 94)"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="patient__attendances">
      <patient-list-item-attendances 
        v-for="(attendance, i) in lastestAttendances"
        :key="i"
        :attendance-id="attendance.posto | id(attendance.atendimento)"
        :attendance-date="attendance.dataAtd | date"
      />
    </div>
  </div>
</template>
<script>
import CodeInfo from './base/CodeInfo'
import PatientListItemAttendances from './PatientListItemAttendances'
import { mapMutations } from 'vuex'
import { SET_PROPS, NAMESPACED_PROPS } from '../utils/alias'
export default {
  name: 'PatientListItem',
  props: {
    name: String,
    sex: String,
    age: String,
    email: String,
    phone: String,
    doctor: String,
    deliveryDate: String,
    lastestAttendances: Array,
    patientId: Number,
    attendanceId: Number,
    healthCenterId: Number,
    healthInsurance: String
  },
  components: {
    CodeInfo,
    PatientListItemAttendances
  },
  filters: {
    id (healthCenter, attendance) {
      
      let hc = healthCenter
      let att = attendance

      if (healthCenter < 10) {
        hc = '00' + healthCenter
      }
      if (healthCenter > 9) {
        hc = '0' + healthCenter
      }
      if (attendance < 10) {
        att = '0000' + attendance
      }
      if (attendance > 9) {
        att = '000' + attendance
      }
      if (attendance > 99) {
        att = '00' + attendance
      }
      if (attendance > 999) {
        att = '0' + attendance
      }
      
      return hc + '/' + att
    },
    date (dateString) {
      const delivery = new Date(dateString).toLocaleDateString("pt-BR")
      return delivery !== "Invalid Date" ? delivery : ""
    }
  },
  computed: {
    genderIcon () {
      return (this.sex === 'masculino') ? 'mars' : 'venus'
    }
  },
  methods: {
    patientExamsView () {
     
      let patient = this.patientId
     /*  let healthCenter = this.healthCenterId
      let attendance = this.attendanceId */
      let namePatient = this.name
      let agePatient = this.age
      let genderPatient = this.sex
      let deliveryDate = this.deliveryDate
      let doctor = this.doctor
      let healthInsurance = this.healthInsurance

      this.storeProps({ patient, /* healthCenter, attendance, */ namePatient, agePatient, genderPatient, deliveryDate, doctor, healthInsurance })
      this.$router.push({ name: 'doctorExamsPatient', params: { patient: this.patientId, attendance: this.attendanceId, healthCenter: this.healthCenterId, healthInsurance}})
    },
    ...mapMutations(NAMESPACED_PROPS, {
      storeProps: SET_PROPS
    })
  }
}
</script>
<style lang="sass" scoped>
.patient
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: flex-start
  width: 100%
  border: 1px solid lightgray
  border-radius: 4px
  padding: 10px
  background-color: rgba(0,0,0,0.03)
  cursor: pointer
  -webkit-box-shadow: 0 1px 0 rgb(9 30 66 / 25%)
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%)
  @include respond-to(medium-screens)
    flex-direction: column
  @include respond-to(handhelds)
    flex-direction: column
.patient__info-patient
  display: flex
  flex-direction: column
  width: 100%
.patient__attendances
  display: flex
  flex-direction: row-reverse
  align-items: flex-start
  justify-content: space-between
  @include respond-to(medium-screens)
    margin-top: 20px
  @include respond-to(handhelds)
    margin-top: 20px
    flex-flow: row wrap
    width: 100%
.patient:hover
  -webkit-box-shadow:  0 0 3px rgba(0,0,0,.3)
.patient__perfil
  display: flex
  flex-direction: row
  justify-content: space-between
  width: 350px
  margin-top: 20px
  @include respond-to(medium-screens)
    flex-direction: row
    width: 50%
  @include respond-to(handhelds)
    flex-direction: column
    width: 70%
.patient__name
  color: rgb(71, 77, 94)
  font-size: 0.9rem
  text-transform: uppercase
.patient__contact-title
  color: rgb(71, 77, 94)
.patient__personal-dates
  display: flex
  @include respond-to(handhelds)
    flex-direction: column
  flex-direction: row
.patient__contacts
  display: flex
  flex-direction: column
  width: 100%
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 20px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 20px
.patient__contact-items
  display: flex
  flex-direction: column
  @include respond-to(handhelds)
    flex-direction: column
.patient__phones,
.patient__age,
.patient__sex
  display: flex
  flex-direction: row
  justify-content: space-between
.patient--margin
  min-width: 118px
  @include respond-to(handhelds)
    margin-top: 10px

</style>