<template>
  <div class="patient" @click="patientExamsView">
    <div class="patient__header">
      <strong class="patient__name">{{name}}</strong>
    </div>
    <div class="patient__body">
      <div class="patient__perfil">
        <!-- <div class="patient__personal-dates"> -->
          <div class="patient__sex patient--margin">
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
        <!-- </div> -->
      </div>
      <div class="patient__contacts">
        <!-- <strong class="patient__contact-title">contatos</strong> -->
        <div class="patient__contact-items">
          <div class="patient__phones patient--margin">
            <code-info 
              class="icon"
              icon="phone"
              info="(11) 34228718"
              description="telefone"
              color="rgb(71, 77, 94)"
              size="lg"
            />
          </div>
          <div class="patient__email patient--margin">
            <code-info
              class="icon"
              icon="envelope"
              info="jacintopinto@gmail.com"
              description="email"
              color="rgb(71, 77, 94)"
              size="lg"
            />
          </div>
        </div>
      </div>
      <div class="patient-list-attendances">
        <patient-list-item-attendances 
          v-for="(attendance, i) in lasterAttendances"
          :key="i"
          :attendance-id="attendance.posto | id(attendance.atendimento)"
          :attendance-date="attendance.data_atd | date"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CodeInfo from './base/CodeInfo'
import PatientListItemAttendances from './PatientListItemAttendances'
export default {
  name: 'PatientListItem',
  props: {
    name: String,
    sex: String,
    age: String,
    lasterAttendances: Array,
    patientId: Number
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
      this.$router.push({ name: 'doctorExamsPatient', params: {patient: this.patientId}})
    }
  }
}
</script>
<style lang="sass" scoped>
.patient
  display: flex
  flex-direction: column
  width: 100%
  border: 1px solid lightgray
  border-radius: 4px
  padding: 10px
  background-color: rgba(0,0,0,0.03)
  cursor: pointer
.patient__body
  display: flex
  margin-top: 10px
  @include respond-to(medium-screens)
    flex-direction: column
  @include respond-to(handhelds)
    flex-direction: column
.patient:hover
  -webkit-box-shadow:  0 0 3px rgba(0,0,0,.3)
.patient__perfil
  display: flex
  flex-direction: column
  width: 20%
  @include respond-to(medium-screens)
    flex-direction: row
    width: 100%
  @include respond-to(handhelds)
    width: 100%
.patient-list-attendances
  min-height: 70px
  border-radius: 4px
  padding: 2px 10px
  width: 60%
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 20px
    align-self: center
  @include respond-to(handhelds)
    width: 100%
    margin-top: 20px
    display: flex
    flex-wrap: wrap
    justify-content: space-evenly
    min-height: 50px
  display: flex
  flex-direction: row 
  justify-content: space-evenly
  align-items: center
  background-color: white
  border: 1px solid lightgray
.patient-list-attendances__item
  display: flex
  align-items: center
  justify-content: center
  width: 100%
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
  width: 30%
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
.patient__phones
  display: flex
  flex-direction: row
.patient--margin
  margin: 10px 20px 10px 0
  @include respond-to(handhelds)
    margin: 5px 0
</style>