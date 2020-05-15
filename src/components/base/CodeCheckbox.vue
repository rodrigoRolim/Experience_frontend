<template>
<div class="checkbox">
  <label class="checkbox__label" ><span class="checkbox__label__text-left" v-if="left && text">{{text}}</span>
    <input class="checkbox__input" type="checkbox" :name="name" :id="name" :value="content" />
    <div class="checkbox__mark" :class="getSize" :style="{borderColor}">
      <div class="checkbox__mark__content" :class="getColor">
        <span class="checkmark">
          <font-awesome-icon icon="check" :style="{color: color !== 'light' ? 'white' : 'dimgray'}"/>
        </span>
      </div>
    </div>   
    <span class="checkbox__label__text-right" v-if="right && text">{{text}}</span>
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
    size: {
      type: String,
      default: 'md',
      validator: function (value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1
      }
    },
    color: {
      type: String,
      validator: function (value) {
        return ['theme','primary', 'success', 'warning', 
                'danger', 'info', 'dark', 'brand', 'light'].indexOf(value) !== -1
      }
    },
    borderColor: {
      type: String
    }

  },
  data () {
    return {

    }
  },
  computed: {
    getColor (vm) {
      return ['checkmark--'+vm.color]
    },
    getSize (vm) {
      return ['checkbox__mark--'+vm.size]
    }
  },
  methods: {
   
  }
}
</script>

<style lang="sass" scoped>
.checkbox
  display: flex
  flex-direction: row
  position: relative
.checkbox__label
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  border-radius: 2px
  margin: 10px 5px 5px 0
  cursor: pointer
.checkbox__mark__content
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  position: relative
  border-radius: 2px
  display: none
.checkbox__mark
  border: 2px solid #708090
  border-radius: 4px
.checkbox__mark--md
  height: 29px
  width: 29px
.checkbox__input:checked ~ .checkbox__mark--md .checkbox__mark__content
  width: 25px
  height: 25px
  display: block
.checkbox__mark--sm
  height: 24px
  width: 24px
.checkbox__input:checked ~ .checkbox__mark--sm .checkbox__mark__content
  width: 20px
  height: 20px
  display: block
.checkbox__mark--lg
  height: 34px
  width: 34px
.checkbox__input:checked ~ .checkbox__mark--lg .checkbox__mark__content
  height: 30px
  width: 30px
  display: block
.checkbox__input
  width: 0
  height: 0
  opacity: 0
  position: absolute
.checkbox__label__text-left
  color: rgba(0,0,0,0.7)
  margin-right: 5px
  font-size: 0.9rem
  position: relative
  user-select: none
.checkbox__label__text-right
  color: rgba(0,0,0,0.7)
  font-size: 0.9rem
  position: relative
  margin-left: 5px
  user-select: none
.checkmark
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  height: 100% 
.checkmark--theme
  background-color: $theme
.checkmark--primary
  background-color: $primary
.checkmark--success
  background-color: $success
.checkmark--warning
  background-color: $warning
.checkmark--danger
  background-color: $danger
.checkmark--info
  background-color: $info
.checkmark--dark
  background-color: $dark
.checkmark--brand
  background-color: $brand
.checkmark--light
  background-color: $light

</style>