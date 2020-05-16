<template>
  <footer class="footer">
    <div class="footer__legends">
      <div class="footer__legend"><p class="footer__finished">Finalizado</p></div>
      <div class="footer__legend"><p class="footer__in-progress">Em Andamento</p></div>
      <div class="footer__legend"><p class="footer__partial-finished">Parcialmente Finalizado</p></div>
      <div class="footer__legend"><p class="footer__pendencies">Existem Pendências</p></div>
      <div class="footer__legend"><p class="footer__no-realized">Não realizado</p></div>
    </div>
  </footer>
</template>
<script>
export default {

}
</script>
<style lang="sass" scoped>
.footer__finished,
.footer__in-progress,
.footer__partial-finished,
.footer__pendencies,
.footer__no-realized
  margin: 2px
  padding: 0
.footer__legends
  display: flex
  flex-direction: row
  @include respond-to(handhelds)
    flex-direction: column
  font-size: 0.8rem
  width: 100%
.footer
  background: white
  padding: 16px 20px
  width: 100%
.footer__legend::before
  content: " "
  margin-right: 4px
.legend__finished::before
  border: 2px solid $TF
.legend__in-progress::before
  border: 2px solid $EA
.legend__partial-finished::before
  border: 2px solid $PF
.legend__pendencies::before
  border: 2px solid $EP
.legend__no-realized::before
  border: 2px solid $NR
.footer__legend
  margin-right: 10px
</style>