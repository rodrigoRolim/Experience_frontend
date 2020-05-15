<template>
  <div class="p-exam-list-item" :class="getSituation" @click.self="click">
    <div class="detail-exam" >
      <code-chip text="lic" transform="uppercase" class="chip-exam"></code-chip>
      <div class="wall"></div>
      <div class="name-exam">
         <code-info
          icon="flask"
          size="lg"
          description="exame"
          color="rgba(71, 77, 94, 1)"
          info="LIPODOGRAMA COMPLETO"     
         />
      </div>
    </div>
    <div class="c-health-care">
      <code-info
        icon="clinic-medical"
        size="lg"
        description="Posto Realizante"
        color="rgba(71, 77, 94, 1)"
        info="MATRIZ"     
      />
        
    </div>
    <div class="situation-exam">
      <code-chip-situation :situation="situation"></code-chip-situation>
    </div>
    <div class="checkbox">
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
/* import CodeButton from './base/CodeButton' */
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
    /*  CodeButton, */
    CodeCheckbox,
    CodeInfo
  },
  data() {
    return {}
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
};
</script>
<style lang="sass" scoped>

@import "../styles/colors/_status-colors.sass"

.p-exam-list-item
  display: flex
  flex-direction: column
  justify-content: space-between
  flex-basis: 32%
  @include respond-to(handhelds)
    flex-basis: 100%
  @include respond-to(medium-screens)
    flex-basis: 48.8%
  padding-left: 20px
  border-radius: 2px
  min-height: 150px
  margin-bottom: 10px
  user-select: none
.p-exam-list-item:hover
  -webkit-box-shadow:  0 0 6px rgba(0,0,0,.3)
  box-shadow:  0 0 6px rgba(0,0,0,.3)
  cursor: pointer
.detail-exam
  align-self: flex-start
  display: flex
  flex-direction: row
  justify-content: center
  cursor: default
.name-exam
  display: flex
  flex-direction: row
  align-items: center
  width: 100%
.c-health-care
  align-self: flex-start
  cursor: default
  margin-top: 6px
  margin-left: 10px
  margin-bottom: 20px
.name-exam p
  color: rgba(0,0,0, 0.8)
  font-size: .9rem
  margin: 0
.wall
  content: "|"
  display: flex
  flex-direction: column
  margin: 25px 0px
.name, 
.situation-exam
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
.checkbox
  align-self: flex-end
  min-height: 44px
.pendency
  @include card-situation($status: "EP", $border-large: left, $transparent: true)
.finished
  @include card-situation($status: "TF", $border-large: left, $transparent: true)
.partial-finished
  @include card-situation($status: "PF", $border-large: left, $transparent: true)
.in-progress
  @include card-situation($status: "EA", $border-large: left, $transparent: true)
.unrealized
  @include card-situation($status: "NR", $border-large: left, $transparent: true)
.icon
  margin-right: 5px
.label
  display: flex
  flex-direction: column
  font-size: 0.7rem
  margin-left: 3px
.label span:first-child
  font-size: 0.65rem
  color: rgba(71, 77, 94, 1)
.label span:last-child
  font-weight: 600
</style>