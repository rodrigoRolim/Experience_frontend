import { mapActions, mapMutations } from 'vuex'
import { 
  NAMESPACED_AUTH,
  NAMESPACED_ATTENDANCE,
  AUTH_LOGOUT, 
  ACESS_ROUTE,
  EMPTY_ATTENDANCES
} from '../utils/alias'
export const logout = {
  data () {
    return {
      showLoadLogout: false
    }
  },
  methods: {
    ...mapActions (NAMESPACED_AUTH,{
      logout: AUTH_LOGOUT
    }),
    ...mapMutations(NAMESPACED_ATTENDANCE, {
      clearAttendances: EMPTY_ATTENDANCES
    }),
    async realizeLogout () {
      let isLoggedout = await this.logout()
      this.clearAttendances()
      this.showLoadLogout = true
      if (isLoggedout) {
        //this.cancelAllRequest()
        setTimeout(() => {this.$router.push({ path: ACESS_ROUTE })}, 1000)
      }
    }
  }
}
