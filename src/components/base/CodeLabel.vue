<template>
  <label for="user" v-bind:style="style">{{label}}</label>
</template>

<script>
export default {
  name: 'CodeLabel',
  props: {
    label: String,
    color: String,
    fontWeight: Number,
    fontFamily: String,
    fontSize: String    
  },
  data () {
    return {
      style: {
        color: this.color, 
        fontWeight: this.fontWeight, 
        fontFamily: this.fontFamily, 
        fontSize: this.fontSize 
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>