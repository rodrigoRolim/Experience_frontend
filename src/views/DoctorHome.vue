<template>
  <div class="doctor-home">
    <div class="doctor-home__filter">
      <patient-list-filter @error="messageError"/>
    </div>
    <div class="doctor-home__list">
      <code-modal
        class="doctor-home__modal"
        :display="displayLoading"
      >
        <template v-slot:modal>
          <code-loading
            class="doctor-home__loading"   
            range="50px"
            velocity="1x"
          />
        </template>
      </code-modal>
      <patient-list />
    </div>
    <transition name="slide-fade">
      <div class="doctor-home__messages" v-if="message">
        <code-message
          class="doctor-home__message-content"
          :message="message"
          :type-message="type"
          position="center"
          icon="times-circle"
        />  
      </div>
    </transition>
  </div>
</template>

<script>
import PatientList from '../components/PatientList'
import PatientListFilter from '../components/PatientListFilter'
import CodeModal from '../components/base/CodeModal'
import CodeLoading from '../components/base/CodeLoading'
import CodeMessage from '../components/base/CodeMessage'
import { mapGetters} from 'vuex'
import { NAMESPACED_PATIENT } from '../utils/alias'
export default {
  name: 'DoctorHome',
  components: {
    PatientList,
    PatientListFilter,
    CodeLoading,
    CodeModal,
    CodeMessage
  },
  data () {
    return {
      message: '',
      type: '',
      TIME_MESSAGE: 10000,
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_PATIENT, [
      'status'
    ]),
    displayLoading () {
      return this.status == 'loading'
    }
  },
  methods: {
    messageError (value) {
      console.log(value)
      this.message = value.message
      this.type = value.type
       setTimeout(() => {
        this.message = ''
        this.type = ''
      }, this.TIME_MESSAGE)
    }
  }
}
</script>

<style lang="sass" scoped>
.doctor-home__filter
  position: fixed
  width: 100%
  top: 60px
  left: 0
  z-index: 2
.doctor-home__list
  margin-top: 170px
  @include respond-to(medium-screens)
    margin-top: 100px
  @include respond-to(handhelds)
    margin-top: 100px
.doctor-home__modal
  position: fixed
.doctor-home__loading
  margin-top: 90px
.doctor-home__messages
  bottom: 45px
  position: absolute
  width: 100%
</style>