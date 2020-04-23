<template>
  <button 
   v-bind:style="getStyle"
   @click="click"
   class="button"
   :class="[{ 'button--rounded': round, 'button--borded': borded }, 
   'button--'+size, 'button--'+color]"
   >
    <i v-if="nameIcon"><font-awesome-icon :icon="nameIcon" :size="sizeIcon"/></i>
    <span v-if="!rounded">{{text}}</span>
   </button>
</template>
<script>
export default {
  name: 'CodeButton',
  props: {
    color: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'success', 'warning', 
                'danger', 'info', 'dark', 'brand', 'light'].indexOf(value) !== -1
      }
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
    rounded: Boolean,
    borded: Boolean
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

.button
  border: 1px solid transparent
  color: white
  font-weight: 500
  line-height: 1.42857143
  outline: none
.button i
  margin-right: 10px
.button:active
  opacity: 0.5
.button--borded
  border-radius: 3px
.button--sm
  padding: 8px 9px
.button--md
  padding: 10px 12px
.button--lg
  padding: 12px 15px
.button--rounded
  border-radius: 100%
  padding: 5px
  width: 30px
  height: 30px
.button--rounded i
  margin: 0
  padding: 0
.button--primary
  background-color: #005b8f

</style>