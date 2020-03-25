<template>
  <button 
   v-bind:style="getStyle"
   @click="click"
   :class="{ 'rounded': round }"
   >
    <i v-if="icon"><font-awesome-icon :icon="icon" :size="sizeIcon"/></i><span v-if="!round">{{text}}</span>
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
    padding: {
      type: String
    },
    icon: {
      type: String
    },
    fontWeight: Number,
    round: Boolean,
    radius: String,
    sizeIcon: String
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
button
  width: 100%
  color: green
  @include respond-to(wide-screens)
    line-height: 1.42857143
    font-size: 1.0rem
  @include respond-to(medium-screens) 
    font-size: 1.0rem
  @include respond-to(handhelds)
    font-size: 1.0rem
  border-radius: 3px
  border: 1px solid transparent
  letter-spacing: 0.2px
  text-transform: capitalize
  font-weight: 500
.rounded
  border-radius: 100%
  padding: 5px
.rounded i
  margin: 0
</style>