<template>
  <div class="attendances-painel">
    <attendances-panel-list />
  </div>
</template>

<script>
import AttendancesPanelList from '../components/AttendancesPanelList'
import { mapActions, mapGetters } from 'vuex'
import { GET_ATTENDANCES_STORE, NAMESPACED_ATTENDANCE, NAMESPACED_AUTH, GET_ATTENDANCES } from '../utils/alias'
import { end, begin } from '../utils/initialDates'
import { session } from '../mixins/session'
export default {
  name: 'AttendancesPainel',
  mixins: [session],
  components: {
    AttendancesPanelList
  },
  mounted() {
    let endDate = end()
    let beginDate = begin()
    const urlName = this.getURL(beginDate, endDate)
    this.getAttendances({ url: urlName, params: {}, headers: { 'X-paginate': false } })
        .then(res => console.log(res))
        .catch(err => console.log({err}))
  },
  computed: {
    ...mapGetters(NAMESPACED_AUTH, [
      'userTypeAuthed',
      'userId',
      'healthCenterLogged'
    ]),
  },
  methods: {
    ...mapActions(NAMESPACED_ATTENDANCE, {
      getAttendances: GET_ATTENDANCES_STORE
    }),
    configUserIdSession() {
     
      return this.healthCenterLogged !== undefined ? this.healthCenterLogged : this.userId
    },
    getURL(begin, end) {
      let healthCenter = this.configUserIdSession()
      
      const urlName = GET_ATTENDANCES(
            healthCenter,
            begin.split(" / ").join("-"),
            end.split(" / ").join("-"),
            this.getTypeUser(this.userTypeAuthed)
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