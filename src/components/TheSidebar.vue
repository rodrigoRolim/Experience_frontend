<template>
  <aside class="sidebar">
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
          class="sidebar__date"
          size="lg"
        ></code-info>
        <code-info
          class="sidebar__exams"
          icon="flask"
          info="T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD"
          description="exames"
          size="lg"
        ></code-info>
      </div>
      <div class="sidebar__row">
        <!-- <strong class="sidebar__row__date">04/07/2016</strong> -->
        <code-info
          icon="calendar-alt"
          info="12/09/2017"
          description="data atendimento"
          class="sidebar__date"
          size="lg"
        ></code-info>
        <code-info
          class="sidebar__exams"
          icon="flask"
          info="T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD"
          description="exames"
          size="lg"
        ></code-info>
      </div>
      <div class="sidebar__row">
        <!-- <strong class="sidebar__row__date">04/07/2016</strong> -->
        <code-info
          icon="calendar-alt"
          info="12/09/2017"
          description="data atendimento"
          class="sidebar__date"
          size="lg"
        ></code-info>
        <code-info
          class="sidebar__exams"
          icon="flask"
          info="T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD"
          description="exames"
          size="lg"
        ></code-info>
      </div>
      <div class="sidebar__row">
        <!-- <strong class="sidebar__row__date">04/07/2016</strong> -->
        <code-info
          icon="calendar-alt"
          info="12/09/2017"
          description="data atendimento"
          class="sidebar__date"
          size="lg"
        ></code-info>
        <code-info
          class="sidebar__exams"
          icon="flask"
          info="T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD"
          description="exames"
          size="lg"
        ></code-info>
      </div>
      <div class="sidebar__row">
        <!-- <strong class="sidebar__row__date">04/07/2016</strong> -->
        <code-info
          icon="calendar-alt"
          info="12/09/2017"
          description="data atendimento"
          class="sidebar__date"
          size="lg"
        ></code-info>
        <code-info
          class="sidebar__exams"
          icon="flask"
          info="T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD T3 T3L TSH T4 T4L POT SOD"
          description="exames"
          size="lg"
        ></code-info>
      </div>
    </div>
  </aside>
</template>
<script>
import CodeInfo from './base/CodeInfo'
export default {
  name: 'TheSidebar',
  components: {
    CodeInfo
  },
  data () {
    return {
     
    }
  },
  mounted () {
    
  },
  methods: {
    detectMobile () {
      return (window.innerWidth <= 768)
    }
  }
}
</script>
<style lang="sass" scoped>
.sidebar
  display: flex
  flex-direction: column
  background-color: $green
  padding-bottom: 50px
  @include respond-to(medium-screens)
    width: 345px
  @include respond-to(handhelds)
    width: 100%
  border-right: 1px solid rgba(0,0,0,0.01)
.sidebar__header
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  background-color: $green
  height: 12vh
  color: white
  @include respond-to(handhelds)
    width:100%
.sidebar__date
  margin-bottom: 20px
.sidebar__body
  display: flex
  flex-direction: column
  padding-bottom: 20px
.sidebar__row
  display: flex
  flex-flow: row wrap
  background-color: white
  margin-left: 10px
  margin-top: 10px
  @include respond-to(handhelds)
    margin-right: 10px
    border-radius: 4px
  color: $green
  padding: 20px 10px
.sidebar__date,
.sidebar__exams
  overflow: hidden 
</style>