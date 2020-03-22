<template>
  <div class="container-tool">
    <slot></slot>
    <small class="tooltip-text">{{text}}</small>
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
.container-tool
  margin: 0
  padding: 0
  color: white
.tooltip-text
  display: none
  padding: 10px
  border-radius: 4px
.container-tool:hover .tooltip-text
  display: block
  position: absolute
  margin: 5px
  z-index: 100
  background-color: #495057
</style>
