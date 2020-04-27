<template>
  <div class="keyboard" :class="{ 'keyboard--hidden': !show, 'keyboard--show': show }">
    <div class="keyboard__close" @click="close">
      <i><font-awesome-icon icon="times" /></i>  
    </div>
    <div class="keyboard__row__keys" v-for="(row, i) in keyboard" v-bind:key="i">
      <button v-for="key in row" v-bind:key="key" class="keyboard__key"
        @click="click(key)" 
        :class="{ 'space__bar': key == 'space', 
                  'keyboard__key--wide':  actionButton(key) || key == 'enter',
                  'keyboard__key--capslock': capslock && key !== 'enter' && key !== 'space'
                }"
      >
        <span 
          :class="{ 
                    'keyboard__key--activate': capslock, 
                    'keyboard__key--deactivate': !capslock 
                  }" 
          v-if="key == 'angle-up'"
        >
        </span>
        <i v-if="actionButton(key)"><font-awesome-icon :icon="key"/></i>
        <span v-else>{{ key }}</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'KeyboardSelfService',
  props: {
    show: Boolean
  },
  data () {
    return {
      keyboard: [
                 ["1","2","3","4","5","6","7","8","9","0","backspace"],
                   ["q","w","e","r","t","y","u","i","o","p"],
                 ["angle-up","a","s","d","f","g","h","i","j","k","l","ç","enter"],
                 ["check-circle","z","x","c","v","b","n","m",".",",","?"],
                 ["space"]
              ],
      valueKey: '',
      capslock: false
    }
  },
  methods: {
    actionButton (value) {
      return value == "backspace" || value == "angle-up" || value == "check-circle"
    },
    click (key) {
      
      if (key == 'backspace') {
        this.valueKey = this.valueKey.slice(0, this.valueKey.length - 1)
        
      } else if (key == 'space') {
        this.valueKey += ' '
        
      } else if (key == 'enter') {
        this.valueKey += '\n'
        
      } else if (key == 'angle-up') {
        this.capslock = !this.capslock
      } else {
        if (this.capslock) {
          key = key.toUpperCase()
        }
        this.valueKey += key
      }
     
      this.$emit('typed', this.valueKey)
    },
    close () {
      this.$emit('close', true)
    }
  }
}
</script>
<style lang="sass" scoped>
.keyboard
  padding: 10px 0
  position: fixed
  z-index: 999
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  background-color: #015050
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
  height: 7vh
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
  width: 52%
</style>