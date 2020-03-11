<template>
  <div class="container-attendance">
    <div class="info-attendance">
      <div class="id-attendance">
        <span><font-awesome-icon icon="heartbeat" size="2x" :style="{color: 'red'}"/></span>
        <div class="label">
          <span>ID Atendimento</span>
          <span>{{idAttendance}}</span>
        </div>
      </div>
      <div class="agreement-attendance">
        <span><font-awesome-icon icon="credit-card" size="2x"/></span>
        <div class="label">
          <span>Convenio</span>
          <span>{{agreement}}</span>
        </div>
      </div>
      <div class="data-attendance">
        <span><font-awesome-icon icon="calendar-check" size="2x" :style="{color: '#008B8B'}"/></span>
        <div class="label">
          <span>Data Atendimento</span>
          <span>{{dataAttendance}}</span>
        </div>
      </div>
      <div class="delivery-attendance">
        <span><font-awesome-icon icon="clock" size="2x" :style="{color: 'gold'}"/></span>
        <div class="label">
          <span>Previsão Entrega</span>
          <span>{{dataDelivery}}</span>
        </div>
      </div>
    </div>
    <div :class="'list-exams ' + getSituation">
      <span><font-awesome-icon icon="flask" size="2x" class="icon" :style="{color: 'green'}"/></span>
      <div class="label">
        <span>Exames</span>
        <span class="exams">{{exams}}</span>
      </div>
    </div>
  </div>
</template>

<script>
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
    situation: String
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="sass" scoped>

@import "../styles/_colors.sass"

$border-value: 1px solid

.container-attendance
  font-size: 0.8rem
  color: #3e3f3f
  margin-top: 3px
  width: 60%
  text-align: justify
.id-attendance,
.agreement-attendance,
.data-attendance,
.delivery-attendance,
.list-exams
  display: flex
  flex-direction: row
  padding-right: 15px
.list-exams
  padding-top: 5px
.info-attendance
  display: flex
  flex-direction: row
  padding-bottom: 5px
.icon
  margin-right: 5px
.label
  display: flex
  flex-direction: column
  font-size: 0.7rem
  margin-left: 3px
.label span:first-child
  font-size: 0.65rem
  color: gray
.label span:last-child
  font-weight: 600
.info-attendance
  display: flex
  flex-direction: row
  padding-bottom: 5px
.pendency
  border-top: $border-value $EP
.finished
  border-top: $border-value $TF
.partial-finished
  border-top: $border-value $PF
.in-progress
  border-top: $border-value $EA
.unrealized
  border-top: $border-value $NR
</style>