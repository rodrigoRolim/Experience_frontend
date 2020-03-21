<template>
  <div class="code-radio">
    <label ref="label" :class="{ 'selected': visible === value, 'unselected': !visible === value }">
      <i><font-awesome-icon icon="check" size="xs"></font-awesome-icon></i>
      <input type="radio" :name="name" :id="identifier" @click="confirm" :value="value" v-model="selected"/>
      <span class="label-radio">{{label}}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CodeRadio',
  props: {
    value: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    identifier: String,
    visible: String
  },
  data () {
    return {
      visibility: false,
      selected: ''
    }
  },
 /*  watch: {
    visible (value) {
      console.log(value)
      console.log(value === this.value)
      return value === this.value
    }
  }, */
  methods: {
    confirm () {
      this.$emit('reqRadio', this.value)
    }
  }
}
</script>

<style lang="sass" scoped>
.code-radio
  width: 100%
.label-radio
  position: absolute
  color: #5f5e5e
  font-weight: 600
  font-size: 0.95rem
  margin-left: 5px
label
  vertical-align: baseline
  text-align: center
  border: 1px solid gray
  border-radius: 100%
  color: white
.selected i
  visibility: visible
.unselected i
  visibility: hidden
.selected
  background-color: green
.unselected
  background-color: none
input
  display: none
i
  margin: 3px
</style>