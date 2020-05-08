<template>
<div class="container-code-inp">
  <div class="input">
    <i v-if="icon" :style="{padding: getSizeIcon}" 
      :class="{
        'no-border-right': noBorderRight,
        'outline-icon': outlineIcon
      }">
      <font-awesome-icon :icon="icon" :style="{ color: colorIcon }"/>
    </i>
    <input 
      ref="input"
      v-bind="$attrs"
      :class="{ 'input-icon': icon, 'input-no-icon': !icon, 
                'no-border-right': noBorderRight,
                'no-border-left': noBorderLeft,
                'outline-input': outlineInput }" 
      :type="type" 
      :name="name"
      :id="name"
      v-model="inputEmitter" 
      :placeholder="placeholder"
      :style="{ padding: getSizeInput, fontSize: sizeLetter, fontWeight: weightLetter, color: color, cursor: cursor }"
      @focus="focus"
      @blur="blur"
      @keyup="keyup"
      @keydown="keydown"
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
    colorIcon: {
      type: String,
      default: 'dimgray'
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
    },
    focused: {
      type: Boolean
    }
  },
  data () {
    return {
      outlineInput: false,
      outlineIcon: false
    }
  },
  watch: {
    focused (value) {
      if (value) {
        this.$refs.input.focus()
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
    putOutline (focus) {
      this.outlineInput = focus
      this.outlineIcon = focus
      if (focus) {
        this.$refs.input.focus()
      }
      
    },
    focus (e) {
      this.putOutline(true)
      this.$emit('focus', e)
    },
    blur (e) {
      this.putOutline(false)
      //window.scrollTo(0,0)
      this.$emit('blur', e)
    },
    keyup (e) {
      this.$emit('keyup', e)
    },
    keydown (e) {
      this.$emit('keydown', e)
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
  
input::placeholder
  visibility: hidden
  @include respond-to(handhelds)
    visibility: visible
.input-icon
  border-radius: 0px 3px 3px 0px
.input-no-icon
  border-radius: 3px
.outline-icon,
.outline-input
  border-color: $brand
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