<template>
  <div class="attendances-painel">
    <attendances-panel-list />
  </div>
</template>

<script>
import AttendancesPanelList from '../components/AttendancesPanelList'
import { mapActions, mapGetters } from 'vuex'
import { GET_CURRENT_ATTENDANCES, NAMESPACED_ATTENDANCES_PANEL, NAMESPACED_AUTH, GET_ATTENDANCES_PAINEL } from '../utils/alias'
//import { end, begin } from '../utils/initialDates'
import { session } from '../mixins/session'
export default {
  name: 'AttendancesPainel',
  mixins: [session],
  components: {
    AttendancesPanelList
  },
  data() {
    return {
      begin: '02 / 11 / 2019',
      end: '10 / 01 / 2021'
    }
  },
  mounted() {
    //let endDate = end()
    //let beginDate = begin()
    this.requestAttendances()
    setInterval(this.requestAttendances, 60000)
  },
  computed: {
    ...mapGetters(NAMESPACED_AUTH, [
      'userTypeAuthed',
      'userId',
      'healthCenterLogged'
    ]),
  },
  methods: {
    ...mapActions(NAMESPACED_ATTENDANCES_PANEL, {
      getCurrentAttendances: GET_CURRENT_ATTENDANCES
    }),
    configUserIdSession() {
     
      return this.healthCenterLogged !== undefined ? this.healthCenterLogged.id : this.userId
    },
    requestAttendances() {
      const urlName = this.getURL(this.begin, this.end)
      this.getCurrentAttendances({ url: urlName, params: {}, headers: { 'X-paginate': false } })
          .then(res => console.log(res))
          .catch(err => console.log({err}))
    },
    getURL(begin, end) {
      let healthCenter = this.configUserIdSession()
      
      const urlName = GET_ATTENDANCES_PAINEL(
            begin.split(" / ").join("-"),
            end.split(" / ").join("-"),
            //this.getTypeUser(this.userTypeAuthed),
            healthCenter,
          )
      return urlName
    }
  }
}
</script>

<style lang="sass" scoped>
.attendances-painel
  min-height: 100vh
  background-color: rgba(0,0,0,0.04)
</style>