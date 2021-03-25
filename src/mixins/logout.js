import { mapActions, mapMutations } from 'vuex'
import { 
  NAMESPACED_AUTH,
  NAMESPACED_ATTENDANCE,
  NAMESPACED_ACCOMODATIONS,
  NAMESPACED_HEALTH_CENTERS,
  NAMESPACED_REGISTRANTS,
  AUTH_LOGOUT, 
  NAMESPACED_PROPS,
  CLEAN_PROPS,
  REINIT_STATE,
  NAMESPACED_EXAMS,
  NAMESPACED_RESULTS
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
    ...mapMutations(NAMESPACED_REGISTRANTS, {
      reinitRegistrants: REINIT_STATE
    }),
    ...mapMutations(NAMESPACED_HEALTH_CENTERS, {
      reinitHealthCenters: REINIT_STATE
    }),
    ...mapMutations(NAMESPACED_ACCOMODATIONS, {
      reinitAccomodations: REINIT_STATE
    }),
    ...mapMutations(NAMESPACED_RESULTS, {
      reinitResults: REINIT_STATE
    }),
    realizeLogout () {
    
      this.showLoadLogout = true
      let isLoggedout = this.logout()
      if (isLoggedout) {
        this.reinitAllStateFromStore()
        this.locationToLoginPage()
      }
      this.showLoadLogout = false
    },
    locationToLoginPage() {
      let currLoginPath = JSON.parse(localStorage.getItem('custom-access')).rootPath
      localStorage.removeItem('custom-access')
      this.$router.push({ path: currLoginPath }).catch((e) => {
        console.error({e})
      })
    },
    reinitAllStateFromStore() {
      this.reinitAttendancesState()
      this.reinitExamsState()
      this.reinitRegistrants()
      this.reinitHealthCenters()
      this.reinitAccomodations()
      this.reinitResults()
      this.clearProps()
    }
  }
}
