<template>
  <div class="select-wrap" ref="container">
    <i class="select-wrap__icon" v-if="hasIcon" :style="{padding: getSizeIcon}" :class="{'select-wrap__icon--no-border': noBorder}"><slot name="icon"></slot></i>
    <select
      class="select-wrap__select"
     :name="name" 
     :id="name"
     :style="{padding: getSizeInput, fontSize: size}" 
     :class="{ 'select-wrap__select--icon': hasIcon, 'select-wrap__select--no-icon': !hasIcon, 'no-border': noBorder }"
    >
      <option  disabled v-if="option" selected>{{option}}</option>
      <option class="select-wrap__option" :value="option.id" v-for="option in options" v-bind:key="option.id">{{option.item}}</option>
    </select>
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
    hasIcon: {
      type: Boolean,
      required: true,
      default: false
    },
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
    weight: {
      type: Number
    },
    color: {
      type: String
    }
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
.select-wrap .select-wrap__select
  border: 1px solid lightgray
  width: 100%
  background-color: white
  -webkit-appearance: none
  -moz-appearance: none
  appearance: none
  outline: none
.select-wrap__option
  font-size: 1.0rem
.select-wrap__select--icon
  border-radius: 0px 3px 3px 0px
.select-wrap__select--no-icon
  border-radius: 3px
.select-wrap
  display: flex
  flex-direction: row
  width: 100%
.select-wrap__icon
  display: flex
  justify-content: center
  border: 1px solid lightgray
  border-right: none
  border-radius: 3px 0px 0px 3px
  max-width: 40px
.select-wrap__icon--no-border
  border-radius: 0
</style>
