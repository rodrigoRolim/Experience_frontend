<template>
  <div class="container-ring" :style="{height: range, width: range}">
    <i class="container-ring__icon" v-if="icon"><font-awesome-icon :icon="icon" :size="sizeIcon" :style="{color}"/></i>
    <div 
      class="container-ring__sector" 
      :style="{height: range, width: range, borderTopColor: color}"
      :class="getClasses"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'CodeLoading',
  props: {
    icon: {
      type: String
    },
    sizeIcon: String,
    range: String,
    color: String,
    velocity: {
      type: String,
      validator: function (value) {

        return ['1x', '2x', '3x'].indexOf(value) !== -1
      },
      default: '1x'
    }
  },
  computed: {
    getClasses () {
      return {
        'container-ring__sector--1x': this.velocity === '1x',
        'container-ring__sector--2x': this.velocity === '2x',
        'container-ring__sector--3x': this.velocity === '3x',
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../styles/animations/__loading.scss'
@import "../../styles/__themes.sass"

.container-ring
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  position: relative
  width: 80px
  height: 80px
  color:  $color__default
.container-ring__sector 
  box-sizing: border-box
  display: block
  position: absolute
  width: 64px
  height: 64px
  border: 4px solid  $color__default
  border-radius: 50%
  border-color: $color__default rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.1)
.container-ring__sector--1x
  animation: lds-ring 0.4s linear infinite
.container-ring__sector--2x
  animation: lds-ring 1.0s linear infinite
.container-ring__sector--3x
  animation: lds-ring 1.5s linear infinite
.container-ring__icon
  display: flex
  position: absolute
</style>