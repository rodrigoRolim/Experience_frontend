<template>
  <code-drop-down text="Filtrar Atendimento" dropdown :close-dropdown="closeDropdown">
    <template v-slot:content >
      <div class="attendance-painel-filter">
        <div class="attendance-painel-filter__accomodation">
          <code-select
            name="acomodacoes"
            option="selecione a acomodação"
            label="acomodacão"
            label-color="text"
            :options="accomodations"
            @input="setAccomodation"
            :value="params.accomodation"
            :error="validate.accomodation"
          ></code-select>
        </div>
        <div class="attendance-painel-filter__buttons">
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
            :disable="disableConfirm"
            :loading="disableConfirm"
            @click.prevent="confirm"
          />
        </div>
      </div>
    </template>
  </code-drop-down>
</template>

<script>
import CodeDropDown from './base/CodeDropDown.vue'
import CodeSelect from "./base/CodeSelect";
export default {
  name: "AttendancesPainelListFilter",
  components: {
    CodeDropDown,
    CodeSelect
  },
  data() {
    return {
      closeDropdown: false
    }
  }
}
</script>

<style lang="sass" scoped>

</style>