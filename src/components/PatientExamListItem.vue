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
    <div class="ctrl-exam">
      <div class="btn-download-pdf">
        <code-button
          round
          radius="30px"
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
          radius="30px"
          bcolor="rgba(0,0,0,0)"
          color="white"
          class="btn-d-pdf"
          icon="file-pdf"
          sizeIcon="lg"
        ></code-button>
      </div>
    </div>
  </div>
</template>
<script>
import CodeChip from './base/CodeChip'
import CodeChipSituation from './base/CodeChipSituation'
import CodeButton from './base/CodeButton'
export default {
  name: 'PatientExamList',
  components: {
    CodeChip,
    CodeChipSituation,
    CodeButton
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
  flex-direction: column
  justify-content: flex-start
  width: 100%
  border: 1px solid #1ab394
  background-color: #1ab39408
  border-top-width: 5px
  min-height: 200px
  padding-top: 20px
  margin: 0 5px
.detail-exam
  display: flex
  flex-direction: row
  justify-content: center
  margin-bottom: 20px
.name-exam p
  margin: 0
  padding: 0
  color: rgba(0,0,0, 0.8)
  font-size: .9rem 
.wall
  content: " "
  border: 0.8px solid gray
  min-height: 16px
  margin: 0px 7px
.situation-exam
  margin-top: 20px
  display: flex
  flex-direction: row
  justify-content: center
.btn-view-pdf,
.btn-download-pdf
  background-color: #1ab394
.btn-d-pdf,
.btn-v-pdf
  margin: 3px
.ctrl-exam
  margin-top: 18%
  display: flex
  flex-direction: row
  align-self: flex-end
</style>