<template>
  <div class="partner-home">
    <div class="partner-home__filter" 
      :class="{'partner-home__filter--index-up': searcherInModal}">
      <attendance-list-filter-partner />
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
      <attendance-list :attendances="attendances" route="parceiro"/>
    </div>
  </div>
</template>

<script>
import AttendanceListFilterPartner from '../components/AttendanceListFilterPartner'
import AttendanceList from '../components/AttendanceList'
import AttendanceListSearch from '../components/AttendanceListSearch'
export default {
  name: 'PartnerHome',
  components: {
    AttendanceListFilterPartner,
    AttendanceList,
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