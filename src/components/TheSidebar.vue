<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <strong>Relação de Atendimentos</strong>
    </div>
    <div class="sidebar__body">
      <div class="sidebar__row">
        <!-- <strong class="sidebar__row__date">04/07/2016</strong> -->
        <code-info
          icon="calendar-alt"
          info="12/09/2017"
          description="data atendimento"
          class="sidebar__row__date"
          size="lg"
        ></code-info>
        <code-info
          icon="flask"
          info="T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD"
          description="exames"
          size="lg"
        ></code-info>
      </div>
    </div>
  </div>
</template>
<script>
import CodeInfo from './base/CodeInfo'
export default {
  name: 'TheSidebar',
  components: {
    CodeInfo
  }
}
</script>
<style lang="sass" scoped>
.sidebar
  display: flex
  flex-direction: column
  background-color: #368c8c
  width: 300px
  height: 90vh
.sidebar__header
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  background-color: rgba(255,255,255, 0.5)
  height: 12vh
  color: white 
.sidebar__row__date
  margin-bottom: 20px
.sidebar__body
  display: flex
  flex-direction: column
  padding: 10px 0
.sidebar__row
  display: flex
  flex-flow: row wrap
  background-color: white
  margin-left: 10px
  color: #368c8c
  padding: 20px 10px 
</style>