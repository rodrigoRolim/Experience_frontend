<template>
  <div class="doctor-home">
    <div class="doctor-home__filter" :class="{'doctor-home__filter--up-hidden': hiddenElement}">
      <patient-list-filter @error="messageError"/>
    </div>
    <div class="doctor-home__list">
      <code-modal
        class="doctor-home__modal"
        :display="displayLoading"
        position="center"
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
          :message="message.content"
          :type-message="message.type"
          position="center"
          icon="times-circle"
        />  
      </div>
    </transition>
    <div class="doctor-home__total" v-if="total">
      <span class="doctor-home__number">
        foram encontrados {{total}} atendimentos no período selecionado
      </span>
    </div>
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
import { hiddenByScroll } from '../mixins/hiddenByScroll'
export default {
  name: 'DoctorHome',
  mixins: [hiddenByScroll],
  components: {
    PatientList,
    PatientListFilter,
    CodeLoading,
    CodeModal,
    CodeMessage
  },
  data () {
    return {
      message: undefined,
      type: '',
      TIME_MESSAGE: 8000,
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_PATIENT, [
      'status',
      'total',
    ]),
    displayLoading () {
      return this.status == 'loading'
    }
  },
  methods: {
    messageError(value) {
      this.message = value
       setTimeout(() => {
        this.message = ''
      }, this.TIME_MESSAGE)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../styles/__themes"
.doctor-home__filter
  position: fixed
  width: 100%
  top: 60px
  left: 0
  z-index: 2
  transition: top 0.3s
.doctor-home__filter--up-hidden
  top: 0px
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
  bottom: 0px
  position: absolute
  width: 100%
.doctor-home__total
  display: flex
  justify-content: center
  align-items: center 
  color: $color__text
  background-color: $color__default
  position: fixed
  bottom: 0
  padding: 10px 0
  width: 100%
  z-index: 3
.doctor-home__number
  font-size: 0.8rem
  @include respond-to(handhelds)
    font-size: 0.7rem
</style>