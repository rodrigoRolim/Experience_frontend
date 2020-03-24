<template>
  <div class="select" ref="container">
    <i v-if="hasIcon" :style="{padding: getSizeIcon}" :class="{'no-border': noBorder}"><slot name="icon"></slot></i>
    <select 
     :name="name" 
     :id="name"
     :style="{padding: getSizeInput}" 
     :class="{ 'select-icon': hasIcon, 'select-no-icon': !hasIcon, 'no-border': noBorder }"
    >
      <option  disabled v-if="option" selected>{{option}}</option>
      <option :value="option.id" v-for="option in options" v-bind:key="option.id">{{option.item}}</option>
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
      default: '0.95rem'
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
select
  border: 1px solid lightgray
  width: 100%
  background-color: #F5F5F5
.select-icon
  border-radius: 0px 3px 3px 0px
.select-no-icon
  border-radius: 3px
.select
  display: flex
  flex-direction: row
  width: 100%
i
  border: 1px solid lightgray
  border-right: none
  border-radius: 3px 0px 0px 3px
.no-border
  border-radius: 0
</style>
