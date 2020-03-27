<template>
  <div class="p-exam-list-item" :class="getSituation">
    <div class="detail-exam">
      <code-chip text="tch" transform="uppercase" class="chip-exam"></code-chip>
      <div class="wall"></div>
      <div class="name-exam">
        <p>nome do exame</p>
      </div>
    </div>
    <div class="situation-exam">
      <code-chip-situation :situation="situation"></code-chip-situation>
    </div>
    <div class="checkbox">
      <code-checkbox></code-checkbox>
    </div>
    <!--  <div class="ctrl-exam">
      
      <div class="btn-download-pdf">
        <code-button
          round
          radius="33px"
          bcolor="rgba(0,0,0,0)"
          color="white"
          class="btn-v-pdf"
          icon="arrow-alt-circle-down"
          sizeIcon="lg"
        >
        </code-button>
      </div>
      <div class="btn-view-pdf">
         <code-button
          round
          radius="33px"
          bcolor="rgba(0,0,0,0)"
          color="white"
          class="btn-d-pdf"
          icon="file-pdf"
          sizeIcon="lg"
        ></code-button>
      </div>
    </div>-->
  </div>
</template>
<script>
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
    CodeCheckbox
  },
  data() {
    return {};
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
  min-height: 70px
  margin-bottom: 10px
.detail-exam
  display: flex
  flex-direction: row
  justify-content: center
.name-exam
  display: flex
  flex-direction: row
  align-items: center
  width: 100%
.name-exam p
  color: rgba(0,0,0, 0.8)
  font-size: .9rem
  margin: 0
.wall:after
  content: "|"
  display: flex
  flex-direction: column
  margin: 25px 10px
.name, 
.situation-exam
  width: 100%
  display: flex
  flex-direction: row
  @include respond-to(medium-screens)
    flex-direction: column
    align-items: center
  @include respond-to(handhelds)
    flex-direction: column
    align-items: center
  justify-content: center
.btn-view-pdf,
.btn-download-pdf
  background-color: #1ab394
.btn-d-pdf,
.btn-v-pdf
  margin: 2px 10px
.checkbox
  display: flex
  flex-direction: row
  justify-content: flex-end
.ctrl-exam
  display: flex
  flex-direction: column
  align-self: flex-end
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
</style>