<template>
  <div id="app">
    <router-view></router-view>
  </div> 
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="sass">
body
  padding: 0
  margin: 0
#app 
  font-size: 100%
  line-height: 1.1
  background-color: #f4f3f37a
  font-family: Roboto, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  min-height: 100%
  position: absolute
  top: 0
  right: 0
  width: 100%
input
  outline: none
</style>
