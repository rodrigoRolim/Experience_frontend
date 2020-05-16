<template>
  <div class="container-ring" :style="{height: range, width: range}">
    <i class="container-ring__icon"><font-awesome-icon :icon="icon" :size="sizeIcon" :style="{color}"/></i>
    <div class="container-ring__sector" :style="{height: range, width: range, borderTopColor: color}"></div>
  </div>
</template>

<script>
export default {
  name: 'CodeLoading',
  props: {
    icon: String,
    sizeIcon: String,
    range: String,
    color: String
  }
}
</script>

<style lang="sass" scoped>
@import '../../styles/_animations.scss'
.container-ring
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  position: relative
  width: 80px
  height: 80px
  color: #368c8c
.container-ring__sector 
  box-sizing: border-box
  display: block
  position: absolute
  width: 64px
  height: 64px
  border: 4px solid #368c8c
  border-radius: 50%
  animation: lds-ring 1.5s linear infinite
  border-color: #368c8c rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.1)
.container-ring__icon
  position: absolute

</style>