import { messages } from '../mixins/user-messages'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { NAMESPACED_ATTENDANCE, NAMESPACED_PROPS, NAMESPACED_AUTH, AUTH_REINIT_STATUS, EMPTY_PARAMS, CLEAN_PROPS } from '../utils/alias'
export const login = {
  mixins: [messages],
  data () {
    return {
      showLoader: false
    }
  },
  computed: {
    ...mapGetters('auth', [
      'authState'
    ])
  },
  methods: {
    ...mapActions(NAMESPACED_AUTH, {
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
          let options = {
            status: '401'
          }
          this.error(options)
          throw new Error(`Problem handling something: ${err}.`);
        })

      }
    },
    error (options) {
      if (this.authState == 'error') {
        this.showLoader = false
        let reinited = this.reinitState()
        console.log(reinited)
        if (reinited) {
          this.emitMessage(options)
        }
      }
    },
    emitMessage (options) {
      this.$emit('error', this.message(options))
    }
  }
}