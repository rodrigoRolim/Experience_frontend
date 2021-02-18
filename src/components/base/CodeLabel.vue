<template>
  <div class="code-label">
    <label class="code-label__label" :for="bind" v-bind:style="style">{{label}}<slot name="input"></slot></label>
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
@import '../../styles/__themes'
.code-label
  margin-left: 5px
  margin-bottom: 5px
.code-label__label
  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif
  color: $color__letters
</style>