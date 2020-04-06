<template>
  <div class="procediments">
    <div class="procediments__header"> 
      <procediment-list-item-search />    
    </div>
    <div class="procediments__body" id="procediments__body">
      <procediment-list-item class="procediments__body__item"></procediment-list-item>
      <procediment-list-item class="procediments__body__item"></procediment-list-item>
      <procediment-list-item class="procediments__body__item"></procediment-list-item>
      <procediment-list-item class="procediments__body__item"></procediment-list-item>
    </div>
  </div>
</template>
<script>
import ProcedimentListItem from './ProcedimentListItem'
import ProcedimentListItemSearch from './ProcedimentListItemSearch'
export default {
  name: 'ProcedimentList',
  components: {
    ProcedimentListItem,
    ProcedimentListItemSearch
  }
}
</script>
<style lang="sass" scoped>
@import '../styles/_scrollbar.sass'
@include scrollbar($el: '#procediments__body', $w: 10px)
.procediments
  display: flex
  flex-direction: column
  background-color: white
  padding: 10px
.procediments__header
  display: flex
  flex-direction: column
  width: 100%
.procediments__body
  display: flex
  flex-direction: column
  align-items: center
  height: 500px
  overflow: auto
  padding: 10px
.procediments__body__item
  margin: 5px
</style>
