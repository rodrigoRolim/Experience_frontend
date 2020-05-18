<template>
  <div class="patient">
    <div class="patient__perfil">
      <strong class="patient__name">jacinto pinto pedroso</strong>
      <div class="patient__personal-dates">
        <div class="patient__sex">
          <code-info 
            class="icon"
            icon="mars"
            info="masculino"
            description="sexo"
            color="rgb(71, 77, 94)"
            size="lg"
          />
        </div>
        <div class="patient__age">
          <code-info
            class="icon" 
            icon="birthday-cake"
            info="30 anos"
            description="idade"
            color="rgb(71, 77, 94)"
            size="lg"
          />
        </div>
      </div>
    </div>
    <div class="patient__contacts">
      <strong class="patient__name">contatos</strong>
      <div class="patient__contact-items">
        <div class="patient__phones">
          <code-info 
            class="icon"
            icon="phone"
            info="(11) 34228718"
            description="telefone"
            color="rgb(71, 77, 94)"
            size="lg"
          />
        </div>
        <div class="patient__email">
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
    <div class="patient__attendance">
      <div class="patient__date">
        <code-info 
          icon="calendar-check"
          info="07/04/2016"
          description="data atendimento"
          color="rgb(71, 77, 94)"
          size="lg"
        />
      </div> 
      <div class="patient__id">
        <code-info
          icon="heartbeat"
          info="0/0012889"
          description="ID atendimento"
          color="rgb(71, 77, 94)"
          size="lg"
        />
      </div>  
    </div>
  </div>
</template>
<script>
import CodeInfo from './base/CodeInfo'
export default {
  name: 'PatientListItem',
  components: {
    CodeInfo
  }
}
</script>
<style lang="sass" scoped>
.patient
  display: flex
  flex-direction: row
  @include respond-to(medium-screens)
    flex-direction: column
  @include respond-to(handhelds)
    flex-direction: column
  width: 100%
  border: 1px solid lightgray
  border-radius: 4px
  padding: 10px
  background-color: rgba(0,0,0,0.03)
  cursor: pointer
.patient:hover
  -webkit-box-shadow:  0 0 3px rgba(0,0,0,.3)
.patient__perfil
  display: flex
  flex-direction: column
  width: 30%
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
.patient__name
  margin-bottom: 10px
  text-transform: uppercase
.patient__contacts strong
  margin-bottom: 10px
.patient__personal-dates
  display: flex
  @include respond-to(handhelds)
    flex-direction: column
  flex-direction: row
.patient__contacts
  display: flex
  flex-direction: column
  width: 45%
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 20px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 20px
.patient__contact-items
  display: flex
  flex-direction: row
  @include respond-to(handhelds)
    flex-direction: column
.patient__phones
  display: flex
  flex-direction: row
.patient__attendance
  width: 25%
  @include respond-to(medium-screens)
    width: 70%
    margin-top: 20px
    justify-content: space-evenly
    min-height: 50px
    align-self: center
  @include respond-to(handhelds)
    width: 100%
    margin-top: 20px
    display: flex
    flex-wrap: wrap 
    justify-content: space-evenly
    align-items: center
    min-height: 50px
  display: flex
  flex-direction: row
  justify-content: space-evenly
  align-items: center
  background-color: white
  border: 1px solid lightgray
.patient__sex,
.patient__phones
  @include respond-to(medium-screens)
    margin-right: 20px
</style>