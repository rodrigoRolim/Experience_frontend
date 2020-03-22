<template>
  <div class="code-group-radios">
    <div class="header-radios">
      <slot name="header"></slot>
    </div>
    <div class="radio-inputs">
      <slot name="radios"></slot>
    </div>
    <input type="hidden" v-model="receive"/>
  </div>
</template>

<script>
export default {
  name: 'CodeGroupRadios',
  props: {
    receive: String
  },
  data () {
    return {
    }
  },
  created () {

  },
  watch: {
    receive (value) {
      this.$emit('resRadio', value)
    }
  },
  methods: {
    getValue () {
      console.log('ASD')
    }
  }
}
</script>

<style lang="sass" scoped>
.code-group-radios
  display: flex
  flex-direction: column
.radio-inputs,
.header-radios
  display: flex
  flex-direction: row
.header-radios p
  margin: 7px 0
  padding: 0
  font-weight: 600
  font-size: 0.95rem
  color: #676a6c
.radio-inputs

</style>