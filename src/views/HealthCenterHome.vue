<template>
  <div class="health-center">
    <div class="health-center__filter">
      <div class="filter" :class="{'filter--modal': searcherInModal}">
        <div class="filter__options">
          <attendance-list-filter-health-center />
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
              :class="{'filter__input': searcherInModal}"
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
  </div>
</template>

<script>
import AttendanceList from '../components/AttendanceList'
import AttendanceListFilterHealthCenter from '../components/AttendanceListFilterHealthCenter'
import AttendanceListSearch from '../components/AttendanceListSearch'
import CodeModal from '../components/base/CodeModal'
import CodeLoading from '../components/base/CodeLoading'
import { mapGetters } from 'vuex'
import { NAMESPACED_ATTENDANCE } from '../utils/alias'
export default {
  name: 'HealthCenterHome',
  components: {
    AttendanceList,
    AttendanceListFilterHealthCenter,
    AttendanceListSearch,
    CodeModal,
    CodeLoading
  },
  data () {
    return {
      displayHeader: true,
      searcherInModal: false
    }
  },
  created () {

  },
  computed: {
    displayLoading () {
      return this.status === 'loading'
    },
    ...mapGetters(NAMESPACED_ATTENDANCE, [
      'status'
    ])
  }
}
</script>

<style lang="sass" scoped>
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
  z-index: 6
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
</style>