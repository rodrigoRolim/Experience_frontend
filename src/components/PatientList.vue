<template>
  <div class="patients">
    <div class="patients__header">
      <span>foram encontrados {{1}} atendimentos para as datas selecionadas</span>
    </div>
    <div class="patient__body" id="patient__list">
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
@import '../styles/_scrollbar.sass'
@include scrollbar($el: '#patient__list', $w: 10px)

.patients
  display: flex
  flex-direction: column
  justify-content: center
  width: 100%
.patients__header
  margin-bottom: 40px
  color: #368c8c
.patient__body
  display: flex
  flex-direction: row
  width: 100%
  flex-wrap: wrap
  max-height: 500px
  padding: 0 10px
  overflow: auto
.patitent__body__item
  margin: 5px
  width: 100%
</style>