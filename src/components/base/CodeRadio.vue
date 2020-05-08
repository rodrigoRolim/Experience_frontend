<template>
  <div class="code-radio">
    <label ref="label" class="code-radio__label">
      <i :class="{ 'selected': visible === value, 'unselected': !visible === value }"><font-awesome-icon icon="check" size="xs" /></i>
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
  methods: {
    confirm () {
      this.$emit('radio', this.value)
    }
  }
}
</script>

<style lang="sass" scoped>
.code-radio
  display: flex
  flex-direction: row
  align-items: center
  min-height: 35px
.label-radio
  color: #5f5e5e
  font-weight: 600
  font-size: 0.95rem
  margin-left: 5px
label:hover
  cursor: pointer

.selected
  border: none
  background-color: #368c8c
.unselected
  background-color: none
input
  display: none
  margin: 0
.code-radio__label
  display: flex
  justify-content: center
  align-items: center
i 
  display: flex
  justify-content: center
  align-items: center
  border: 0.5px solid gray
  border-radius: 100%
  color: white
  width: 22px
  height: 22px
</style>