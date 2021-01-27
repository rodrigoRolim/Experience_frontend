<template>
  <div class="attendance-relation-item">
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
        :info="healthCenter | id(attendance)"
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
import { mapGetters, mapMutations } from 'vuex'
import { NAMESPACED_EXAMS, NAMESPACED_PROPS, SET_PROPS} from '../utils/alias'
import { attendance } from '../mixins/formater' 
export default {
  name: 'AttendanceRelationsItem',
  mixins: [attendance],
  components: {
    CodeInfo
  },
  props: {
    item: Number,
    namePatient: String,
    deliveryDate: String,
    gender: String,
    age: String,
    doctor: String,
    attendanceDate: String,
    listExams: String,
    attendance: Number,
    healthCenter: Number
  },
  created () {
    this.selectItemByDefault()
  },
  watch: {
    healthCenterAndAttendance(value) {
      const hcAndAtt = value.split('|')
      const hc = hcAndAtt[0]
      const att = hcAndAtt[1]
      
      if (+hc === this.healthCenter && +att === this.attendance) {
        this.selectItem()
      }
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_EXAMS, [
      'selected'
    ]),
    healthCenterAndAttendance() {
      return `${this.selected.hc}|${this.selected.att}`
    }
  },
  methods: {
    ...mapMutations(NAMESPACED_PROPS, {
      storeProps: SET_PROPS 
    }),
    selectItem() {
      
      let healthCenter = this.healthCenter
      let attendance = this.attendance
      let namePatient = this.namePatient
      let agePatient = this.age
      let genderPatient = this.gender
      let deliveryDate = this.deliveryDate
      let doctor = this.doctor
      
      this.storeProps({ 
        healthCenter, 
        attendance, 
        namePatient, 
        agePatient, 
        genderPatient, 
        deliveryDate, 
        doctor 
      })
      
      this.$emit('selected', { 
        healthCenter: this.healthCenter,
        attendance: this.attendance 
      })
    },
    selectItemByDefault() {
      if (this.item === 0) {
        this.selectItem()
      }
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
