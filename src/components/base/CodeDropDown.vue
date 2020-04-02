<template>
  <div class="container-drop" :style="{ backgroundColor: bcolor }">
    <div class="drop-down-up">
      <button @click="show = !show">
        <i>
          <transition name="fade" mode="out-in">
            <font-awesome-icon icon="caret-down" size="lg" v-if="!show" key="down"/>
            <font-awesome-icon icon="caret-up" size="lg" v-if="show" key="up"/>
          </transition>
        </i>{{text}}
      </button>
    </div>
    <div class="body-drop-down-up" :class="{'drop-down-an': show, 'drop-up-an': !show}">
      <div class="content">
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
    bcolor: String
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
.container-drop
  display: flex
  flex-direction: column
  justify-content: space-between
  background-color: $green
  @include respond-to(wide-screens)
    flex-direction: row
  border-radius: 4px
.content
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between
  width: 100%
  padding: 12px 10px
  @include respond-to(handhelds)
    flex-direction: column
.drop-down-up
  display: none
  width: 100%
  padding: 2px
  @include respond-to(handhelds)
    display: block
  @include respond-to(medium-screens)
    display: block
.drop-down-up button
  background-color: white
  border: none
  outline: none
  color: gray
  width: 100%
button
  vertical-align: middle
button i
  margin-right: 10px
.body-drop-down-up
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