<template>
<div class="input-password__wrap">
   <div class="input-password">
      <i 
        class="input-password__icon"
        v-if="icon" 
        :class="iconBorder"
      >
        <font-awesome-icon :icon="icon"/>
      </i>
      <input
        ref="input"
        class="input-password__input"
        placeholder="senha" 
        :type="type" 
        :name="name" 
        :id="name"
        v-bind="$attrs"
        v-model="inputEmitter"
        @keydown="replaceByBullet"
        @keypress.enter.prevent="enter"
        @focus="focus"
        @blur="blur"
        :class="inputBorder" 
      />
      <i class="input-password__eye" @click="togglePasswordVisibility"
        :class="{ 
          'input-password--outline': outlineInput && !error,
          'input-password--error': error  
          }"
        >
        <transition name="fade" mode="out-in">
          <font-awesome-icon v-if="toggleIcon" icon="eye" :style="{ color: colorIcon }"/>
          <font-awesome-icon  v-else icon="eye-slash"  :style="{ color: colorIcon }"/>
        </transition>
      </i>
    </div>
    <div class="input-password-wrap__message-error"  v-if="error">
        <small class="input-password-wrap__text-error">{{error}}</small>
    </div>
</div>

</template>

<script>

export default {
  name: 'CodeInputPassword',
  inheritAttrs: false,
  props: {
    icon: String,
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
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
    bolded: Boolean,
    colorIcon: {
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
    error: {
      type: String
    }
  },
  data () {
    return {
      type: 'password',
      toggleIcon: false,
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
    },
    iconBorder () {
      return { 
        'input-password--no-border-right': this.noBorderRight,
        'input-password--outline': this.outlineInput && !this.error,
        'input-password--error': this.error
      }
    },
    inputBorder () {
      return { 
        'input-password__input--icon': this.icon, 'input-password__input--no-icon': !this.icon, 
        'input-password--no-border-right': this.noBorderRight,
        'input-password--no-border-left': this.noBorderLeft,
        'input-password--outline': this.outlineInput && !this.error,
        'input-password--error': this.error
      }
    }
  },
  methods: {
    enter (e) {
      this.$emit('enter', e)
    },
    togglePasswordVisibility () {
      this.toggleIcon = !this.toggleIcon
      this.type = this.type == 'text' ? 'password' : 'text'
    },
    replaceByBullet () {
      
    },
    putOutline (focus) {
      this.outlineInput = focus
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
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../styles/fonts/_fontello'
.input-password
  display: flex
  flex-direction: row
  width: 100%
input[type="password"]
  font-family: "fontello"
  font-style: normal
  font-weight: normal
  letter-spacing: 1.5px
  speak: none
  font-variant: normal
  text-transform: none
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: lightslategray
  font-size: 0.8rem !important
input[type="text"]
  font-size: 14px
.input-password__input
  padding: 9px 8px
  border: 1px solid lightgray
  border-right: none
  border-left: none
  width: 100%
  min-width: 20px
.input-password__input::placeholder
  font-family: Avenir, Helvetica, Arial, sans-serif
  text-transform: capitalize
  letter-spacing: 0.1px
  font-size: 0.95rem !important
  font-weight: bold
.input-password__input
  font-weight: bold
.input-password__input--icon
  border-radius: 0px 0px 0px 0px
.input-password__input--no-icon
  border-radius: 4px
.input-password--no-border-right
  border-top-right-radius: 0
  border-bottom-right-radius: 0
.input-password--no-border-left 
  border-top-left-radius: 0
  border-bottom-left-radius: 0
.input-password__icon
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  border: 1px solid lightgray
  border-right: none
  border-radius: 4px 0px 0px 4px
  background-color: white
  padding: 10px 14px
  color: $icon
.input-password__eye
  display: flex
  width: 60px
  justify-content: center
  align-items: center
  border: 1px solid lightgray
  border-left: none
  border-radius: 0px 4px 4px 0px
  background-color: white
  color: $icon
.input__password
  font-weight: bold
.input-password--outline
  border-color: $primary
.input-password--error
  border-color: $error
  border-width: 2px
  color: $error
.input-password-wrap__message-error
  display: flex
  flex-direction: row
  margin-left: 10px
  color: $error
.input-password-wrap__text-error
  font-style: italic
  margin-bottom: 0
.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to 
  opacity: 0
</style>