<template>
<div class="select-container">
  <div class="select-content" ref="container">
    <i class="select-content__icon" v-if="icon" :style="{padding: getSizeIcon}" 
      :class="{
        'select-content__icon--no-border': noBorder,
        'select-content--error': error
      }">
      <font-awesome-icon :icon="icon"/>
    </i>
    <select
      class="select-content__select"
     :name="name" 
     :id="name"
     :style="{padding: getSizeInput, fontSize: size}" 
     :class="{ 
       'select-content__select--icon': icon, 
       'select-content__select--no-icon': !icon,
       'select-content--error': error
      }"
     v-model="selected"
    >
      <option class="select-content__option"  disabled v-if="option" :value="-1">{{option}}</option>
      <option class="select-content__option" :value="option.id" v-for="option in options" v-bind:key="option.id">{{option.item}}</option>
    </select>
  </div>
  <div class="select-container__message-error"  v-if="error">
    <small class="select-container__text-error">{{error}}</small>
  </div>
</div>
</template>
<script>
import { sizer } from '../../mixins/sizer'
export default {
  name: 'CodeSelect',
  mixins: [sizer],
  props: {
    name: String,
    options: Array,
    placeholder: String,
    option: String,
    width: {
      type: Number,
      default: 7
    },
    height: {
      type: Number,
      default: 7
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '0.9rem'
    },
    icon: {
      type: String
    }, 
    weight: {
      type: Number
    },
    color: {
      type: String
    },
    value: {
      type: Number
    },
    error: {
      type: String
    }
  },
  data () {
    return {

    }
  },
  computed: {
    selected: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="sass" scoped>
.select-content__select
  border: 1px solid lightgray
  width: 100%
  background-color: white
  -webkit-appearance: none
  -moz-appearance: none
  appearance: none
  outline: none
.select-content__option
  font-size: 1.0rem
.select-content__select--icon
  border-left: none
  border-radius: 0px 4px 4px 0px
.select-content__select--no-icon
  border-radius: 4px
.select-content
  display: flex
  flex-direction: row
  width: 100%
.select-content__icon
  display: flex
  justify-content: center
  border: 1px solid lightgray
  border-right: none
  border-radius: 4px 0px 0px 4px
  max-width: 40px
  color: $icon
.select-content__icon--no-border
  border-radius: 0
.select-content--error
  border-color: $danger
  color: $danger
.select-container__message-error
  display: flex
  flex-direction: row
  margin-left: 10px
  color: $danger
.select-container__text-error
  font-style: italic
  margin-bottom: 0
</style>
