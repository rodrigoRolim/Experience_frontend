
import { mapGetters,  mapMutations } from 'vuex'
import { NAMESPACED_ATTENDANCE, NAMESPACED_PROPS, NAMESPACED_AUTH, AUTH_REINIT_STATUS, EMPTY_PARAMS, CLEAN_PROPS } from '../utils/alias'
export const login = {

  data () {
    return {
      showLoader: false
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_AUTH, [
      'authState',
      'message'
    ])
  },
  methods: {
    ...mapMutations(NAMESPACED_AUTH, {
      reinitState: AUTH_REINIT_STATUS
    }),
    ...mapMutations(NAMESPACED_ATTENDANCE, {
      clearParams: EMPTY_PARAMS
    }),
    ...mapMutations(NAMESPACED_PROPS, {
      clearProps: CLEAN_PROPS
    }),
    success (status, pathName) {
      // debugger // eslint-disable-line
      if (this.authState == 'success' && status == 200) {
        this.showLoader = false
        this.clearParams()
        this.clearProps()
        this.$router.push({ path: pathName })
        .catch((err) => {
        
          this.error(this.message)
          throw new Error(`Problem handling something: ${err}.`);
        })

      }
    },
    error (options = this.message) {
      if (this.authState == 'error') {
        this.showLoader = false
        this.reinitState()
        //if (!reinited) {
          this.emitMessage(options)
        //}
      }
    },
    emitMessage (message) {
      console.log(this.message)
      this.$emit('error', message)
    }
  }
}