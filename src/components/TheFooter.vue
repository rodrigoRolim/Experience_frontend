<template>
  <footer class="footer">
    <div class="footer__legends">
      <div class="footer__legend"><p class="footer__finished footer--before">Finalizado</p></div>
      <div class="footer__legend"><p class="footer__in-progress footer--before">Em Andamento</p></div>
      <div class="footer__legend"><p class="footer__partial-finished footer--before">Parcialmente Finalizado</p></div>
      <div class="footer__legend"><p class="footer__pendencies footer--before">Existem Pendências</p></div>
      <div class="footer__legend"><p class="footer__no-realized footer--before">Não realizado</p></div>
    </div>
  </footer>
</template>
<script>
export default {

}
</script>
<style lang="sass" scoped>
.footer
  max-height: 15vh
  border-top: 1px solid ligthgray
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
  padding: 10px 20px
  width: 100%
.footer--before::before
  content: " "
  margin-right: 4px
.footer__finished::before
  border: 2px solid $TF
.footer__in-progress::before
  border: 2px solid $EA
.footer__partial-finished::before
  border: 2px solid $PF
.footer__pendencies::before
  border: 2px solid $EP
.footer__no-realized::before
  border: 2px solid $NR
.footer__legend
  margin-right: 10px
</style>