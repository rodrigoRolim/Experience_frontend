<template>
  <div class="container-filter-att">
    <div class="drop-down-filter">
      <button @click="show = !show">
        <i>
          <transition name="fade" mode="out-in">
            <font-awesome-icon icon="caret-down" size="lg" v-if="!show" key="down"/>
            <font-awesome-icon icon="caret-up" size="lg" v-if="show" key="up"/>
          </transition>
        </i>Filtrar Atendimentos
      </button>
    </div>
    <div class="form-filter" :class="{'drop-down-an': show, 'drop-up-an': !show}">
      <div class="container-inputs">
        <slot name="filters"></slot>
      </div>
      <div class="button-filter">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AttendanceListFilter',
  components: {

  },
  data () {
    return {
      show: false
    }
  },
  created () {
  },
  methods: {
    filter () {
      this.show = !this.show
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../styles/_colors.sass"
@import "../../styles/_animations.sass"
.container-filter-att
  display: flex
  flex-direction: column
  justify-content: space-between
  border-radius: 2px
  background-color: $green
  @include respond-to(wide-screens)
    flex-direction: row
.container-inputs
  display: flex
  flex-direction: row
  align-items: baseline
  justify-content: space-between
  width: 70%
  padding: 12px 10px
  @include respond-to(handhelds)
    width: 100%
    flex-direction: column
  @include respond-to(medium-screens)
    width: 85%  
.button-filter
  display: flex
  flex-direction: row
.button-filter
  width: 20%
  padding: 20px 10px 12px 10px
  @include respond-to(handhelds)
    width: 100%
  @include respond-to(medium-screens)
    width: 15% 
.drop-down-filter
  display: none
  width: 100%
  padding: 2px
  @include respond-to(handhelds)
    display: block
  @include respond-to(medium-screens)
    display: block
.drop-down-filter button
  background-color: white
  border: none
  color: gray
  width: 100%
button
  vertical-align: middle
button i
  margin-right: 10px
.form-filter
  display: flex
  flex-direction: row
  justify-content: space-between
  width: 100%
  @include respond-to(wide-screens)
    max-height: 200px
  @include respond-to(handhelds)
    flex-direction: column
.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
  opacity: 0
</style>