<template>
    <div class="input" ref="container">
      <i v-if="hasIcon"><slot name="icon"></slot></i>
      <input 
       v-bind="$attrs"
       :class="{'input-icon': hasIcon, 'input-no-icon': !hasIcon}" 
       :type="type" 
       :name="name" 
       :id="name" 
       :placeholder="placeholder"
       ref="input"/>
    </div>
</template>

<script>
export default {
  name: 'CodeInput',
  inheritAttrs: false,
  props: {
    label: String,
    placeholder: String,
    hasIcon: {
      type: Boolean,
      required: true,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    }
  },

}
</script>

<style lang="sass" scoped>

input
  padding: 5px 7px
  border: 1px solid lightgray
  width: 100%
.input-icon
  border-radius: 0px 3px 3px 0px
.input-no-icon
  border-radius: 3px
.input
  display: flex
  flex-direction: row
  width: 100%
i
  border: 1px solid lightgray
  border-right: none
  padding: 5px 10px
  border-radius: 3px 0px 0px 3px
</style>