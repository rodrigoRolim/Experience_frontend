<template>
<div class="c-checkbox">
  <label class="code-checkbox" ><span class="text-l" v-if="left && !none">{{text}}</span>
    <input type="checkbox" :name="name" :id="name" :value="content" />
    <div class="border-checkbox">
      <div class="body-checkbox" :style="style">
        <span class="checkmark"></span>
      </div>
    </div>   
    <span class="text-r" v-if="right && !none">{{text}}</span>
  </label>
</div>
</template>

<script>
export default {
  name: 'CodeCheckbox',
  props: {
    name: {
      type: String,
      default: ''
    },
    content: String,
    text: String,
    left: Boolean,
    right:Boolean,
    none: Boolean,
    color: {
      type: String,
      validator: function (value) {
        return ['red', 'blue', 'gray', 'green'].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      validator: function (value) {
        return ['xs', 'sm', 'md', 'lg'].indexOf(value) !== -1
      }
    }

  },
  data () {
    return {

    }
  },
  computed: {
    style (vm) {
      let bcolor = vm.getBcolor(vm.color)
      return { backgroundColor: bcolor }
    }
  },
  methods: {
    getBcolor (value) {
      switch (value) {
        case 'red':
          return '#DC143C'
        case 'green':
          return '#228B22'
        case 'blue':
          return '#1E90FF'
        case 'gray':
          return '#708090'    
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.code-checkbox
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  border-radius: 2px
  margin: 10px 5px 5px 0
.c-checkbox
  display: flex
  flex-direction: row
  position: relative
.body-checkbox
  position: relative
  border-radius: 2px
  display: none
.border-checkbox
  border: 2px solid #708090
  height: 29px
  width: 29px
  border-radius: 4px
input:checked ~ .border-checkbox .body-checkbox
  width: 25px
  height: 25px
  display: block
  background-color: rgb(123, 123, 123)
input
  width: 0
  height: 0
  opacity: 0
  position: absolute
input:checked ~ .border-checkbox .body-checkbox .checkmark:after
  content: " "
  border: 3px solid white
  border-top: none
  border-left: none
  position: absolute
  width: 6px
  top: 4px
  left: 8px
  transform: rotate(45deg)
  -webkit-transform: rotate(45deg)
  height: 11px
.text-l
  color: rgba(0,0,0,0.7)
  margin-right: 5px
  font-size: 0.9rem
  position: relative
  user-select: none
.text-r
  color: rgba(0,0,0,0.7)
  font-size: 0.9rem
  position: relative
  margin-left: 5px
  user-select: none
</style>