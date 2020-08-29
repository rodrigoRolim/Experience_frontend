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
  methods: {
    ...mapActions('auth',{
      reinitState: 'AUTH_REINIT_STATUS'
    }),
    async success (status, path) {
      //debugger // eslint-disable-line
      if (this.authState == 'success' && status == 200) {
        this.showLoader = false
        let reinited = await this.reinitState()
        if (reinited) {
          setTimeout(() => this.$router.push(path), 300)
        }
       
      }
    },
    async error (status) {
      if (this.authState == 'error') {
        this.showLoader = false
        let reinited = await this.reinitState()
        if (reinited) {
          console.log(status)
          this.emitMessage(status)
        }
        
      }
    },
    emitMessage (status) {
      this.$emit('error', this.message(status))
    }
  }
}