<template>
  <div class="patient-list-filter">
    <code-drop-down text="Filtrar pacientes" dropdown>
      <template v-slot:content>
        <div class="patient-list-filter__period">
          <code-label 
            class="patient-list-filter__label"
            label="Período"
            color="white"
            :font-weight="400"
            font-size="0.9rem"
            font-family='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          />
          <div class="patient-list-filter__calendars">
            <patient-list-filter-period></patient-list-filter-period>
          </div>
        </div>
        <div class="patient-list-filter__name-patient">
          <code-label
            class="patient-list-filter__label"
            label="Nome do Paciente"
            bind="patientName"
            color="white"
            :font-weight="400"
            font-size="0.9rem"
            font-family='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          />
          <code-input 
            placeholder="digite o nome do paciente"
            name="patientName"
            :width="9"
            :height="8" 
          />
        </div>
        <div class="patient-list-filter__buttons">
          <code-button
            class="patient-list-filter__button"
            text="filtrar"
            name-icon="filter"
            borded
            bolded
            letters="uppercase"
            color="light"
            size="md"
            streched
            size-icon="lg"
          />
        </div>
      </template>
    </code-drop-down>
  </div>
</template>

<script>
import CodeDropDown from '../components/base/CodeDropDown'
import CodeLabel from '../components/base/CodeLabel'
import CodeInput from '../components/base/CodeInput'
import CodeButton from '../components/base/CodeButton'
import PatientListFilterPeriod from '../components/PatientListFilterPeriod'
export default {
  name: 'PatientListFilter',
  components: {
    CodeDropDown,
    PatientListFilterPeriod,
    CodeLabel,
    CodeInput,
    CodeButton
  }
}
</script>

<style lang="sass" scoped>
.patient-list-filter__name-patient
  width: 50%
.patient-list-filter__period
  width: 30%
.patient-list-filter__buttons
  display: flex
  align-items: flex-end
  justify-content: center
  width: 18%
  height: 8.5vh
.patient-list-filter__name-patient,
.patient-list-filter__period,
.patient-list-filter__buttons
  @include respond-to(handhelds)
    width: 100%
    margin: 10px 0

</style>