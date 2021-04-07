
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
      'status',
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

      if (this.status == 'success' && status == 200) {
        //this.showLoader = false
        this.clearParams()
        this.clearProps()
        this.$router.push({ path: pathName })
        .catch((err) => {

          this.error(this.message)
          throw new Error(`Problem handling something: ${err}.`);
        })

      }
    },
    error (message = this.message) {
   
      this.showLoader = false
      this.reinitState()

      this.emitMessage(message)
    },
    emitMessage (message) {

      this.$emit('error', message)
    }
  }
}