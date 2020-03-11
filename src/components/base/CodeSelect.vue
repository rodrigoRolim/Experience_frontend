<template>
  <div class="select" ref="container">
    <i><slot name="icon"></slot></i>
    <select name="select" id="select">
      <option value="0" disabled v-if="option" selected>-- {{option}} --</option>
      <option :value="option.id" v-for="option in options" v-bind:key="option.id">{{option.item}}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'CodeSelect',
  props: {
    options: Array,
    placeholder: String,
    option: String
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
  padding: 5px 7px
  border: 1px solid lightgray
  width: 100%
  border-radius: 0px 3px 3px 0px
.select
  display: flex
  flex-direction: row
  width: 100%
i
  border: 1px solid lightgray
  border-right: none
  padding: 5px 10px
  border-radius: 3px 0px 0px 3px
</style>