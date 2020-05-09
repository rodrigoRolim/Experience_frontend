<template>
  <div v-if="show" class="keyboard" >
    <div class="keyboard__close" @click="close">
      <i><font-awesome-icon icon="times" /></i>  
    </div>
    <div class="keyboard__row__keys" v-for="(row, i) in keyboard" v-bind:key="i">
      <button v-for="key in row" v-bind:key="key" class="keyboard__key"
        @click="digit(key)"
        :class="{ 'space__bar': key == 'space', 
                  'keyboard__key--wide':  wideButton(key),
                  'keyboard__key--capslock': capslockKey && key !== 'enter' && key !== 'space'
                }"
      >
        <span 
          :class="{ 
                    'keyboard__key--activate': capslockKey, 
                    'keyboard__key--deactivate': !capslockKey 
                  }" 
          v-if="key == 'angle-up'"
        >
        </span>
        <i v-if="iconButton(key)"><font-awesome-icon :icon="key" size="lg"/></i>
        <span v-else>{{ key }}</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'KeyboardSelfService',
  props: {
    show: Boolean,
    input: String
  },
  data () {
    return {
      keyboard: [
                 ["1","2","3","4","5","6","7","8","9","0","backspace"],
                   ["q","w","e","r","t","y","u","i","o","p"],
                 ["angle-up","a","s","d","f","g","h","i","j","k","l","ç","check-circle"],
                 ["long-arrow-alt-right","z","x","c","v","b","n","m",".",",","?"],
                 ["long-arrow-alt-left","space","angle-left", "angle-right"]
              ],
      valueKey: '',
      capslockKey: false,
      inputCopy: this.input
    }
  },
  methods: {
    wideButton (value) {
      return ["backspace", "angle-up", "check-circle", "long-arrow-alt-right", "long-arrow-alt-left"].indexOf(value) !== -1 
    },
    iconButton (value) {
      return ["backspace", "angle-up", "check-circle", "angle-left", "angle-right", "long-arrow-alt-right", "long-arrow-alt-left"].indexOf(value) !== -1 
    },
    nextInput () {
      this.$emit('nextInput')
    },
    prevInput () {
      this.$emit('previousInput')
    },
    enter () {
      this.$emit('enter')
    },
    backspace () {
      this.$emit('backspace')
    },
    goLeft () {
      this.$emit('left')
    },
    goRight () {
      this.$emit('right')
    },
    writeCharacter (character) {
      this.$emit('write', character)
    },
    space () {
      this.$emit('space')
    },
    capslock () {
      this.capslockKey = !this.capslockKey
    },
    digit (key) {
      
      if (key == 'backspace') {

        this.backspace()
        
      } else if (key == 'space') {

        this.space()
        
      } else if (key == 'enter') {

        this.enter()
        
      } else if (key == 'angle-up') {
        
        this.capslock()

      } else if (key == 'long-arrow-alt-right') {

        this.nextInput()
      
      } else if (key == 'long-arrow-alt-left') {
     
        this.prevInput()
      
      } else {

        if (this.capslockKey) {

          key = key.toUpperCase()

        }
        let e = Object.assign({ target: { value: key }})
        this.$emit('write', e)
      }
    },
    close () {
      this.$emit('close', true)
    }
  }
}
</script>
<style lang="sass" scoped>
.keyboard
  font-size: 14px
  padding: 10px 0
  position: fixed
  bottom: 0
  left: 0
  right: 0
  z-index: 999
  width: 100%
  display: flex
  flex-direction: column
  justify-content: center
  background-color: #015050
  @include respond-to(handhelds)
    display: none
.keyboard__close
  align-self: flex-end
  margin-right: 15px
.keyboard__close i
  border-radius: 100%
  color: white
.keyboard--show
  bottom: 0%
.keyboard--hidden
  bottom: -100%
.keyboard__key--capslock
  text-transform: uppercase
.keyboard__row__keys
  width: 100%
  height: 7.5vh
  display: flex
  flex-direction: row
  justify-content: center
.keyboard__key
  position: relative
  display: inline-flex
  flex-direction: column
  align-items: center
  justify-content: center
  margin: 3px
  width: 6%
  min-width: 20px
  border-radius: 5px
  border: none
  color: white
  background-color: rgba(255,255,255, 0.4)
  outline: none
  font-size: 16px
.keyboard__key:active
  background-color: rgba(255,255,255, 0.6)
.keyboard__key--wide
  width: 8%
  min-width: 30px
.keyboard__key--activate::after,
.keyboard__key--deactivate::after
  position: absolute
  content: " "
  border-radius: 100%
  top: 10%
  right: 10%
  width: 10px
  height: 10px
  align-self: flex-end
.keyboard__key--deactivate::after
  background-color: #015050
.keyboard__key--activate::after
  background-color: lightgreen
.space__bar
  width: 45%
</style>