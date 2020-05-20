<template>
  <div class="input-password">
    <i 
      class="input-password__icon"
      v-if="icon" 
      :style="getStyleIcon" 
      :class="{ 'input-password--no-border-right': noBorderRight,
                'input-password--outline': outlineInput
              }"
    >
      <font-awesome-icon :icon="icon" :style="{ color: colorIcon }"/>
    </i>
    <input
      ref="input"
      class="input-password__input" 
      :type="type" 
      :name="name" 
      :id="id"
      :style="getStyleInput" 
      v-bind="$attrs"
      v-model="inputEmitter"
      @keydown="replaceByBullet"
      @focus="focus"
      @blur="blur"
      :class="{ 
                'input-password__input--icon': icon, 'input-password__input--no-icon': !icon, 
                'input-password--no-border-right': noBorderRight,
                'input-password--no-border-l': noBorderLeft,
                'input-password--outline': outlineInput  
              }" 
    />
    <i class="input-password__eye" @click="togglePasswordVisibility"
       :class="{ 'input-password--outline': outlineInput  }"
      >
    <transition name="fade" mode="out-in">
      <font-awesome-icon v-if="toggleIcon" icon="eye" :style="{ color: colorIcon }"/>
      <font-awesome-icon  v-else icon="eye-slash"  :style="{ color: colorIcon }"/>
    </transition>
    </i>
  </div>
</template>

<script>
import { sizer } from '../../mixins/sizer'
export default {
  name: 'CodeInputPassword',
  inheritAttrs: false,
  mixins: [sizer],
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
    fontSize: {
      type: String,
      default: '0.95rem'
    },
    bolded: Boolean,
    color: {
      type: String
    },
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
    getStyleInput (vm) {
      return {
        padding: vm.getSizeInput, 
        color: vm.color, 
        cursor: vm.cursor
      }
    },
    getStyleIcon (vm) {
      return {
        padding: vm.getSizeIcon
      }
    }
  },
  methods: {
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
  font-family: 'fontello'
  font-style: normal
  font-weight: normal
  font-size: 12px
  speak: none
  font-variant: normal
  text-transform: none
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: lightslategray
input[type="text"]
  font-size: 14px
  padding: 0
.input-password__input
  border: 1px solid lightgray
  border-right: none
  border-left: none
  width: 100%
.input-password__input--icon
  border-radius: 0px 0px 0px 0px
.input-password__input--no-icon
  border-radius: 3px
.input-password--no-border-right
  border-top-right-radius: 0
  border-bottom-right-radius: 0
.input-password--no-border-l 
  border-top-left-radius: 0
  border-bottom-left-radius: 0
.input-password__icon
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  border: 1px solid lightgray
  border-right: none
  border-radius: 3px 0px 0px 3px
  background-color: white
.input-password__eye
  display: flex
  width: 60px
  justify-content: center
  align-items: center
  border: 1px solid lightgray
  border-left: none
  border-radius: 0px 3px 3px 0px
  background-color: white
  color: lightslategray
.input-password--outline
  border-color: $brand
.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to 
  opacity: 0
</style>