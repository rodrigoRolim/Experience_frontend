<template>
  <div class="code-group-radios" @hook:mounted="visibility=false">
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
    receive () {

      this.visibility = !this.visibility
      console.log(this.visibility)
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

</style>