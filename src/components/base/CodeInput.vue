<template>
<div class="container-code-inp">
  <div class="input">
    <i v-if="icon" :style="{padding: getSizeIcon}" :class="{'no-border-right': noBorderRight}">
      <font-awesome-icon :icon="icon" :style="{ color: colorIcon }"/>
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
      :style="{ padding: getSizeInput, fontSize: sizeLetter, fontWeight: weightLetter, color: color, cursor: cursor }"
      @focus="focus"
      @keyup="keyup"
      @keypress.enter="enter"
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
    colorIcon: String,
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
    sizeLetter: {
      type: String,
      default: '0.95rem'
    },
    weightLetter: {
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
    blur () {
      //window.scrollTo(0,0)
      //this.$emit('blur', e)
    },
    keyup (e) {
      this.$emit('keyup', e.target.value)
    },
    enter (e) {
  
      this.$emit('enter', e)
    }
  }
}
</script>

<style lang="sass" scoped>
.container-code-inp
  width: 100%
input
  border: 1px solid lightgray
  border-left: none
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
  display: flex
  justify-content: center
  border: 1px solid lightgray
  border-right: none
  border-radius: 3px 0px 0px 3px
  background-color: white
  max-width: 45px
</style>