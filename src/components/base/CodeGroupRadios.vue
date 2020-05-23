<template>
  <div class="radios">
    <div class="radios__header">
      <slot name="header"></slot>
    </div>
    <div class="radios__input">
      <slot name="radios"></slot>
    </div>
    <input class="radios__input-hidden" type="hidden" v-model="receive"/>
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
      this.$emit('group', value)
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
.radios
  display: flex
  flex-direction: column
.radios__input,
.radios__header
  display: flex
  flex-direction: row
.radios__input
  justify-content: space-between
  @include respond-to(handhelds)
    flex-wrap: wrap
</style>