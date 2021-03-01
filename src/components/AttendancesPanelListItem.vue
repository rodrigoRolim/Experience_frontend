<template>
  <div class="attendances-painel-list-item" :class="getStatus | statusModifier">
    <div class="attendances-painel-list-item__attendance">
      <h2 class="attendances-painel-list-item__name">{{name}}</h2>
      <div class="attendances-painel-list-item__info">
        <div class="attendances-painel-list-item__date">
          <code-info
            description="data entrada"
            :info="date"
            size="lg"
            color="lightslategray"
          />
        </div>
        <code-chip-status-attendance 
          :status="status"
        />
      </div>
    </div>
    <div class="atendances-painel-list-item__details">
      <div class="attendances-painel-list-item__time">
        <code-info 
          description="tempo esperando"
       
          size-info="15px"
          :info="timeWaiting"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { attendanceStatus } from '../mixins/attendanceStatus'
import CodeInfo from '../components/base/CodeInfo'
import CodeChipStatusAttendance from '../components/base/CodeChipStatusAttendance'
export default {
  name: 'AttendancesPainelListItem',
  mixins: [attendanceStatus],
  components: {
    CodeInfo,
    CodeChipStatusAttendance
  },
  props: {
    name: String,
    status: String,
    date: String,
    attendanceTime: Number
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
      return 'attendances-painel-list-item--'+situation
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
      this.timeWaiting = integerHours + ":" + integerMinutes + ":" + seconds.toString().split(".")[0]
   }
  }
}
</script>

<style lang="sass" scoped>
@import "../styles/colors/__status-colors-attendances.scss"
.attendances-painel-list-item
  display: flex
  flex-direction: row
  justify-content: space-between
  width: 100%
  min-height: 50px
  border-radius: 4px
  padding: 5px 5px 10px 5px
  -webkit-box-shadow: 0 1px 0 rgb(9 30 66 / 25%)
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%)
  background-color: #F5F5F5
.attendances-painel-list-item__name
  margin-left: 5px
  margin-bottom: 15px
  text-transform: uppercase
  width: 100%
.attendances-painel-list-item__info
  display: flex
  flex-diretion: row
  width: 350px
  justify-content: space-between
.attendances-painel-list-item__date
  margin-left: 5px
h2
  font-size: 15px
.atendances-painel-list-item__details
  width: 25%
.attendances-painel-list-item--pendency
  @include card-status-attendances($status: "EP", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "EP", $border-large: top, $transparent: true)
.attendances-painel-list-item--finished
  @include card-status-attendances($status: "TF", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "TF", $border-large: top, $transparent: true)
.attendances-painel-list-item--partial-finished
  @include card-status-attendances($status: "PF", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "PF", $border-large: top, $transparent: true)
.attendances-painel-list-item--in-progress
  @include card-status-attendances($status: "EA", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "EA", $border-large: top, $transparent: true)
.attendances-painel-list-item--no-realized
  @include card-status-attendances($status: "NR", $border-large: left, $transparent: true)
  @include respond-to(handhelds)
    @include card-status-attendances($status: "NR", $border-large: top, $transparent: true)
</style>