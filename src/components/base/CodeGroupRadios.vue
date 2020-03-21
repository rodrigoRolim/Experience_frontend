<template>
  <div class="code-group-radios">
    <slot name="radios"></slot>
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
  flex-direction: row
</style>