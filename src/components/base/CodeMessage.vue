<template>
  <div :class="'container-message '+typeMessage" :style="{width, justifyContent: position}">
    <p class="icon"><font-awesome-icon :icon="icon" v-if="icon"/><slot></slot></p>
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
        return ['success', 'error', 'warning', 'info', 'default'].indexOf(value) !== -1
      }
    },
    width: String,
    icon: String
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
  padding: 5px 0
  width: 100%
.icon
  display: flex
  flex-direction: column
  align-items: flex-start
  justify-content: flex-start
  margin-right: 10px
  margin-left: 20px
  
.message-content
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
.info
  background-color: rgba(95, 211, 250, 0.1)
  border: 1px solid blue
  color: blue
.error
  background-color: rgba(250, 95, 95, 0.1)
  border: 1px solid red
  color: red
.success
  background-color: #00c50010
  border: 1px solid #00c500
  color: #00c500
.warning
  background-color: rgba(250, 196, 95, 0.1)
  border: 1px solid orange
  color: orange
.default
  background-color: rgba(0,0,0,0.04)
  border: 1px solid lightgray
  color: dimgray
</style>