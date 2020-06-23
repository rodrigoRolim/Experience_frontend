<template>
  <div class="patients">
    <div class="patients__header">
      <span class="patients__number">foram encontrados {{1}} atendimentos para as datas selecionadas</span>
    </div>
    <div class="patient__body" id="patient__list">
      <patient-list-item class="patitent__body__item"></patient-list-item>
      <patient-list-item class="patitent__body__item"></patient-list-item>
      <patient-list-item class="patitent__body__item"></patient-list-item>
      <patient-list-item class="patitent__body__item"></patient-list-item>
      <patient-list-item class="patitent__body__item"></patient-list-item>
      <patient-list-item class="patitent__body__item"></patient-list-item>
      <patient-list-item class="patitent__body__item"></patient-list-item>
      <patient-list-item class="patitent__body__item"></patient-list-item>
      <patient-list-item class="patitent__body__item"></patient-list-item>
      <patient-list-item class="patitent__body__item"></patient-list-item>
      <patient-list-item class="patitent__body__item"></patient-list-item>
      <patient-list-item class="patitent__body__item"></patient-list-item>
      <patient-list-item class="patitent__body__item"></patient-list-item>
      <patient-list-item class="patitent__body__item"></patient-list-item>
    </div>
  </div>
</template>
<script>
import PatientListItem from './PatientListItem'
export default {
  name: 'PatientList',
  components: {
    PatientListItem
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
  margin-bottom: 40px
  color: #368c8c
.patients__number
  margin-left: 15px
.patient__body
  display: flex
  flex-direction: row
  width: 100%
  flex-wrap: wrap
  max-height: 500px
  padding: 0 10px
.patitent__body__item
  margin: 5px
  width: 100%
</style>