<template>
  <div class="patients">
    <div class="patients__header">
      <span class="patients__number">
        foram encontrados {{total}} atendimentos para as datas selecionadas
      </span>
    </div>
    <div class="patient__body" id="patient__list">
      <patient-list-item class="patitent__body__item"
        v-for="(patient, i) in patients"
        :key="i"
        :name="patient.nome_cliente"
        :sex="patient.sexo | sex"
        :age="patient.data_nas | age"
        :laster-attendances="patient.ultimos_atendimentos"
        :patient-id="patient.registro"
      />
    </div>
  </div>
</template>
<script>
import PatientListItem from './PatientListItem'
import { mapGetters } from 'vuex'
import { NAMESPACED_PATIENT } from '../utils/alias'
export default {
  name: 'PatientList',
  components: {
    PatientListItem
  },
  filters: {
    sex (value) {

      return [{initial: 'M', value: 'masculino'}, {initial: 'F', value: 'feminino'}]
        .find((sex) => sex.initial === value).value
    },
    age (dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      const ageDate = age.toString()
      return !isNaN(ageDate) ? ageDate : "";
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_PATIENT, [
      'patients',
      'total'
    ])
  }
}
</script>
<style lang="sass" scoped>
.patients
  display: flex
  flex-direction: column
  justify-content: center
  width: 100%
.patients__header
  display: flex
  justify-content: center
  align-items: center 
  color: white
  background-color: $theme
  position: fixed
  bottom: 0
  padding: 15px 0
  width: 100%
.patients__number
  font-size: 0.9rem
  @include respond-to(handhelds)
    font-size: 0.7rem
.patient__body
  display: flex
  flex-direction: row
  width: 100%
  flex-wrap: wrap
  padding: 0 10px
  margin-bottom: 50px
.patitent__body__item
  margin: 5px
  width: 100%
</style>