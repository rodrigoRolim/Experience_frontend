<template>
  <div class="chip">
    <span class="chip__content" :style="style">
      <span class="chip__element">{{text}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'CodeChip',
  props: {
    text: String,
    bcolor: {
      type: String,
      default: '#474d5e'
    },
    color: {
      type: String,
      default: 'white'
    },
    weight: {
      type: Number,
      default: 600
    },
    size: {
      type: Number,
      default: 1.0
    },
    transform: {
      type: String,
      validator: function (value) {
        return ['uppercase', 'capitalize'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {

    }
  },
  computed: {
    style (vm) {
      let backgroundColor = vm.bcolor
      let color = vm.color
      let fontWeight = vm.weight
      let fontSize = vm.size
      let textTransform = vm.transform
      return { backgroundColor, color, fontWeight, fontSize, textTransform }
    }
  }
}
</script>

<style lang="sass" scoped>
.chip
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  border-radius: 16px
.chip__content
  color: white
  font-size: 0.8rem
  padding: 4px 10px
  border-radius: 16px
.chip__element
  padding: 3px 0
  border-radius: 10px
  font-weight: 600
</style>