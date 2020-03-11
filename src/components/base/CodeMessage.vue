<template>
  <div :class="'container-message '+typeMessage" :style="{width, justifyContent: position}">
    <p class="icon"><slot  name="icon"></slot></p>
    <p class="message-content">{{message}}</p>
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
        return ['success', 'error', 'warning', 'info'].indexOf(value) !== -1
      }
    },
    width: String
  },
  components: {

  },
  data () {
    return {
    }
  },

  methods: {

  }
}
</script>
<style lang="sass" scoped>
.container-message
  border-radius: 3px
  display: flex
  flex-direction: row
  justify-content: center
  width: 100%
.icon
  margin-right: 10px
  margin-left: 20px
.info
  background-color: rgba(95, 211, 250, 0.1)
  border: 1px solid blue
  color: blue
.error
  background-color: rgba(250, 95, 95, 0.1)
  border: 1px solid red
  color: red
.success
  background-color: rgba(95, 250, 141, 0.1)
  border: 1px solid green
  color: green
.warning
  background-color: rgba(250, 196, 95, 0.1)
  border: 1px solid orange
  color: orange

</style>