<template>
  <div class="dropdown" :style="{ backgroundColor: bcolor }">
    <div class="dropdown__buttons" v-if="dropdown">
      <button @click="showContent" class="dropdown__button" :class="{'dropdown__button--hidden': !dropdown}">
        <i class="dropdown__button-icon">
          <transition name="fade" mode="out-in">
            <font-awesome-icon icon="caret-down" size="lg" v-if="!show" key="down"/>
            <font-awesome-icon icon="caret-up" size="lg" v-if="show" key="up"/>
          </transition>
        </i>{{text}}
      </button>
    </div>
    <div class="dropdown__contents"
      :class="{'dropdown--visible': show && dropdown, 'dropdown--hidden': !show && dropdown}"
      >
      <div class="dropdown__content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AttendanceListFilter',
  components: {

  },
  props: {
    text: String,
    bcolor: String,
    dropdown: Boolean
  },
  data () {
    return {
      show: false
    }
  },
  created () {
  },
  methods: {
    showContent () {
      document.body.style.overflow = (!this.show) ? 'hidden' : 'auto'
      this.show = !this.show
    },
    filter () {
      this.show = !this.show
    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../styles/_colors.scss"
@import "../../styles/animations/_dropdown.sass"

@include an-dropdown($max-height: 660px, $duration-hidden: 0.6s, $duration-visible: 0.6s)

.dropdown
  display: flex
  flex-direction: column
  justify-content: space-between
  width: 100%
  background-color: $green
  padding: 2px
  @include respond-to(wide-screens)
    flex-direction: row
.dropdown__content
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between
  width: 100%
  padding: 12px 10px
  @include respond-to(medium-screens)
    flex-wrap: wrap
  @include respond-to(handhelds)
    flex-direction: column
.dropdown__buttons
  display: none
  width: 100%
  @include respond-to(handhelds)
    display: block
  @include respond-to(medium-screens)
    display: block
.dropdown__button
  background-color: white
  border: none
  outline: none
  color: gray
  width: 100%
.dropdown__button--hidden
  display: none
.dropdown__button
  vertical-align: middle
.dropdown__button-icon
  margin-right: 10px
.dropdown__contents
  display: flex
  flex-direction: row
  justify-content: space-between
  width: 100%
  @include respond-to(wide-screens)
    max-height: 200px
  @include respond-to(handhelds)
    flex-direction: column
    height: 70vh
    overflow-y: auto
.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to
  opacity: 0
</style>