<template>
  <div class="partner-home">
    <div class="partner-home__filter" 
      :class="{
        'partner-home__filter--index-up': searcherInModal, 
        'partner-home__filter--up-hidden': hiddenElement }">
      <attendance-list-filter-partner @error="messageError"/>
      <div class="filter__searcher" :class="{'filter__searcher--modal': searcherInModal}">
        <div class="filter__content">
          <attendance-list-search
            :class="{ 'filter__input': searcherInModal }"
            @focus="searcherInModal = true"
            @blur="searcherInModal = false"
          />
        </div>
      </div>
    </div>
    <div class="partner-home__attendances">
      <code-modal
        class="partner-home__modal"
        position="center"
        :display="displayLoading"
      >
        <template v-slot:modal>
          <code-loading
            class="partner-home__loading"   
            range="50px"
            velocity="1x"
          />
        </template>
      </code-modal>
      <attendance-list />
    </div>
    <transition name="slide-fade">
      <div class="partner-home__messages" v-if="message">
        <code-message
          class="partner-home__message-content"
          :message="message.content"
          :type-message="message.type"
          position="center"
          icon="times-circle"
        />  
      </div>
    </transition>
    <div class="partner__footer" v-if="total">
      <span class="partner__number">
        foram encontrados {{total}} atendimentos no período selecionado
      </span>
    </div>
  </div>
</template>

<script>
import AttendanceListFilterPartner from '../components/AttendanceListFilterPartner'
import AttendanceList from '../components/AttendanceList'
import AttendanceListSearch from '../components/AttendanceListSearch'
import CodeLoading from '../components/base/CodeLoading'
import CodeModal from '../components/base/CodeModal'
import CodeMessage from '../components/base/CodeMessage'
import { mapGetters } from 'vuex'
import { hiddenByScroll } from '../mixins/hiddenByScroll'
import { NAMESPACED_AUTH, NAMESPACED_ATTENDANCE, NAMESPACED_HEALTH_CENTERS, NAMESPACED_ACCOMODATIONS, NAMESPACED_REGISTRANTS} from '../utils/alias'
export default {
  name: 'PartnerHome',
  mixins: [hiddenByScroll],
  components: {
    AttendanceListFilterPartner,
    AttendanceList,
    AttendanceListSearch,
    CodeLoading,
    CodeModal,
    CodeMessage
  },
  data () {
    return {
      displayHeader: true,
      searcherInModal: false,
      message: undefined,
      TIME_MESSAGE: 10000,
    }
  },
  computed: {
    displayLoading () {
      return this.statusHc == 'loading' || 
             this.statusAcc == 'loading' || 
             this.statusRg == 'loading' || 
             this.status == 'loading'
    },
    ...mapGetters(NAMESPACED_AUTH, [
      'userId'
    ]),
    ...mapGetters(NAMESPACED_HEALTH_CENTERS, {
      statusHc: 'status'
    }),
    ...mapGetters(NAMESPACED_ACCOMODATIONS, {
      statusAcc: 'status'
    }),
    ...mapGetters(NAMESPACED_REGISTRANTS, {
      statusRg: 'status'
    }),
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'status',
      'total'
    ])
  },
  methods: {
    messageError (value) {

      this.message = value
       setTimeout(() => {
        this.message = undefined
      }, this.TIME_MESSAGE)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/transitions/__slide_fade.scss'
@import "../styles/__themes"
.partner-home
  display: flex
  flex-direction: column
  align-items: center
.partner-home__filter--index-up
  z-index: 5
.partner-home__messages
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
.partner-home__filter
  position: fixed
  width: 100%
  z-index: 2
  top: 60px
  transition: top 0.3s
.partner-home__filter--up-hidden
  top: 0
.partner-home__attendances
  margin-top: 230px
  width: 98%
  @include respond-to(handhelds)
    margin-top: 160px
  @include respond-to(medium-screens)
    margin-top: 160px
.partner-home__modal
  position: fixed
.partner-home__loading
  margin-top: 130px
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
    top: 0
    left: 0
    bottom: 0
    background-color: white
    display: flex
    justify-content: center
.filter__input
  @include respond-to(handhelds)
    width: 98%
.partner__footer
  display: flex
  justify-content: center
  align-items: center 
  color: $color__text
  background-color: $color__default
  position: fixed
  bottom: 0
  padding: 12px 0
  width: 100%
.partner__number
  font-size: 0.8rem
  @include respond-to(handhelds)
    font-size: 0.7rem
</style>