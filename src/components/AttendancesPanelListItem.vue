<template>
<div class="painel-item" :class="getStatus | statusModifier">
  <div class="painel-item__name">{{name}}</div>
  <div class="painel-item__info">
    <code-info
      description="data entrada"
      :info="date | dateAndTime"
      size="lg"
      color="lightslategray"
    />
    <code-info
      class="painel-item__collect"
      description="coleta"
      :info="collectTime"
    />
  </div>
  <div class="painel-item__forecast">
    <span class="painel-item__label">Previsão:</span>
    <span class="painel-item__value">14:00</span>
  </div>
  <div class="painel-item__status">
    <code-chip-status-attendance
      :status="status"
    />
  </div>
  <div class="painel-item__footer">
    <code-progress :numExams="total" :dones="dones"/>
    <div class="painel-item__id">
      <span class="painel-item__label">ID-</span>{{ healthCenter | id(attendance) }}
    </div>
  </div>
</div>
</template>

<script>
import { attendanceStatus } from '../mixins/attendanceStatus'
import CodeInfo from './base/CodeInfo'
import CodeChipStatusAttendance from './base/CodeChipStatusAttendance'
import CodeProgress from './base/CodeProgress'
import { attendance, dateAndTime } from '../mixins/formater'
export default {
  name: 'AttendancesPainelListItem',
  mixins: [attendanceStatus, attendance, dateAndTime],
  components: {
    CodeInfo,
    CodeChipStatusAttendance,
    CodeProgress,
  },
  props: {
    attendance: Number,
    healthCenter: Number,
    name: String,
    status: String,
    date: String,
    attendanceTime: Number,
    total: Number,
    dones: Number,
    collectTime: String,
  },
  data() {
    return {
      timeWaiting: ''
    }
  },
  created() {
    this.counter()
    setInterval(this.counter, 1000)
   
  },
  filters: {
    statusModifier (situation) {
      return 'painel-item--'+situation
    }
  },
  methods: {
   counter() {
      const dateCurr = new Date()
      
      let hours = Math.abs(this.attendanceTime - dateCurr.getTime()) / 36e5
      let integerHours = hours.toString().split(".")[0]
      let minutes = (hours - integerHours)*60
      let integerMinutes = minutes.toString().split(".")[0]
      let seconds = (minutes - integerMinutes)*60
      let secondsInteger = seconds.toString().split(".")[0]

      integerMinutes = (+integerMinutes < 10) ? '0' + integerMinutes : integerMinutes
      secondsInteger = (+secondsInteger < 10) ? '0' + secondsInteger : secondsInteger
      this.timeWaiting = integerHours + ":" + integerMinutes + ":" + secondsInteger
   }
  }
}
</script>

<style lang="sass" scoped>
@import "../styles/colors/__status-colors-attendances.scss"
.painel-item
  display: flex
  flex-direction: column
  width: 320px
  min-height: 207px
  border-radius: 4px
  padding: 5px 5px 10px 5px
  -webkit-box-shadow: 0 1px 0 rgb(9 30 66 / 25%)
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%)
  background-color: #F5F5F
.painel-item__attendance
  width: 100%
.painel-item__name
  font-size: 0.8rem
  margin: 0px 0px 10px 5px
  font-weight: 500
  width: 100%
.painel-item__info
  display: flex
  flex-diretion: row
  width: 300px
  margin-top: 10px
.painel-item__collect
  margin-left: 150px
.painel-item__forecast
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-between
  height: 7vh
  margin: 20px 0 15px 0
.painel-item__status
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  margin: 0 auto
.painel-item__footer
  display: flex
  font-size: 0.6em
  margin: 15px 8px 0 5px
.painel-item__id
  margin-left: auto
  align-self: flex-end
.painel-item__date
  margin-left: 5px
.atendances-painel-list-item__details
  width: 25%
.painel-item--pendency
  @include card-status-attendances($status: "EP", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "EP", $border-large: top, $transparent: true)
.painel-item--finished
  @include card-status-attendances($status: "TF", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "TF", $border-large: top, $transparent: true)
.painel-item--partial-finished
  @include card-status-attendances($status: "PF", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "PF", $border-large: top, $transparent: true)
.painel-item--in-progress
  @include card-status-attendances($status: "EA", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "EA", $border-large: top, $transparent: true)
.painel-item--no-realized
  @include card-status-attendances($status: "NR", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "NR", $border-large: top, $transparent: true)
.painel-item--no-exams
  @include card-status-attendances($status: "SE", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "SE", $border-large: top, $transparent: true)
</style>