<template>
  <div class="partner-home">
    <div class="partner-home__filter" 
      :class="{'partner-home__filter--index-up': searcherInModal}">
      <attendance-list-filter-partner :begin="begin" :end="end" 
        @begin="getBeing" @end="getEnd" />
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
      <code-modal>
        <code-loading   
          range="40px" 
          color="dimgray"
        />
      </code-modal>
      <attendance-list />
    </div>
  </div>
</template>

<script>
import AttendanceListFilterPartner from '../components/AttendanceListFilterPartner'
import AttendanceList from '../components/AttendanceList'
import AttendanceListSearch from '../components/AttendanceListSearch'
import CodeLoading from '../components/base/CodeLoading'
import CodeModal from '../components/base/CodeModal'
import { mapActions } from 'vuex'
import { NAMESPACED_ATTENDANCE, GET_ATTENDANCES_STORE, GET_ATTENDANCES_HEALTH_CENTER } from '../utils/alias'
export default {
  name: 'PartnerHome',
  components: {
    AttendanceListFilterPartner,
    AttendanceList,
    AttendanceListSearch,
    CodeLoading,
    CodeModal
  },
  data () {
    return {
      displayHeader: true,
      searcherInModal: false,
      begin: '',
      end: ''
    }
  },
  created () {
    let healthCenter = '0' 
    this.begin = this.getBeginDate()
    this.end = this.getEndDate()

    this.getAttendancesByHealthCenter({ url: GET_ATTENDANCES_HEALTH_CENTER(healthCenter, this.begin, this.end) })
      .then(resp => console.log(resp))
  },
  methods: {
    ...mapActions(NAMESPACED_ATTENDANCE, {
      getAttendancesByHealthCenter: GET_ATTENDANCES_STORE
    }),
    getBeginDate () {
      let d = new Date()
      d.setDate(d.getDate() - 5)
      let day = d.getDate()
      if (day < 10) {
        day = '0' + day
      }
      let month = d.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let year = d.getFullYear()
      
      return day + '-' + month + '-' + year
    },
    getEndDate () {
      let d = new Date()
      let day = d.getDate()
      if (day < 10) {
        day = '0' + day
      }
      let month = d.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let year = d.getFullYear()
      console.log(day + '-' + month + '-' + year)
      return day + '-' + month + '-' + year
    },
    getBegin (value) {
      console.log(value)
    },
    getEnd (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="sass" scoped>
.partner-home
  display: flex
  flex-direction: column
.partner-home__filter--index-up
  z-index: 5
.partner-home__filter
  position: fixed
  width: 100%
.partner-home__attendances
  margin: 155px auto 0px auto 
  width: 98%
  @include respond-to(handhelds)
    margin-top: 100px
  @include respond-to(medium-screens)
    margin-top: 100px
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
</style>