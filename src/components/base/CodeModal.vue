<template>
  <div class="modal" v-if="display">
    <div :class="{ 'c-modal-normal': normal, 'c-modal-custom': !normal }" @click.self="close">
      <div :class="{ 'content-modal-normal': normal }">
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
  methods: {
    close () {
      this.$emit('display', false)
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
  background-color: red 
  width: 100%
  height: 100%
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
.c-modal-normal
  background-color: rgba(0,0,0,0.5)
.c-modal-custom
  background-color: rgba(0,0,0,0)
.content-modal-normal

</style>
