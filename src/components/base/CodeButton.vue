<template>
  <button 
   v-bind:style="getStyle"
   @click="click"
   class="button"
   :class="[{ 'button--rounded': round }, 'button--'+size]"
   >
    <i v-if="nameIcon"><font-awesome-icon :icon="nameIcon" :size="sizeIcon"/></i>
    <span v-if="!round">{{text}}</span>
   </button>
</template>
<script>
export default {
  name: 'CodeButton',
  props: {
    color: {
      type: String
    },
    bcolor: {
      type: String
    }, 
    text: {
      type: String
    },
    size: {
      type: String,
      default: 'md',
      validator: function (value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1
      }
    },
    nameIcon: {
      type: String
    },
    sizeIcon: {
      type: String,
      default: '1x',
      validator: function (value) {
        return /[0-9]x$/.test(value) || ['xs', 'sm', 'lg'].indexOf(value) !== -1
      }
    },
    case: { 
      type: String,
      default: 'none',
      validator: function (value) {
        return ['none', 'capitalize', 'uppercase', 'lowercase'].indexOf(value) !== -1
      }
    },
    round: Boolean
  },
  data () {
    return {
    }
  },
  created () {
    
  },
  computed: {
    getStyle: (vm) => {
      return { 
        color: vm.color, 
        backgroundColor: vm.bcolor,
        padding: vm.padding,
        fontWeight: vm.fontWeight,
        height: vm.radius,
        width: vm.radius
      }
    }
  },
  methods: {
    click () {
      this.$emit("click")
    }
  } 
}
</script>
<style lang="sass" scoped>
i
  margin-right: 10px
.button
  width: 100%
  line-height: 1.42857143
  border-radius: 3px
  border: 1px solid transparent
  text-transform: capitalize
  font-weight: 500
.button:active
  opacity: 0.5
.button--sm
  padding: 9px 5px
.button--rounded
  border-radius: 100%
  padding: 5px
  width: 30px
  height: 30px
.button--rounded i
  margin: 0
  padding: 0
</style>