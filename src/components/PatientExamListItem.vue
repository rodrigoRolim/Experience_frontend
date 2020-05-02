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
@import "../styles/_colors.sass"

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
  background-color: #{$EP}08
  border-top: 1px solid $EP
  border-left: 5px solid $EP
  border-right: 1px solid $EP
  border-bottom: 1px solid $EP
.finished
  border-top: 1px solid $TF
  border-left: 5px solid $TF
  border-right: 1px solid $TF
  border-bottom: 1px solid $TF
  background-color: #{$TF}08
.partial-finished
  border-top: 1px solid $PF
  border-left: 5px solid $PF
  border-right: 1px solid $PF
  border-bottom: 1px solid $PF
  background-color: #{$PF}08
.in-progress
  border-top: 1px solid $EA
  border-left: 5px solid $EA
  border-right: 1px solid $EA
  border-bottom: 1px solid $EA 
  background-color: #{$EA}08
.unrealized
  border-top: 1px solid $NR
  background-color: #{$NR}08
  border-left: 5px solid $NR
  border-right: 1px solid $NR
  border-bottom: 1px solid $NR
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