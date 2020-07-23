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
      <attendance-list :attendances="attendances" route="posto"/>
    </div>
  </div>
</template>

<script>
import AttendanceList from '../components/AttendanceList'
import AttendanceListFilterHealthCenter from '../components/AttendanceListFilterHealthCenter'
import AttendanceListSearch from '../components/AttendanceListSearch'
export default {
  name: 'HealthCenterHome',
  components: {
    AttendanceList,
    AttendanceListFilterHealthCenter,
    AttendanceListSearch
  },
  data () {
    return {
       displayHeader: true,
       searcherInModal: false,
       attendances: [
        {  
          photo:"índice.jpeg",
          name:"Antonio de oliveira veras rolim de moura nogueira silva",
          age:"33 anos",
          gender:"masculino",
          idAttendance:"0/010178",
          agreement:"particular",
          dataAttendance:"10/06/2019",
          dataDelivery:"10/08/2019",
          exams:"T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD",
          situation:"PF"
        },
        {
          photo:"índice.jpeg",
          name:"Antonio de oliveira veras",
          age:"33 anos",
          gender:"masculino",
          idAttendance:"0/010178",
          agreement:"particular",
          dataAttendance:"10/06/2019",
          dataDelivery:"10/08/2019",
          exams:"T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD",
          situation:"TF"
        },
        {
          photo:"índice.jpeg",
          name:"Antonio de oliveira veras",
          age:"33 anos",
          gender:"masculino",
          idAttendance:"0/010178",
          agreement:"particular",
          dataAttendance:"10/06/2019",
          dataDelivery:"10/08/2019",
          exams:"T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD",
          situation:"EP"
        },
        {
          photo:"índice.jpeg",
          name:"Antonio de oliveira veras",
          age:"33 anos",
          gender:"masculino",
          idAttendance:"0/010178",
          agreement:"particular",
          dataAttendance:"10/06/2019",
          dataDelivery:"10/08/2019",
          exams:"T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD",
          situation:"EA"
        },
        {
          photo:"índice.jpeg",
          name:"Antonio de oliveira veras",
          age:"33 anos",
          gender:"masculino",
          idAttendance:"0/010178",
          agreement:"particular",
          dataAttendance:"10/06/2019",
          dataDelivery:"10/08/2019",
          exams:"T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD",
          situation:"NR"
        }
      ]
    }
  },
  created () {

  },
  methods: {

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