<template>
  <div class="label">
    <label :for="bind" v-bind:style="style">{{label}}<slot name="input"></slot></label>
  </div>
</template>

<script>
export default {
  name: 'CodeLabel',
  props: {
    label: String,
    color: String,
    fontWeight: Number,
    fontFamily: String,
    fontSize: String,
    fontStyle: String,
    bind: {
      type: String,
      default: ''
    }   
  },
  data () {
    return {
      style: {
        color: this.color, 
        fontWeight: this.fontWeight, 
        fontFamily: this.fontFamily, 
        fontSize: this.fontSize,
        fontStyle: this.fontStyle
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.label
  margin-left: 5px
  @include respond-to(handhelds)
    display: none
  margin-bottom: 5px
</style>