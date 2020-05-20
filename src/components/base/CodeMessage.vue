<template>
  <div :class="type | messageType" :style="{width, justifyContent: position}">
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
    type: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['success', 'error', 'warning', 'info', 'default'].indexOf(value) !== -1
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
.message
  border-radius: 3px
  display: flex
  flex-direction: row
  justify-content: center
  padding: 5px 0
  width: 100%
.message__icon
  display: flex
  flex-direction: column
  align-items: flex-start
  justify-content: flex-start
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
  background-color: rgba(250, 95, 95, 0.1)
  border: 1px solid red
  color: red
.message--success
  background-color: #00c50010
  border: 1px solid #00c500
  color: #00c500
.message--warning
  background-color: rgba(250, 196, 95, 0.1)
  border: 1px solid orange
  color: orange
.message--default
  background-color: rgba(0,0,0,0.04)
  border: 1px solid lightgray
  color: dimgray
</style>