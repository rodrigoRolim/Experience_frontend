<template>
  <div class="procediments">
    <div class="procediments__header"> 
      <procediment-list-item-search />    
    </div>
    <div class="procediments__body">
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>
      <procediment-list-item class="procediments__body__item" @click="show = $event"></procediment-list-item>    
    </div>
    <div class="modal_instructions">
      <code-modal
        normal
        :display="show"
        @display="show = $event"
      >
        <template v-slot:modal>
          <procediment-instructions @close="show = $event"></procediment-instructions>
        </template>
      </code-modal>
    </div>
  </div>
</template>
<script>
import ProcedimentInstructions from './ProcedimentInstructions'
import ProcedimentListItem from './ProcedimentListItem'
import ProcedimentListItemSearch from './ProcedimentListItemSearch'
import CodeModal from './base/CodeModal'
export default {
  name: 'ProcedimentList',
  components: {
    ProcedimentListItem,
    ProcedimentListItemSearch,
    ProcedimentInstructions,
    CodeModal
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    
  }
}
</script>
<style lang="sass" scoped>
.procediments
  display: flex
  flex-direction: column
  background-color: white
  min-height: 100vh
.procediments__header
  position: fixed
  top: 60px
  display: flex
  flex-direction: column
  width: 100%
.procediments__body
  display: flex
  flex-direction: column
  align-items: center
  padding: 10px
  @include respond-to(wide-screens)
    margin-top: 100px
  margin-top: 120px
.procediments__body__item
  margin: 5px
.modal_instructions
  width: 100%
</style>
