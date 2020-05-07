<template>
  <div class="input-password">
    <i 
      class="input-password__icon"
      v-if="icon" 
      :style="getStyleIcon" 
      :class="{ 'input-password--no-border-r': noBorderRight }"
    >
      <font-awesome-icon :icon="icon" :style="{ color: colorIcon }"/>
    </i>
    <input
      class="input-password__input" 
      :type="type" 
      :name="name" 
      :id="id"
      :style="getStyleInput" 
      v-bind="$attrs"
      v-model="inputEmitter"
      @keydown="replaceByBullet"
      @focus="focus"
      :class="{ 
                'input-password__input--icon': icon, 'input-password__input--no-icon': !icon, 
                'input-password--no-border-r': noBorderRight,
                'input-password--no-border-l': noBorderLeft 
              }" 
    />
    <i class="input-password__eye" @click="togglePasswordVisibility">
    <transition name="fade" mode="out-in">
      <font-awesome-icon v-if="toggleIcon" icon="eye" size="md" :style="{ color: colorIcon }"/>
      <font-awesome-icon  v-else icon="eye-slash" size="md" :style="{ color: colorIcon }"/>
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
    }
  },
  data () {
    return {
      type: 'password',
      toggleIcon: false
    }
  },
  computed: {
    inputEmitter: {
      get () {

        return this.value
      },
      set (value) {
        console.log(value)
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
    focus (e) {
      this.$emit('focus', e)
    },
  }
}
</script>

<style lang="sass" scoped>

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
  color: dimgray
input[type="text"]
  font-size: 14px
  padding: 0
.input-password__input
  border: 1px solid lightgray
  border-right: none
  width: 100%
.input-password__input--icon
  border-radius: 0px 0px 0px 0px
.input-password__input--no-icon
  border-radius: 3px
.input-password--no-border-r
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
.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to 
  opacity: 0
</style>