<template>
  <div class="container-drop" :style="{ backgroundColor: bcolor }">
    <div class="drop-down-up" v-if="dropdown">
      <button @click="dropAnimation">
        <i>
          <transition name="fade" mode="out-in">
            <font-awesome-icon icon="caret-down" size="lg" v-if="!show" key="down"/>
            <font-awesome-icon icon="caret-up" size="lg" v-if="show" key="up"/>
          </transition>
        </i>{{text}}
      </button>
    </div>
    <div class="body-drop-down-up" ref="dropdown" >
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
    bcolor: String,
    dropdown: Boolean
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
    window.addEventListener('resize', this.resizeEvent)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeEvent)
  },
  methods: {
    resizeEvent () {
      let dropdown_element = this.$refs.dropdown
      let break_condition = window.innerWidth > 768 ? 12 : 60
      dropdown_element.style.height = break_condition + 'vh'
      this.show = true
    },
    dropAnimation () {

      this.show = !this.show

      if (this.show) {
        this.dropdownAnimation()
      } else {

        this.dropupAnimation()
      }
    },
    dropdownAnimation () {
      this.$refs.dropdown.style.overflow = 'hidden'
      let dropdown_element = this.$refs.dropdown
      let height = 0
      let id = setInterval(frame, 2)
      let maxHeight = window.innerWidth > 768 && window.innerWidth < 1024 ? 12 : 60
      function frame () {
        if (height ==  maxHeight){
          clearInterval(id)
          console.log('oii')
          dropdown_element.style.overflow = 'visible'
        } else {
          height += 6
          dropdown_element.style.height = height + 'vh'
        }
      }
    },
    dropupAnimation () {

      this.$refs.dropdown.style.overflow = 'hidden'
      let dropdown_element = this.$refs.dropdown
      let height = window.innerWidth > 768 && window.innerWidth < 1024 ? 12 : 60
      console.log(height)
      let id = setInterval(frame, 2)
      function frame () {
        if (height == 0) {
          clearInterval(id)
        } else {
          height -= 6
          dropdown_element.style.height = height + 'vh'
        }
      }
    },
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
  width: 100%
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
  height: 60vh
  flex-direction: row
  justify-content: space-between
  width: 100%
  @include respond-to(medium-screens) 
    height: 0
    overflow: hidden
  @include respond-to(handhelds)
    flex-direction: column
.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
  opacity: 0
</style>