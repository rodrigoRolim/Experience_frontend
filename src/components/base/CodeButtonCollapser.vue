<template>
  <span class="code-button-collapser" @click="motion">
    <div class="code-button-collapser__line-top" 
    :class="{
      'code-button-collapser__line-top--rotate': play, 
      'code-button-collapser__line-top--down': play
      }"
    ></div>
    <div class="code-button-collapser__line-middle"
      :class="{'code-button-collapser__line-middle--smooth': play}"
    ></div>
    <div class="code-button-collapser__line-bottom"
      :class="{
        'code-button-collapser__line-bottom--rotate': play,
        'code-button-collapser__line-bottom--up': play
        }"
    ></div>
  </span>
</template>

<script>
import { bus } from '../../main'
export default {
  name: 'CodeButtonCollapser',
  data () {
    return {
      play: false
    }
  },
  created () {
    bus.$on('uncollapser', (data) => {
      this.play = data
    })
  },
  methods: {
    motion () {
      this.play = !this.play
      bus.$emit('collapser', this.play)
    }
  }
}
</script>

<style lang="sass" scoped>
.code-button-collapser
  position: relative
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  border: 1.5px solid transparent
  width: 40px
  height: 40px
.code-button-collapser__line-top,
.code-button-collapser__line-middle,
.code-button-collapser__line-bottom
  border: 1px solid lightslategray
  width: 30px
  position: absolute
.code-button-collapser__line-top
  transition: top 0.6s, transform 1s
.code-button-collapser__line-bottom
  transition: bottom 0.6s, transform 1s

.code-button-collapser__line-top
  top: 13.5px
.code-button-collapser__line-bottom
  bottom: 13.5px
.code-button-collapser__line-middle
  opacity: 1
  transition: opacity 0.8s
.code-button-collapser__line-top--rotate
  transform: rotate(45deg)
.code-button-collapser__line-top--down
  top: 17.5px
.code-button-collapser__line-bottom--rotate
  transform: rotate(-45deg)
.code-button-collapser__line-bottom--up
  bottom: 17.5px
.code-button-collapser__line-middle--smooth
  opacity: 0

</style>