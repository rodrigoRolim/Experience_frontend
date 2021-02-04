<template>
  <div class="health-center">
    <div class="health-center__filter">
      <div class="filter" :class="{'filter--modal': searcherInModal}">
        <div class="filter__options">
          <attendance-list-filter-health-center @error="messageError"/>
        </div>
        <div class="filter__searcher" :class="{'filter__searcher--modal': searcherInModal}">
          <div class="filter__content">
            <i 
              class="searcher__arrow-back" 
              :class="{'searcher__arrow-back--hidden': !searcherInModal, 'searcher__arrow-back--show': searcherInModal}"
            >
              <font-awesome-icon icon="arrow-left" size="lg" color="lightslategray"/>
            </i>
            <attendance-list-search
              :class="{ 'filter__input': searcherInModal }"
              @focus="searcherInModal = true"
              @blur="searcherInModal = false"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="health-center__attendances">
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
      <div class="health-center__messages" v-if="message">
        <code-message
          class="health-center__message-content"
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
import AttendanceList from '../components/AttendanceList'
import AttendanceListFilterHealthCenter from '../components/AttendanceListFilterHealthCenter'
import AttendanceListSearch from '../components/AttendanceListSearch'
import CodeModal from '../components/base/CodeModal'
import CodeLoading from '../components/base/CodeLoading'
import CodeMessage from '../components/base/CodeMessage'
import { mapGetters } from 'vuex'
import { NAMESPACED_ATTENDANCE, NAMESPACED_ACCOMODATIONS, NAMESPACED_HEALTH_CENTERS, NAMESPACED_REGISTRANTS } from '../utils/alias'
export default {
  name: 'HealthCenterHome',
  components: {
    AttendanceList,
    AttendanceListFilterHealthCenter,
    AttendanceListSearch,
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
      console.log(value)
      this.message = value.message
      this.type = value.type
      setTimeout(() => {
        this.message = ''
        this.type = ''
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
      'status'
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
.health-center
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  margin-top: 230px
  @include respond-to(handhelds)
    margin-top: 150px
  @include respond-to(medium-screens)
    margin-top: 170px
.health-center__attendances
  width: 98%
.health_center__modal
  position: fixed
.health_center__loading
  margin-top: 130px 
.health-center__filter
  width: 100%
  position: fixed
  top: 60px
  z-index: 2
.filter--modal
  z-index: 10
.filter__searcher
  display: flex
  align-items: center
  width: 100%
  padding: 10px 10px
  height: 60px
  background-color: white
  -webkit-box-box-shadow: 0 2px 4px 1px rgba(0,0,0,0.1)
  -moz-box-shadow: 0 2px 4px 1px rgba(0,0,0,0.1)
  box-shadow: 0 2px 4px 1px rgba(0,0,0,0.1)
.filter__content
  width: 100%
  display: flex
  justify-content: space-around
  align-items: center
.searcher__arrow-back
  width: 2%
  margin-right: 10px
.searcher__arrow-back--hidden
  display: none
.searcher__arrow-back--show
  display: none
  @include respond-to(handhelds)
    display: block
.filter__searcher--modal
  @include respond-to(handhelds)
    align-items: flex-start
    overflow: auto
    margin: 0 auto
    width: 100%
    height: 100%
    position: fixed
    top: 60px
    left: 0
    bottom: 0
    z-index: 4
    background-color: white
    display: flex
    justify-content: center
.filter__input
  @include respond-to(handhelds)
    width: 90%
.health-center__messages
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
</style>