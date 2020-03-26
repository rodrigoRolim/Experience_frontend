<template>
<div class="c-checkbox">
  <label class="code-checkbox" > <!-- <span>imprimir</span> -->
    <input type="checkbox" :name="name" :id="name" :value="content" />
    <div class="body-checkbox">
      <span class="checkmark"></span>
    </div>
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
    content: String
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="sass" scoped>
.code-checkbox
  border: 2px solid rgb(71, 77, 94)
  border-radius: 2px
  height: 29px
  width: 29px
  background-color: rgba(0,0,0,0.05)
  margin: 5px
.c-checkbox
  display: flex
  flex-direction: row
  position: absolute
.body-checkbox
  position: absolute
  top: 0
  display: none
input:checked ~ .body-checkbox
  width: 25px
  height: 25px
  display: block
  background-color: rgb(123, 123, 123)
  margin: 7px 0
input
  width: 0
  height: 0
  opacity: 0
input:checked ~ .body-checkbox .checkmark:after
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
</style>