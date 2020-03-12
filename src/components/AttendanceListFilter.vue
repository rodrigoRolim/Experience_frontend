<template>
  <code-filter>
    <template v-slot:filters>
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
          option="-- selecione o posto --"
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
          option="-- selecione a acomodação --"
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
          option="-- selecione a acomodação --"
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
          option="-- selecione a acomodação --"
          :hasIcon="false"
        ></code-select>
      </div>
    </template>
    
    <template v-slot:button>
       <code-button
        padding="6px 0"
        text="Filtrar"
        bcolor="#34b583"
        color="white"
        :fontWeight="600"
        @click="filter"
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
export default {
  name: 'AttendanceListFilter',
  components: {
    CodeButton,
    CodeSelect,
    CodeLabel,
    CodeFilter
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
@import "../styles/_colors.sass"
.container-filter-att
  background-color: $green
  padding: 10px 5px
.input-health-center
  @include respond-to(wide-screens)
    width: 100%

</style>