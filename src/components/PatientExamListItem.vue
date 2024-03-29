<template>
  <div 
    class="patient-exam" 
    :class="getClasses"
    @click.self="click(status)">
    <div class="patient-exam__detail" @click="click(status)">
      <code-chip :text="mnemonico" transform="uppercase" class="patient-exam__tag" />
      <div class="patient-exam__separator-line"></div>
      <div class="patient-exam__name-exam" >
        <code-info
          size="lg"
          color="rgba(71, 77, 94, 1)"
          :info="name"     
        />
      </div>
      <div class="patient-exam__collect" >
        <code-info
          sizeInfo="0.6rem"
          color="rgba(71, 77, 94, 1)"
          description="data coleta"
          :info="collectDate"     
        />
      </div>
    </div>
    <div class="patient-exam__print-in-lab" v-if="printInLab">
      <small>Este exame só poderá ser impresso no laboratorio</small>
    </div>
    <div class="patient-exam__status-exam" @click="click(status)">
      <code-chip-status-exams :status="status" />
    </div>
    <div class="patient-exam__content">
      <div class="patient-exam__right">
        <div class="patient-exam__health-center" @click="click(status)">
          <code-info
            icon="clinic-medical"
            size="lg"
            description="Posto Realizante"
            color="rgba(71, 77, 94, 1)"
            :info="nameHealthCenter"     
          />
        </div>
      </div>
      <div class="patient-exam__checkbox" @click="'javascript:void(0)'">
        <code-checkbox
          v-show="status === 'FINALIZADO' && !printInLab"
          text="imprimir"
          none
          color="primary"
          name="correl"
          :checked="checked(correl)"
          :value="correl.toString()"
          @click="checkExamToPrint"
        />
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
import { mapMutations, mapGetters } from "vuex";
import { NAMESPACED_EXAMS, CHECKED_EXAM, UNCHECKED_EXAM } from "../utils/alias"
export default {
  name: "PatientExamList",
  mixins: [examStatus],
  props: {
    status: String,
    name: String,
    nameHealthCenter: String,
    mnemonico: String,
    correl: Number,
    typeDelivery: String,
    collectDate: String
  },
  components: {
    CodeChip,
    CodeChipStatusExams,
    CodeCheckbox,
    CodeInfo
  },
  data() {
    return {
    }
  },
  mounted () {

  },
  filters: {
    statusModifiers (status) {
      return "patient-exam--"+status;
    }
  },
  computed: {
    getClasses() {
      return [
        `patient-exam--${this.getStatus}`, 
        { 'patient-exam--print-in-lab': this.printInLab }
      ]
      
    },
    ...mapGetters(NAMESPACED_EXAMS, [
      'checked'
    ]),
    printInLab() {
 
      return this.typeDelivery !== '*' && this.status === 'FINALIZADO'
    }
  },
  methods: {
    click (status) {
      if (status === 'FINALIZADO' && !this.printInLab) {
        this.$emit('click')
      }
    },
    checkExamToPrint (checkbox) {
      if (checkbox.checked) {
        this.checkExam(checkbox.value)
      } else {
        this.uncheckExam(checkbox.value)
      }
    },
    ...mapMutations(NAMESPACED_EXAMS, {
      checkExam: CHECKED_EXAM,
      uncheckExam: UNCHECKED_EXAM
    })
  }
};
</script>
<style lang="sass" scoped>

@import "../styles/colors/__status-colors-exams.scss"
@import "../styles/__themes.sass"
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
  -webkit-box-shadow: 0 1px 0 rgb(9 30 66 / 25%)
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%)
.patient-exam:hover
  -webkit-box-shadow:  0 0 6px rgba(0,0,0,.3)
  box-shadow:  0 0 6px rgba(0,0,0,.3)
.patient-exam__detail
  width: 100%
  align-self: flex-start
  display: flex
  flex-direction: row
  justify-content: center
.patient-exam__content
  display: flex
  padding: 5px
.patient-exam__right
  display: flex
  justify-content: space-between
  @include respond-to(medium-screens)
    width: 290px
.patient-exam__name-exam
  display: flex
  flex-direction: row
  align-items: center
  width: 100%
.patient-exam__collect
  display: flex
  flex-direction: row
  align-items: center
  justify-content: flex-end
  margin-right: 10px
  width: 100%
.patient-exam__health-center
  align-self: flex-start
.patient-exam__separator-line
  content: "|"
  display: flex
  flex-direction: column
  margin: 25px 0px
.patient-exam__status-exam
  width: 100%
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
.patient-exam__checkbox
  align-self: flex-end
  min-height: 29px
  margin-left: auto
.patient-exam__print-in-lab
  color: $color__danger
  padding-bottom: 15px
.patient-exam--print-in-lab
  opacity: 0.6
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
.patient-exam--finished:hover
  cursor: pointer
</style>