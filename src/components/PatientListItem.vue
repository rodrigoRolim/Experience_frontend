<template>
  <div class="patient" @click="patientExamsView">
    <div class="patient__header">
      <strong class="patient__name">madalena meretriz aids</strong>
    </div>
    <div class="patient__body">
      <div class="patient__perfil">
        <!-- <div class="patient__personal-dates"> -->
          <div class="patient__sex patient--margin">
            <code-info 
              class="icon"
              icon="mars"
              info="masculino"
              description="sexo"
              color="rgb(71, 77, 94)"
              size="lg"
            />
          </div>
          <div class="patient__age patient--margin">
            <code-info
              class="icon" 
              icon="birthday-cake"
              info="30 anos"
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
        <patient-list-item-attendances />
        <patient-list-item-attendances />
        <patient-list-item-attendances />
        <patient-list-item-attendances />
      </div>
    </div>
  </div>
</template>
<script>
import CodeInfo from './base/CodeInfo'
import PatientListItemAttendances from './PatientListItemAttendances'
export default {
  name: 'PatientListItem',
  components: {
    CodeInfo,
    PatientListItemAttendances
  },
  methods: {
    patientExamsView () {
      this.$router.push('/medico/paciente/1/1')
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