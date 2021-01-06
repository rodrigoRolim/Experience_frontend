import { mapActions, mapMutations } from 'vuex'
import { 
  NAMESPACED_AUTH,
  NAMESPACED_ATTENDANCE,
  AUTH_LOGOUT, 
  ACESS_ROUTE,
  NAMESPACED_PROPS,
  CLEAN_PROPS,
  REINIT_STATE,
  NAMESPACED_EXAMS
} from '../utils/alias'
export const logout = {
  data () {
    return {
      showLoadLogout: false
    }
  },
  methods: {
    ...mapActions (NAMESPACED_AUTH, {
      logout: AUTH_LOGOUT
    }),
    ...mapMutations(NAMESPACED_ATTENDANCE, {
      reinitAttendancesState: REINIT_STATE
    }),
    ...mapMutations(NAMESPACED_EXAMS, {
      reinitExamsState: REINIT_STATE
    }),
    ...mapMutations(NAMESPACED_PROPS, {
      clearProps: CLEAN_PROPS
    }),
    realizeLogout () {
    
      let isLoggedout = this.logout()
      this.showLoadLogout = true
      if (isLoggedout) {
        this.reinitAttendancesState()
        this.reinitExamsState()
        this.clearProps()
        this.$router.push({ path: ACESS_ROUTE }).catch((e) => {
          console.log(e)
        })
      }
    }
  }
}
