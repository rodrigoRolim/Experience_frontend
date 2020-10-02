<template>
  <code-drop-down dropdown text="filtrar atendimento">
    <template v-slot:content>
      <div class="attendances-filter-partner">
        <div class="attendances-filter-partner__period">
          <code-label
            class="attendances-filter-partner__label"
            label="Período"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          />
          <div class="attendances-filter-partner__calendars">
            <attendance-list-filter-period 
            :begin="'20-09-20'"
            :end="'01-10-20'"
            v-model="period"/>
          </div>
        </div>
        <div class="attendances-filter-partner__accomodation">
          <code-label
            class="attendances-filter-partner__label"
            label="Acomodação"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          />
          <code-select
            class="attendances-filter-partner__select"
            name="acomodations"
            option="selecione a acomodação"
            :options="list"
          />
        </div>
        <div class="attendances-filter-partner__situation">
          <code-label
            class="attendances-filter-partner__label"
            label="Situação"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          />
          <code-select
            class="attendances-filter-partner__select"
            name="situation"
            option="selecione a situação"
            :options="list"
            :width="9"
            :height="8" 
          />
        </div>
        <div class="attendances-filter-partner__patient-name">
          <code-label
            class="attendances-filter-partener__label"
            label="nome paciente"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          />
          <code-input 
            class="attendances-filter-partner__input"
            placeholder="digite o nome do paciente"
            name="patientName"
          />
        </div>
        <div class="attendances-filter-partner__buttons">
          <code-button
            class="attendances-filter-partner__filter"
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
      </div>
    </template>
  </code-drop-down>
</template>

<script>
import CodeDropDown from '../components/base/CodeDropDown'
import CodeLabel from '../components/base/CodeLabel'
import CodeSelect from '../components/base/CodeSelect'
import CodeInput from '../components/base/CodeInput'
import CodeButton from '../components/base/CodeButton'
import AttendanceListFilterPeriod from '../components/AttendanceListFilterPeriod'
export default {
  name: 'AttendanceListFilterPartner',
  components: {
    CodeDropDown,
    CodeLabel,
    CodeSelect,
    CodeInput,
    CodeButton,
    AttendanceListFilterPeriod
  },
  data () {
    return {
      list: [],
      period: null
    }
  }
}
</script>

<style lang="sass" scoped>
.attendances-filter-partner
  display: flex
  flex-direction: row
  justify-content: space-between
  width: 100%
  padding: 12px 10px
  @include respond-to(medium-screens)
    max-height: 250px
    flex-wrap: wrap
  @include respond-to(handhelds)
    flex-direction: column
    height: 75vh
    max-height: 450px
    overflow-y: auto
    width: 100%
.attendances-filter-partner__accomodation,
.attendances-filter-partner__situation
  width: 15%
  @include respond-to(medium-screens)
    width: 27%
  @include respond-to(handhelds)
    width: 100%
    margin: 5px 0
.attendances-filter-partner__patient-name
  width: 30%
  @include respond-to(medium-screens)
    width: 43%
  @include respond-to(handhelds)
    width: 100%
    margin: 5px 0
.attendances-filter-partner__buttons
  width: 10%
  align-self: flex-end
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 30px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 40px
.attendances-filter-partner__period
  width: 27%
  @include respond-to(medium-screens)
    width: 100%
    margin: 10px 0
  @include respond-to(handhelds)
    width: 100%
    margin: 5px 0
  display: flex
  flex-direction: column
</style>