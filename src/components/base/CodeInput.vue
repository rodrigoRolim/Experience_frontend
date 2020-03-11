<template>
    <div class="input" ref="container">
      <i><slot name="icon"></slot></i>
      <input type="text" name="user" id="user" :placeholder="placeholder" ref="input"/>
    </div>
</template>

<script>
export default {
  name: 'CodeInput',
  props: {
    label: String,
    placeholder: String
  },
  directives: {
    focus: {
      inserted: (el, _, vnode) => {
        el.addEventListener('change', () => {
          vnode.context.$refs.container.style.outline = '1px solid blue'
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>

input
  padding: 5px 7px
  border: 1px solid lightgray
  width: 100%
  border-radius: 0px 3px 3px 0px
.input
  display: flex
  flex-direction: row
  width: 100%
i
  border: 1px solid lightgray
  border-right: none
  padding: 5px 10px
  border-radius: 3px 0px 0px 3px
</style>