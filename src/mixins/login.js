import { messages } from '../mixins/user-messages'
import { mapGetters, mapActions } from 'vuex'
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
  /* created () {
    console.log(this.$router.push)
  }, */
  mounted () {
    //this.$router.push('/paciente').catch((err)=>console.log(err))
  },
  methods: {
    ...mapActions('auth',{
      reinitState: 'AUTH_REINIT_STATUS'
    }),
    success (status, pathName) {
      // debugger // eslint-disable-line
      if (this.authState == 'success' && status == 200) {
        this.showLoader = false
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
    async error (options) {
      if (this.authState == 'error') {
        this.showLoader = false
        let reinited = await this.reinitState()
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