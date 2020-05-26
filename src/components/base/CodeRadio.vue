<template>
  <div class="radio">
    <label ref="label" class="radio__label">
      <i class="radio__icon" :class="{ 'radio--selected': visible === value, 'radio--unselected': !visible === value }"><font-awesome-icon icon="check" size="xs" /></i>
      <input class="radio__input" type="radio" :name="name" :id="identifier" @click="confirm" :value="value" v-model="selected"/>
      <span class="radio__label-content">{{label}}</span>
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
.radio
  display: flex
  flex-direction: row
  align-items: center
  min-height: 35px
.radio__label-content
  color: #5f5e5e
  font-weight: 600
  font-size: 0.86rem
  margin-left: 5px
.radio__label:hover
  cursor: pointer
.radio__icon.radio--selected
  border: none
  background-color: $green
.radio__icon.radio--unselected
  background-color: none
.radio__input
  display: none
  margin: 0
.radio__label
  display: flex
  justify-content: center
  align-items: center
.radio__icon
  display: flex
  justify-content: center
  align-items: center
  border: 0.5px solid gray
  border-radius: 100%
  color: white
  width: 22px
  height: 22px
</style>