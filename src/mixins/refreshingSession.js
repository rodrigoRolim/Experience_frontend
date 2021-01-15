import { mapActions } from 'vuex'
import { NAMESPACED_AUTH, REFRESH_TOKEN, REAUTH_REQUEST } from '../utils/alias'
export const refreshingSession = {
  
  methods: {
    ...mapActions(NAMESPACED_AUTH, {
      refreshing: REAUTH_REQUEST
    }),
    getNewToken() {
      let url = REFRESH_TOKEN
      return this.refreshing({url})
        .then((status) => status)
        .catch((err) => err)
    }
  }
}