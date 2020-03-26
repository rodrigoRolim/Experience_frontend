<template>
  <div :class="{ 'c-modal-normal': normal, 'c-modal-custom': !normal }" @click.self="close" >
    <div :class="{ 'content-modal-normal': normal }">
      <slot name="modal"></slot>
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
    }
  },  
  data () {
    return {

    }
  },
  methods: {
    close () {
      this.$emit('close', false)
    }
  }
}
</script>
<style lang="sass" scoped>
.c-modal-normal,
.c-modal-custom
  margin: 0 auto
  width: 100%
  height: 100%
  position: fixed
  z-index: 1
  top: 0
  left: 0 
.c-modal-normal
  background-color: rgba(0,0,0,0.5)
.c-modal-custom
  background-color: rgba(0,0,0,1)
.content-modal-normal
  display: flex
  flex-direction: row
  justify-content: center
  margin: 10% 0
  width: 100%
</style>
