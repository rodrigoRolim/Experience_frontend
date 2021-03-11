<template>
  <div class="health-home">
    <div class="health-home__filter" :class="{ 'health-home__filter--up-hidden': hiddenElement }">
      <div class="filter" :class="{'filter--modal': searcherInModal}">
        <div class="filter__options">
          <attendance-list-filter-health-center @error="messageError"/>
        </div>
      </div>
    </div>
    <div class="health-home__attendances">
      <code-modal
        class="health_center__modal"
        :display="displayLoading"
        position="center"
      >
        <template v-slot:modal>
          <code-loading
            class="health_center__loading"   
            range="50px"
            velocity="1x"
          />
        </template>
      </code-modal>
      <attendance-list route="posto"/>
    </div>
    <transition name="slide-fade">
      <div class="health-home__messages" v-if="message">
        <code-message
          class="health-home__message-content"
          :message="message.content"
          :type-message="message.type"
          position="center"
          icon="times-circle"
        />  
      </div>
    </transition>
    <div class="health-home__footer" v-if="total">
      <span class="health-home__number">
        foram encontrados {{total}} atendimentos no período selecionado
      </span>
    </div>
  </div>
</template>

<script>
import AttendanceList from '../components/AttendanceList'
import AttendanceListFilterHealthCenter from '../components/AttendanceListFilterHealthCenter'
import CodeModal from '../components/base/CodeModal'
import CodeLoading from '../components/base/CodeLoading'
import CodeMessage from '../components/base/CodeMessage'
import { mapGetters } from 'vuex'
import { hiddenByScroll } from '../mixins/hiddenByScroll'
import { NAMESPACED_ATTENDANCE, NAMESPACED_ACCOMODATIONS, NAMESPACED_HEALTH_CENTERS, NAMESPACED_REGISTRANTS } from '../utils/alias'
export default {
  name: 'HealthCenterHome',
  mixins: [hiddenByScroll],
  components: {
    AttendanceList,
    AttendanceListFilterHealthCenter,
    CodeModal,
    CodeLoading,
    CodeMessage
  },
  data () {
    return {
      displayHeader: true,
      searcherInModal: false,
      message: '',
      type: '',
      TIME_MESSAGE: 10000,
    }
  },
  created () {

  },
  methods: {
    messageError (value) {
      this.message = value
      setTimeout(() => {
        this.message = undefined   
      }, this.TIME_MESSAGE)
    }
  },
  computed: {
    displayLoading () {
      return this.statusHc == 'loading' || 
        this.statusAcc == 'loading' || 
        this.statusRg == 'loading' || 
        this.status == 'loading'
    },
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'status',
      'total'
    ]),
    ...mapGetters(NAMESPACED_ACCOMODATIONS, {
      accomodations: 'accomodations',
      statusAcc: 'status'
    }),
    ...mapGetters(NAMESPACED_HEALTH_CENTERS, {
      healthCenters: 'healthCenters',
      statusHc: 'status'
    }),
    ...mapGetters(NAMESPACED_REGISTRANTS, {
      statusRg: 'status'
    }),
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/transitions/__slide_fade.scss'
@import "../styles/__themes"
.health-home
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  margin-top: 160px
  transition: top 0.3s
  @include respond-to(handhelds)
    margin-top: 100px
  @include respond-to(medium-screens)
    margin-top: 100px
.health-home__attendances
  width: 98%
.health_center__modal
  position: fixed
.health_center__loading
  margin-top: 130px 
.health-home__filter
  width: 100%
  position: fixed
  top: 60px
  z-index: 2
  transition: top 0.3s
.health-home__filter--up-hidden
  top: 0
.filter--modal
  z-index: 10
.health-home__messages
  position: fixed
  z-index: 2
  bottom: 0
  align-self: flex-end
  width: 100%
  right: 0px
  @include respond-to(medium-screens)
    width: 100%
    right: 0
    left: 0
    bottom: 0
.health-home__footer
  display: flex
  justify-content: center
  align-items: center 
  color: $color__text
  background-color: $color__default
  position: fixed
  bottom: 0
  padding: 10px 0
  width: 100%
.health-home__number
  font-size: 0.8rem
  @include respond-to(handhelds)
    font-size: 0.7rem
</style>