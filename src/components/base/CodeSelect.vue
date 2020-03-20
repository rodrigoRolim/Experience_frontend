<template>
  <div class="select" ref="container">
    <i v-if="hasIcon"><slot name="icon"></slot></i>
    <select 
     :name="name" 
     :id="name" 
     :class="{ 'select-icon': hasIcon, 'select-no-icon': !hasIcon }"
    >
      <option  disabled v-if="option" selected>{{option}}</option>
      <option :value="option.id" v-for="option in options" v-bind:key="option.id">{{option.item}}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'CodeSelect',
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
  padding: 8px 7px
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
  padding: 8px 12px
  border-radius: 3px 0px 0px 3px
</style>