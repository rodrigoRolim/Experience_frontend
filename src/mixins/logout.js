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
    realizeLogout () {

      let isLoggedout = this.logout()
      this.showLoadLogout = true
      if (isLoggedout) {
        this.$router.push({ path: ACESS_ROUTE }).catch((e) => {
          console.log(e)
        })
      }
    }
  }
}
