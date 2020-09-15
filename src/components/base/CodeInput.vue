<template>
  <div class="input-wrap">
    <div class="container-input">
      <i v-if="icon"
        class="container-input__icon" 
        :class="iconClasses">
        <font-awesome-icon :icon="icon" />
      </i>
      <!-- <label for="" class="label">rotulo</label> -->
      <input 
        ref="input"
        class="container-input__input"
        autocomplete="off"
        v-bind="$attrs"
        :class="inputClasses" 
        :name="name"
        :id="name"
        type="text"
        v-model="inputEmitter" 
        :placeholder="placeholder"
        @focus="focus"
        @blur="blur"
        @keyup="keyup"
        @keydown="keydown"
        @keypress.enter.prevent="enter"
        />
    </div>
    <div class="input-wrap__message-error"  v-if="error">
      <small class="input-wrap__text-error">{{error}}</small>
    </div>
  </div>
  
</template>

<script>

export default {
  name: 'CodeInput',
  inheritAttrs: false,
  props: {
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
    numeric: Boolean,
    noBorderRight: {
      type: Boolean
    },
    noBorderLeft: {
      type: Boolean
    },
    cursor: {
      type: String
    },
    value: {
      type: String
    },
    bolder: Boolean,
    caret: {
      type: []
    },
    error: {
      type: String,
      default: ''
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
      } else {
        this.$refs.input.blur()
      }
    },
    caret (value) {
      this.$refs.input.setSelectionRange(value[0], value[1])
    },
    value (value) {
      if (value && this.numeric && !/^[0-9]*$/gi.test(value)) {
        this.inputEmitter = value.substr(0, value.length - 1)
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
    },
    inputClasses () {
      return { 
        'container-input__input--icon': this.icon, 'container-input__input--no-icon': !this.icon, 
        'container-input--no-border-right': this.noBorderRight,
        'container-input__icon--no-border-left': this.noBorderLeft,
        'container-input__input--outline': this.outlineInput && !this.error,
        'container-input--error': this.error,
        'container-input--bold': this.bolder
      }
    },
    iconClasses (){
      return {
        'container-input--no-border-right': this.noBorderRight,
        'container-input__icon--outline': this.outlineIcon && !this.error,
        'container-input__icon--outline-error': this.error,
        'container-input--error': this.error
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

.input-wrap
  display: flex
  flex-direction: column
  width: 100%
.input-wrap__message-error
  display: flex
  flex-direction: row
  margin-left: 10px
  color: $danger
.input-wrap__text-error
  font-style: italic
  margin-bottom: 0
.container-input
  width: 100%
.container-input__input
  padding: 10px 7px
  border: 1px solid lightgray
  border-left: none
  width: 100%
  min-width: 20px
  font-size: 14px
  font-weight: 600
  @include respond-to(handhelds)
    width: 100%
.container-input__input--icon
  border-radius: 0px 4px 4px 0px
.container-input__input--no-icon
  border-radius: 4px
.container-input__icon.container-input__icon--outline,
.container-input__input--outline
  border-color: $primary
.container-input__icon.container-input__icon--outline-error,
.container-input--error
  border-color: $danger
  color: $danger
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
  align-items: center
  border: 1px solid lightgray
  border-right: none
  border-radius: 4px 0px 0px 4px
  background-color: white
  padding: 9px 14px
  max-width: 45px
  color: $icon
.container-input--bold
  font-weight: 700
</style>