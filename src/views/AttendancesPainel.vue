<template>
  <div class="attendances-painel">
    <div class="attendances-painel__filter">
      <AttendancesPainelListFilter />
    </div>
    <attendances-panel-list class="attendances-painel__items"/>
  </div>
</template>

<script>
import AttendancesPanelList from '../components/AttendancesPanelList'
import AttendancesPainelListFilter from "../components/AttendancesPainelListFilter";
import { mapActions, mapGetters } from 'vuex'
import { GET_CURRENT_ATTENDANCES, NAMESPACED_ATTENDANCES_PANEL, NAMESPACED_AUTH, GET_ATTENDANCES_PAINEL } from '../utils/alias'
//import { end, begin } from '../utils/initialDates'
import { session } from '../mixins/session'
export default {
  name: 'AttendancesPainel',
  mixins: [session],
  components: {
    AttendancesPanelList,
    AttendancesPainelListFilter
  },
  data() {
    return {
      begin: '10 / 05 / 2020',
      end: '18 / 05 / 2021'
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
    queryParams() {
      
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
  display: flex
  flex-direction: column
  min-height: calc(100vh - 60px)
  background-color: rgba(0,0,0,0.04)
.attendances-painel__filter
  position: fixed
  width: 100%
  top: 60px
.attendances-painel__items
  margin-top: 100px
</style>