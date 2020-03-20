<template>
  <code-filter>
    <template v-slot:filters>
      <div class="period-date">
       <!--  <code-data-picker 
          padding="6px 7px"
          paddingIcon="8px 13px"
          :hasIcon="true"
          name="period"
        ></code-data-picker> -->
      </div>
      <div class="input-health-center">
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
          :hasIcon="false"
        ></code-select>
      </div>
      <div class="input-accomodation">
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
          :hasIcon="false"
        ></code-select>
      </div>
       <div class="input-situation">
        <code-label
          label="Situação"
          color="white"
          :fontWeight="400"
          fontSize="0.9rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <code-select
          name="acomodacoes"
          option="selecione a acomodação"
          :options="list"
          :hasIcon="false"
        ></code-select>
      </div>
       <div class="input-health-center-realizer">
        <code-label
          label="Posto Realizante"
          color="white"
          :fontWeight="400"
          fontSize="0.9rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <code-select
          name="acomodacoes"
          option="selecione a acomodação"
          :options="list"
          :hasIcon="false"
        ></code-select>
      </div>
    </template>
    <template v-slot:button>
       <code-button
        padding="10px 0"
        text="Filtrar"
        bcolor="white"
        color="gray"
        :fontWeight="600"
        @click="filter()"
      >
        <template v-slot:icon>
          <font-awesome-icon icon="filter" size="1x"></font-awesome-icon>
        </template>
      </code-button>
    </template>
  </code-filter>
</template>
<script>
import CodeFilter from './base/CodeFilter.vue'
import CodeSelect from './base/CodeSelect.vue'
import CodeLabel from './base/CodeLabel.vue'
import CodeButton from './base/CodeButton.vue'
/* import CodeDataPicker from './base/CodeDataPicker.vue' */
export default {
  name: 'AttendanceListFilter',
  components: {
    CodeButton,
    CodeSelect,
    CodeLabel,
    CodeFilter,
   /*  CodeDataPicker */
  },
  data () {
    return {
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
    filter () {

    }
  }
}
</script>
<style lang="sass" scoped>
.input-health-center,
.input-accomodation,
.input-situation,
.input-health-center-realizer
  width: 23%
  @include respond-to(handhelds)
    margin: 3px 0
    width: 100%
</style>