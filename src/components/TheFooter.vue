<template>
  <footer class="footer">
    <div class="legends">
      <div class="c-finished"><span class="finished">Finalizado</span></div>
      <div class="c-in-progress"><span class="in-progress">Em Andamento</span></div>
      <div class="c-pa-finished"><span class="pa-finished">Parcialmente Finalizado</span></div>
      <div class="c-pendencies"><span class="pendencies">Existem Pendências</span></div>
      <div class="c-no-realized"><span class="no-realized">Não realizado</span></div>
    </div>
  </footer>
</template>
<script>
export default {

}
</script>
<style lang="sass" scoped>
@import '../styles/_colors.sass'

.legends
  display: flex
  flex-direction: row
  @include respond-to(handhelds)
    flex-direction: column
  font-size: 0.8rem 
.footer
  background: white
  padding: 16px 20px
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