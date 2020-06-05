<template>
  <div class="tooltip">
    <slot></slot>
    <div class="tooltip__content">
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
@import '../../styles/_animations.scss'
.tooltip
  margin: 0
  padding: 0
.tooltip > *:hover
  text-decoration: underline
  cursor: default
.tooltip__content
  display: none
  color: white
  position: absolute
.tooltip:hover .tooltip__content
  display: block
  margin-top: 5px
  margin-left: 10px
  padding: 10px 15px
  border-radius: 4px
  z-index: 100
  background-color: #495057
  animation: enter 0.4s linear 
.tooltip__content::after
  content: " "
  position: absolute
  border-width: 5px
  left: 3px
  top: -10px
  border-style: solid
  border-color: transparent transparent #495057 transparent
    
</style>
