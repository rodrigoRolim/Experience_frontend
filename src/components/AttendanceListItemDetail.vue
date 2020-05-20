<template>
  <div class="attendance-detail">
    <div class="attendance-detail__infos">
      <code-info 
        class="attendance-detail__info"
        icon="heartbeat"
        description="ID atendimento"
        :info="idAttendance"
        color="rgba(71, 77, 94, 1)"
        size="2x"
      />
      <code-info
        class="attendance-detail__info"
        icon="credit-card"
        description="convênio"
        :info="agreement"
        color="rgba(71, 77, 94, 1)"
        size="2x"
      />
      <code-info
        class="attendance-detail__info"
        icon="calendar-check"
        description="data atendimento"
        :info="dataAttendance"
        color="rgba(71, 77, 94, 1)"
        size="2x"
      />
      <code-info
        class="attendance-detail__info"
        icon="clock"
        description="previsão entrega"
        :info="dataDelivery"
        color="rgba(71, 77, 94, 1)"
        size="2x"
      />
    </div>
    <hr :class="getSituation | situationModifiers" class="attendance-detail__trace">
    <code-info
      class="attendance-detail__exams" 
      icon="flask"
      description="exames"
      :info="exams"
      color="rgba(71, 77, 94, 1)"
      size="2x"
    />
  </div>
</template>

<script>
import CodeInfo from './base/CodeInfo'
import { situation } from '../mixins/situation'
export default {
  name: 'AttendanceListItemDetail',
  mixins: [situation],
  props: {
    agreement: String,
    idAttendance: String,
    dataAttendance: String,
    dataDelivery: String,
    exams: String,
    situation: String,
    AttendanceExams: String
  },
  components: {
    CodeInfo
  },
  data () {
    return {

    }
  },
  filters: {
    situationModifiers (situation) {
      return 'attendance-detail__trace--'+situation
    }
  }
}
</script>

<style lang="sass" scoped>

@import "../styles/_colors.scss"

$border-value: 1px solid
$p-side: 12px
$p-top-bott: 5px
.attendance-detail
  font-size: 0.8rem
  color: #3e3f3f
  margin-top: 3px
  width: 50%
  text-align: justify
  @include respond-to(handhelds)
    width: 100%
  @include respond-to(medium-screens)
    width: 100%
.attendance-detail__exams
  @include respond-to(handhelds)
    padding: 10px
.attendance-detail__infos
  display: flex
  flex-direction: row
  justify-content: space-between
  padding-bottom: $p-top-bott
  width: 100%
  @include respond-to(handhelds)
    padding: 0 $p-side
    flex-direction: column
    width: 100%
  @include respond-to(medium-screens)
    width: 65%
.attendance-detail__trace--pendency
  border-top: $border-value $EP
  border-left: 0 
.attendance-detail__trace--finished
  border-top: $border-value $TF
  border-left: 0 
.attendance-detail__trace--partial-finished
  border-top: $border-value $PF
  border-left: 0 
.attendance-detail__trace--in-progress
  border-top: $border-value $EA
  border-left: 0 
.attendance-detail__trace--unrealized
  border-top: $border-value $NR
  border-left: 0 
</style>