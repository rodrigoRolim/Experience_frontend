<template>
  <code-drop-down text="Filtrar Atendimento" dropdown>
    <template v-slot:content >
      <div class="attendance-list-filter-healthcenter">
        <div class="attendance-list-filter-healthcenter__period">
          <code-label
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
        <div class="attendance-list-filter-healthcenter__health-center">
          <code-label
            label="Posto"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-select
            name="postos"
            option="selecione o posto"
            :options="list"
            :width="7"
            :height="8"
            v-model="filters.healthCenter"
          ></code-select>
        </div>
        <div class="attendance-list-filter-healthcenter__accomodation">
          <code-label
            label="Acomodação"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-select
            name="acomodacoes"
            option="selecione a acomodação"
            :options="list"
            :width="7"
            :height="8"
            v-model="filters.accomodation"
          ></code-select>
        </div>
        <div class="attendance-list-filter-healthcenter__situation">
          <code-label
            label="Situação"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-select
            name="situation"
            option="selecione a situação"
            :options="list"
            :width="7"
            :height="8"
            v-model="filters.situation"
          ></code-select>
        </div>
        <div class="attendance-list-filter-healthcenter__realizer">
          <code-label
            label="Posto Realizante"
            color="white"
            :fontWeight="400"
            fontSize="0.9rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-select
            name="realizer"
            option="selecione posto realizante"
            :options="list"
            :width="7"
            :height="8"
            v-model="filters.realizer"
          ></code-select>
        </div>
        <div class="attendance-list-filter-healthcenter__buttons">
          <code-button
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
        healthCenter: null,
        accomodation: null,
        situation: null,
        realizer: null
      },
      list: [
        {id: 1, name: 'doce de laranja'},
        {id: 2, name: 'doce de siriguela'},
        {id: 3, name: 'doce de morango'},
        {id: 4, name: 'doce de abobora'}
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
.attendance-list-filter-healthcenter
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
    max-height: 500px
    overflow-y: auto
    width: 100%
.attendance-list-filter-healthcenter__health-center,
.attendance-list-filter-healthcenter__accomodation,
.attendance-list-filter-healthcenter__situation,
.attendance-list-filter-healthcenter__realizer
  width: 15%
  @include respond-to(medium-screens)
    width: 24%
  @include respond-to(handhelds)
    margin: 5px 0
    width: 100%
.attendance-list-filter-healthcenter__buttons
  width: 10%
  align-self: flex-end
  @include respond-to(medium-screens)
    width: 100%
    margin-top: 30px
  @include respond-to(handhelds)
    width: 100%
    margin-top: 40px
.attendance-list-filter-healthcenter__period
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