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
.container-tool
  margin: 0
  padding: 0
.container-tool > *:hover
  text-decoration: underline
  cursor: default 
.tooltip-text
  display: none
  color: white
.container-tool:hover .tooltip-text
  display: block
  position: absolute
  margin-top: 5px
  margin-left: 10px
  padding: 10px 15px
  border-radius: 4px
  z-index: 100
  background-color: #495057
  animation: enter 0.4s linear 
.tooltip-text::after
  content: " "
  position: absolute
  border-width: 5px
  left: 3px
  top: -10px
  border-style: solid
  border-color: transparent transparent #495057 transparent
    
</style>
