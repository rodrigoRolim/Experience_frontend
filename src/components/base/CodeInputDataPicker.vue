<template>
  <div>
    

    <input type="text" id="end" name="end"/>
  </div>
</template>

<script>

export default {
  name: 'CodeInputDataPicker',
  props: {
    padding: {
      type: String,
      default: '6px 7px'
    },
    paddingIcon: {
      type: String,
      default: '6px 10px'
    }
  }
}
</script>

<style lang="sass" scoped>
input
  border: 1px solid lightgray
  width: 100%
</style>