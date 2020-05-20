<template>
  <div class="container-input">
    <i v-if="icon" :style="{padding: getSizeIcon}"
      class="container-input__icon" 
      :class="{
        'container-input--no-border-right': noBorderRight,
        'container-input__icon--outline': outlineIcon
      }">
      <font-awesome-icon :icon="icon" :style="{ color: colorIcon }"/>
    </i>
    <input 
      ref="input"
      class="container-input__input"
      v-bind="$attrs"
      :class="{ 'container-input__input--icon': icon, 'container-input__input--no-icon': !icon, 
                'input--no-border-right': noBorderRight,
                'container-input__icon--no-border-left': noBorderLeft,
                'container-input__input--outline': outlineInput }" 
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
    },
    caret: {
      type: []
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
    },
    caret (value) {
      this.$refs.input.setSelectionRange(value[0], value[1])
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
.container-input
  width: 100%
.container-input__input
  border: 1px solid lightgray
  border-left: none
  width: 100%
.container-input__input--icon
  border-radius: 0px 3px 3px 0px
.container-input__input--no-icon
  border-radius: 3px
.container-input__icon.container-input__icon--outline,
.container-input__input--outline
  border-color: $brand
.container-input
  display: flex
  flex-direction: row
  width: 100%
.container-input--no-border-right
  border-top-right-radius: 0
  border-bottom-right-radius: 0
.container-input__icon--no-border-left
  border-top-left-radius: 0
  border-bottom-left-radius: 0
.container-input__icon
  display: flex
  justify-content: center
  border: 1px solid lightgray
  border-right: none
  border-radius: 3px 0px 0px 3px
  background-color: white
  max-width: 45px
</style>