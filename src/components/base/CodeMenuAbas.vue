<template>
  <div class="code-menu-abas">
    <div class="header-abas">
      <slot name="header"></slot>
    </div>
    <div class="body-abas">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeMenuAbas',
  data () {
    return {
     
    }
  }
}
</script>

<style lang="sass" scoped>
.code-menu-abas
  width: 100%
  user-select: none
.body-abas
  width: 100%
  border: 1px solid lightgray
  border-top: none
  border-bottom-right-radius: 2px
  border-bottom-left-radius: 2px
.header-abas
  display: flex
  flex-direction: row
  border-bottom: 1px solid lightgray

.header-abas > *
  text-align: center
  font-weight: 550
  font-size: 0.95rem
  text-transform: capitalize
  color: #676a6c
  padding: 10px 15px
  @include respond-to(handhelds)
    padding: 10px 10px
  cursor: pointer
.active-aba
  border: 1px solid lightgray
  border-top-right-radius: 2px
  border-top-left-radius: 2px
  border-bottom: none
  background-color: white
  margin-bottom: -1px
  padding: 9px 14px
  @include respond-to(handhelds)
    padding: 9px 9px
  color: #5f5e5e
</style>