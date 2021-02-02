<template>
  <div :class="typeMessage | messageType" :style="{width, justifyContent: position}">
    <p class="message__icon"><font-awesome-icon :icon="icon" v-if="icon"/><slot></slot></p>
    <p class="message__content">{{message}}</p>
  </div>
</template>
<script>
export default {
  name: 'CodeMessage',
  props: {
    message: {
      type: String,
      required: true
    },
    position: {
      type: String,
      validator: function (value) {
        return ['center', 'flex-start', 'flex-end'].indexOf(value) !== -1
      }
    },
    typeMessage: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['success', 'error', 'warning', 'info', 'default', 'whiteness'].indexOf(value) !== -1
      }
    },
    width: String,
    icon: String
  },
  data () {
    return {
    }
  },
  filters: {
    messageType (type) {

      return 'message message--'+type
    }
  },
  methods: {

  }
}
</script>
<style lang="sass" scoped>
@import "../../styles/__themes.sass"
.message
  border-radius: 1px
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  padding: 20px 0
  width: 100%
.message__icon
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  margin-right: 10px
  margin-left: 20px
.message__content
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
.message--info
  background-color: rgba(95, 211, 250, 0.1)
  border: 1px solid blue
  color: blue
.message--error
  background-color: red
  border: 1px solid red
  color: white
.message--success
  background-color: green
  border: 1px solid #00c500
  color: white
.message--warning
  background-color: orange
  border: 1px solid orange
  color: orange
.message--default
  background-color: rgba(0,0,0,0.04)
  border: 1px solid lightgray
  color: dimgray
.message--whiteness
  background-color: white
  border: 1px solid white
  color: $color__default
</style>