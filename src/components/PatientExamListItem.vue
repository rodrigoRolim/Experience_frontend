<template>
  <div class="patient-exam" :class="getStatus | statusModifiers" @click.self="click">
    <div class="patient-exam__detail" @click.self="click">
      <code-chip :text="mnemonico" transform="uppercase" class="patient-exam__tag"></code-chip>
      <div class="patient-exam__separator-line"></div>
      <div class="patient-exam__name-exam">
         <code-info
          size="lg"
          color="rgba(71, 77, 94, 1)"
          :info="name"     
         />
      </div>
    </div>
    <div class="patient-exam__content" @click.self="click">
      <div class="patient-exam__health-center">
        <code-info
          icon="clinic-medical"
          size="lg"
          description="Posto Realizante"
          color="rgba(71, 77, 94, 1)"
          :info="nameHealthCenter"     
        />
        
      </div>
      <div class="patient-exam__status-exam" @click.self="click">
        <code-chip-status-exams :status="status" />
      </div>
      <div class="patient-exam__checkbox" >
        <code-checkbox
          v-show="status == 'FINALIZADO'"
          text="imprimir"
          none
          color="primary"
        ></code-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
import CodeInfo from './base/CodeInfo'
import CodeChip from "./base/CodeChip";
import CodeChipStatusExams from "./base/CodeChipStatusExams";
import CodeCheckbox from "./base/CodeCheckbox";
import { examStatus } from "../mixins/examStatus";
export default {
  name: "PatientExamList",
  mixins: [examStatus],
  props: {
    status: String,
    name: String,
    nameHealthCenter: String,
    mnemonico: String
  },
  components: {
    CodeChip,
    CodeChipStatusExams,
    CodeCheckbox,
    CodeInfo
  },
  data() {
    return {}
  },
  filters: {
    statusModifiers (status) {
      return "patient-exam--"+status;
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

@import "../styles/colors/__status-colors-exams.scss"

.patient-exam
  display: flex
  flex-direction: column
  justify-content: space-between
  flex-basis: 48.9%
  @include respond-to(handhelds)
    flex-basis: 100%
  padding-left: 10px
  border-radius: 2px
  min-height: 120px
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
.patient-exam__content
  display: flex
  justify-content: space-between
.patient-exam__name-exam
  display: flex
  flex-direction: row
  align-items: center
  width: 100%
.patient-exam__health-center
  align-self: flex-start
  cursor: default
  margin-left: 20px
.patient-exam__separator-line
  content: "|"
  display: flex
  flex-direction: column
  margin: 25px 0px
.patient-exam__status-exam
  align-self: flex-start
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
.patient-exam--pendencies
  @include card-status-exams($status: "PENDENCIES", $border-large: left, $transparent: true)
.patient-exam--finished
  @include card-status-exams($status: "FINALIZED", $border-large: left, $transparent: true)
.patient-exam--waiting
  @include card-status-exams($status: "WAITING", $border-large: left, $transparent: true)
.patient-exam--in-progress
  @include card-status-exams($status: "IN-PROGRESS", $border-large: left, $transparent: true)
.patient-exam--no-realized-yet
  @include card-status-exams($status: "NO-REALIZED-YET", $border-large: left, $transparent: true)
</style>