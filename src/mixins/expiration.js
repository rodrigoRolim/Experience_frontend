import { mapGetters } from 'vuex'
import { NAMESPACED_AUTH } from '../utils/alias'
export const expired = {
  computed: {
    ...mapGetters(NAMESPACED_AUTH, [
      'expired',
      'token'
    ])
  },
  watch: {
    expired (isExpired) {
      if (isExpired) {

      }
    }
  }
}