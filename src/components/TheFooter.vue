<template>
  <footer class="footer">
    <div class="legends">
      <div class="c-finished"><p class="finished">Finalizado</p></div>
      <div class="c-in-progress"><p class="in-progress">Em Andamento</p></div>
      <div class="c-pa-finished"><p class="pa-finished">Parcialmente Finalizado</p></div>
      <div class="c-pendencies"><p class="pendencies">Existem Pendências</p></div>
      <div class="c-no-realized"><p class="no-realized">Não realizado</p></div>
    </div>
  </footer>
</template>
<script>
export default {

}
</script>
<style lang="sass" scoped>
@import '../styles/_colors.sass'
p
  margin: 3 px
  padding: 0
.legends
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
.finished::before,
.in-progress::before,
.pa-finished::before,
.pendencies::before,
.no-realized::before
  content: " "
  margin-right: 4px
.finished::before
  border: 2px solid $TF
.in-progress::before
  border: 2px solid $EA
.pa-finished::before
  border: 2px solid $PF
.pendencies::before
  border: 2px solid $EP
.no-realized::before
  border: 2px solid $NR
.c-finished,
.c-in-progress,
.c-pa-finished,
.c-pendencies,
.c-no-realized
  margin-right: 10px

</style>