<template>
  <div class="modal" v-if="display">
    <div class="modal__wrap" :class="{ 'modal--normal': normal, 'modal--custom': !normal }" @click.self="close">
      <div :class="{ 'modal__content': normal }">
        <slot name="modal"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CodeModal',
  props: {
    normal: {
      type: Boolean,
      default: true
    },
    display: {
      type: Boolean,
      default: false
    }
  },  
  data () {
    return {
      displayModal: false
    }
  },
  updated () {

    if (this.display) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
  },
  methods: {
    close () {
      this.$emit('display', false)
    }
  }
}
</script>
<style lang="sass" scoped>
.modal--normal,
.modal--custom
  overflow: auto
  width: 100vw
  height: 100%
  position: fixed
  top: 0
  left: 0
  bottom: 0
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  min-height: 100vh
  z-index: 999
.modal--normal
  background-color: rgba(0,0,0,0.5)
.modal--custom
  background-color: rgba(0,0,0,0)
</style>
