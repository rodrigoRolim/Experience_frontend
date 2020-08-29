import { mapActions } from 'vuex'
import { NAMESPACED_AUTH, AUTH_LOGOUT, ACESS_ROUTE } from '../utils/alias'
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
    async realizeLogout () {
      let isLoggedout = await this.logout()
      this.showLoadLogout = true//isLoggedout
      if (isLoggedout) {
        console.log(isLoggedout)
        setTimeout(() => {this.$router.push({ path: ACESS_ROUTE })}, 1000)
      }
    }
  }
}
