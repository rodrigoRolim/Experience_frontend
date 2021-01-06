<template>
  <div class="attendance-relation-item" @click="loadExams">
    <div class="attendance-relation-item__header">
      <code-info
        class="attendance-relation-item__date"
        icon="calendar-alt"
        :info="attendanceDate"
        description="data atendimento"
        size="lg"
      ></code-info>
      <code-info 
        class="attendance-relation-item__id"
        icon="heartbeat"
        size="lg"
        description="ID atendimento"
        :info="getAttendanceID"
      />
    </div>
    <div class="attendance-relation-item__line"></div>
    <div class="attendance-relation-item__body">
      <code-info
        class="attendance-relation-item__exams"
        icon="flask"
        :info="listExams"
        description="exames"
        size="lg"
      />
    </div>
  </div>  
</template>

<script>
import CodeInfo from './base/CodeInfo'
import { attendanceID } from '../mixins/attendanceID'
import { mapActions } from 'vuex'
import { NAMESPACED_EXAMS, GET_EXAMS_STORE, GET_EXAMS_ATTENDANCE } from '../utils/alias' 
export default {
  name: 'AttendanceRelationsItem',
  components: {
    CodeInfo
  },
  mixins: [attendanceID],
  props: {
    attendanceDate: String,
    listExams: String,
    attendance: Number,
    healthCenter: Number
  },
  data () {
    return {

    }
  },
  computed: {
    getAttendanceID() {
      return this.id(this.healthCenter, this.attendance)
    }
  },
  methods: {
    ...mapActions(NAMESPACED_EXAMS, {
      requestExams: GET_EXAMS_STORE
    }),
    loadExams() {
      let url = GET_EXAMS_ATTENDANCE(this.healthCenter, this.attendance)
      let headers = { 'X-Paginate': false }
      this.requestExams({url, headers})
        .then((resp) => console.log(resp))
        .catch((err) => console.log({err}))
    }
  }
}
</script>

<style lang="sass" scoped>
.attendance-relations-item
  display: flex
  flex-flow: row wrap
  background-color: white
  margin-left: 10px
  color: #368c8c
  padding: 20px 10px
.attendance-relation-item__header
  display: flex
  justify-content: space-between
  width: 250px
  margin-bottom: 10px
.attendance-relation-item__line
  border-bottom: 1px solid
  max-width: 250px
.attendance-relation-item__body
  margin-top: 10px
  width: 100%
  max-width: 250px
</style>
