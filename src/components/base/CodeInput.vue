<template>
<div class="container-code-inp">
  <slot name="label"></slot>
  <div class="input">
    <i v-if="hasIcon" :style="{padding: getSizeIcon}" :class="{'no-border': noBorder}"><slot name="icon"></slot></i>
    <input 
      v-bind="$attrs"
      :class="{ 'input-icon': hasIcon, 'input-no-icon': !hasIcon, 'no-border': noBorder }" 
      :type="type" 
      :name="name" 
      :id="name" 
      :placeholder="placeholder"
      :style="{ padding: getSizeInput, fontSize: size, fontWeight: weight, color: color }"
      @focus="focus"
      @blur="blur"
      @keydown="keydown"
      />
  </div>
</div>
</template>

<script>
import { sizer } from '../../mixins/sizer'
export default {
  name: 'CodeInput',
  inheritAttrs: false,
  mixins: [sizer],
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
    },
    width: {
      type: Number,
      default: 6
    },
    height: {
      type: Number,
      default: 7
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '0.95rem'
    },
    weight: {
      type: Number
    },
    color: {
      type: String
    }
  },
  directives: {
    date: {
      inserted (el) {
        el.addEventListener('keypress', function (e) {
          if ((e.keyCode > 57 || e.keyCode < 48) && e.keyCode !== 8) {
            e.preventDefault()
          }
        })
      }
    }
  },
  methods: {
    focus (e) {
      this.$emit('focus', e)
    },
    blur (e) {
      this.$emit('blur', e)
    },
    keydown (e) {
      this.$emit('keydown', e)
    }
  }
}
</script>

<style lang="sass" scoped>
.container-code-inp
  width: 100%
input
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
.no-border
  border-radius: 0
i
  border: 1px solid lightgray
  border-right: none
  border-radius: 3px 0px 0px 3px
</style>