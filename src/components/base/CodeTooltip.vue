<template>
  <div class="container-tool">
    <slot></slot>
    <div class="tooltip-text">
      <small>{{text}}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeTooltip',
  props: {
    text: String
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="sass" scoped>
@import '../../styles/_animations.sass'
.arrow-up
  border: 3px solid black
  
.container-tool
  margin: 0
  padding: 0
  color: white
.tooltip-text
  display: none
.container-tool:hover .tooltip-text
  display: block
  position: absolute
  margin-top: 5px
  margin-left: 10px
  z-index: 100
  animation: enter 0.3s linear 1
.tooltip-text small
  background-color: #495057 
  padding: 10px
  border-radius: 4px
.tooltip-text small::after
  content: " "
  position: absolute
  left: 0
  margin-top: -5px
  bottom: 100%
  border-width: 5px
  border-style: solid
  border-color: transparent transparent black transparent 
</style>
