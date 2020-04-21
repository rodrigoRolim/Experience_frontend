<template>
<div class="container-code-inp">
  <slot name="label"></slot>
  <div class="input">
    <i v-if="icon" :style="{padding: getSizeIcon}" :class="{'no-border-right': noBorderRight}">
      <font-awesome-icon :icon="icon" :style="{ color: Icolor }"/>
    </i>
    <input 
      v-bind="$attrs"
      :class="{ 'input-icon': icon, 'input-no-icon': !icon, 
        'no-border-right': noBorderRight,
        'no-border-left': noBorderLeft }" 
      :type="type" 
      :name="name"
      :id="name"
      v-model="inputEmitter" 
      :placeholder="placeholder"
      :style="{ padding: getSizeInput, fontSize: size, fontWeight: weight, color: color, cursor: cursor }"
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
    icon: String,
    Icolor: String,
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
    noBorderRight: {
      type: Boolean
    },
    noBorderLeft: {
      type: Boolean
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
    },
    cursor: {
      type: String
    },
    value: {
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
  computed: {
    inputEmitter: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
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
.no-border-right
  border-top-right-radius: 0
  border-bottom-right-radius: 0
.no-border-left
  border-top-left-radius: 0
  border-bottom-left-radius: 0
i
  border: 1px solid lightgray
  border-right: none
  border-radius: 3px 0px 0px 3px
  background-color: white
</style>