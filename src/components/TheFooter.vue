<template>
  <footer class="footer">
    <div class="footer__content">
      <slot></slot>  
    </div>
  </footer>
</template>
<script>
export default {
  name: 'TheFooter'
}
</script>
<style lang="sass" scoped>
.footer
  background-color: white
  height: 45px
  border-top: 1px solid lightgray
.footer__content
  display: flex
  align-items: center
  justify-content: space-evenly
  height: 45px
</style>