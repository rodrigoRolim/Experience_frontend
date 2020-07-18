<template>
  <code-drop-down text="Filtrar Atendimento" dropdown>
    <template v-slot:content >
      <div class="period">
        <code-label
          class="period__label"
          label="Período"
          color="white"
          :fontWeight="400"
          fontSize="0.9rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <div class="period__dates">
          <attendance-list-filter-period 
            @begin="filters.begin = $event" 
            @end="filters.end = $event"
          />
        </div>
      </div>
      <div class="health-center">
        <code-label
          class="health-center__label"
          label="Posto"
          color="white"
          :fontWeight="400"
          fontSize="0.9rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <code-select
          class="health-center__select"
          name="postos"
          option="selecione o posto"
          :options="list"
          :width="7"
          :height="8"
          v-model="filters.healthCenter"
        ></code-select>
      </div>
      <div class="accomodation">
        <code-label
          class="accomodation__label"
          label="Acomodação"
          color="white"
          :fontWeight="400"
          fontSize="0.9rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <code-select
          class="accomodation__select"
          name="acomodacoes"
          option="selecione a acomodação"
          :options="list"
          :width="7"
          :height="8"
          v-model="filters.accomodation"
        ></code-select>
      </div>
      <div class="situation">
        <code-label
          class="situation__label"
          label="Situação"
          color="white"
          :fontWeight="400"
          fontSize="0.9rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <code-select
          class="situation__select"
          name="situation"
          option="selecione a situação"
          :options="list"
          :width="7"
          :height="8"
          v-model="filters.situation"
        ></code-select>
      </div>
      <div class="health-center-realizer">
        <code-label
          class="health-center-realizer__label"
          label="Posto Realizante"
          color="white"
          :fontWeight="400"
          fontSize="0.9rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <code-select
          class="health-center-realizer__select"
          name="realizer"
          option="selecione posto realizante"
          :options="list"
          :width="7"
          :height="8"
          v-model="filters.realizer"
        ></code-select>
      </div>
      <div class="buttons">
        <code-button
          class="buttons__filter"
          text="filtrar"
          name-icon="filter"
          borded
          bolded
          letters="uppercase"
          color="light"
          size="md"
          streched
          size-icon="lg"
          @click.prevent="confirm"
        />
      </div>
    </template>
  </code-drop-down>
</template>
<script>
import CodeDropDown from './base/CodeDropDown.vue'
import CodeSelect from './base/CodeSelect.vue'
import CodeLabel from './base/CodeLabel.vue'
import CodeButton from './base/CodeButton.vue'
import AttendanceListFilterPeriod from './AttendanceListFilterPeriod'
export default {
  name: 'AttendanceListFilter',
  components: {
    CodeButton,
    CodeSelect,
    CodeLabel,
    CodeDropDown,
    AttendanceListFilterPeriod
  },
  data () {
    return {
      filters: {
        begin: '',
        end: '',
        healthCenter: -1,
        accomodation: -1,
        situation: -1,
        realizer: -1
      },
      list: [
        {id: 1, item: 'doce de laranja'},
        {id: 2, item: 'doce de siriguela'},
        {id: 3, item: 'doce de morango'},
        {id: 4, item: 'doce de abobora'}
      ]
    }
  },
  created () {
  },
  methods: {
    confirm () {

    }
  }
}
</script>
<style lang="sass" scoped>
.health-center,
.accomodation,
.situation,
.health-center-realizer
  width: 15%
  @include respond-to(medium-screens)
    width: 24%
  @include respond-to(handhelds)
    margin: 5px 0
    width: 100%
.buttons
  width: 11%
  align-self: flex-end
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 30px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 40px
.period
  width: 25%
  @include respond-to(medium-screens)
    width: 100%
    margin: 5px 0
  @include respond-to(handhelds)
    width: 100%
    margin: 10px 0
  display: flex
  flex-direction: column
</style>