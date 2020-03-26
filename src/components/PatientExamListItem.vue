<template>
  <div class="p-exam-list-item">
    <div class="detail-exam">
      <code-chip 
        text="tch" 
        transform="uppercase"
        class="chip-exam"
      ></code-chip>
      <div class="wall"></div>
      <div class="name-exam">
        <p>nome do exame</p>
      </div>
    </div>
    <div class="situation-exam">
      <code-chip-situation
        situation="TF"
      ></code-chip-situation>
    </div>
    <div class="checkbox"><code-checkbox></code-checkbox></div>
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
    </div> -->
  </div>
</template>
<script>
import CodeChip from './base/CodeChip'
import CodeChipSituation from './base/CodeChipSituation'
/* import CodeButton from './base/CodeButton' */
import CodeCheckbox from './base/CodeCheckbox'
export default {
  name: 'PatientExamList',
  components: {
    CodeChip,
    CodeChipSituation,
   /*  CodeButton, */
    CodeCheckbox
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="sass" scoped>
.p-exam-list-item
  display: flex
  flex-direction: row
  justify-content: space-between
  flex-basis: 48.5%
  @include respond-to(handhelds)
    flex-basis: 100%
  @include respond-to(medium-screens)
    flex-basis: 100%
  border: 1px solid #1ab394
  background-color: #1ab39408
  border-top-width: 5px
  margin: 5px 7px
  padding-left: 20px
  border-radius: 2px
  min-height: 70px
.detail-exam
  display: flex
  flex-direction: row
  justify-content: center
.name-exam
  display: flex
  flex-direction: row
  align-items: center
.name-exam p
  color: rgba(0,0,0, 0.8)
  font-size: .9rem
  margin: 0
.wall
  content: " "
  border: 0.8px solid gray
  margin: 20px 9px
.name 
.situation-exam
  display: flex
  flex-direction: row
  @include respond-to(medium-screens)
    flex-direction: column
  @include respond-to(handhelds)
    flex-direction: column
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
</style>