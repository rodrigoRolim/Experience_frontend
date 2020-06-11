<template>
  <div class="patient-exam" :class="getSituation | situationModifiers" @click.self="click">
    <div class="patient-exam__detail">
      <code-chip text="lic" transform="uppercase" class="patient-exam__tag"></code-chip>
      <div class="patient-exam__separator-line"></div>
      <div class="patient-exam__name-exam">
         <code-info
          icon="flask"
          size="lg"
          description="exame"
          color="rgba(71, 77, 94, 1)"
          info="LIPODOGRAMA COMPLETO"     
         />
      </div>
    </div>
    <div class="patient-exam__health-center">
      <code-info
        icon="clinic-medical"
        size="lg"
        description="Posto Realizante"
        color="rgba(71, 77, 94, 1)"
        info="MATRIZ"     
      />
        
    </div>
    <div class="patient-exam__status-exam">
      <code-chip-situation :situation="situation"/>
    </div>
    <div class="patient-exam__checkbox">
      <code-checkbox
        v-show="situation == 'TF'"
        text="imprimir"
        none
        color="primary"
      ></code-checkbox>
    </div>
  </div>
</template>
<script>
import CodeInfo from './base/CodeInfo'
import CodeChip from "./base/CodeChip";
import CodeChipSituation from "./base/CodeChipSituation";
import CodeCheckbox from "./base/CodeCheckbox";
import { situation } from "../mixins/situation";
export default {
  name: "PatientExamList",
  mixins: [situation],
  props: {
    situation: String
  },
  components: {
    CodeChip,
    CodeChipSituation,
    CodeCheckbox,
    CodeInfo
  },
  data() {
    return {}
  },
  filters: {
    situationModifiers (situation) {
      return "patient-exam--"+situation;
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
};
</script>
<style lang="sass" scoped>

@import "../styles/colors/_status-colors.scss"

.patient-exam
  display: flex
  flex-direction: column
  justify-content: space-between
  flex-basis: 48.9%
  @include respond-to(handhelds)
    flex-basis: 100%
  padding-left: 20px
  border-radius: 2px
  min-height: 200px
  margin-bottom: 10px
  user-select: none

.patient-exam:hover
  -webkit-box-shadow:  0 0 6px rgba(0,0,0,.3)
  box-shadow:  0 0 6px rgba(0,0,0,.3)
  cursor: pointer
.patient-exam__detail
  align-self: flex-start
  display: flex
  flex-direction: row
  justify-content: center
  cursor: default
.patient-exam__name-exam
  display: flex
  flex-direction: row
  align-items: center
  width: 100%
.patient-exam__health-center
  align-self: flex-start
  cursor: default
  margin-top: 6px
  margin-left: 10px
  margin-bottom: 20px
.patient-exam__separator-line
  content: "|"
  display: flex
  flex-direction: column
  margin: 25px 0px
.patient-exam__status-exam
  align-self: center
  display: flex
  flex-direction: row
  @include respond-to(medium-screens)
    flex-direction: column
    align-items: center
  @include respond-to(handhelds)
    flex-direction: column
    align-items: center
  justify-content: center
  cursor: default
.patient-exam__checkbox
  align-self: flex-end
  min-height: 44px
.patient-exam--pendency
  @include card-situation($status: "EP", $border-large: left, $transparent: true)
.patient-exam--finished
  @include card-situation($status: "TF", $border-large: left, $transparent: true)
.patient-exam--partial-finished
  @include card-situation($status: "PF", $border-large: left, $transparent: true)
.patient-exam--in-progress
  @include card-situation($status: "EA", $border-large: left, $transparent: true)
.patient-exam--unrealized
  @include card-situation($status: "NR", $border-large: left, $transparent: true)
</style>