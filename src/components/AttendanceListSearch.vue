<template>
  <div class="searcher">
    <code-input
      class="searcher__input"
      label="pesquisar paciente"
      placeholder="digite o nome do paciente e aperte enter"
      name="patient"
      type="text"
      required
      icon="search"
      color-icon="#368c8c"
      @input="setName"
      :value="params.name"
      @enter="exec"
    />
  </div>
</template>
<script>
import CodeInput from './base/CodeInput'
import { session } from '../mixins/session'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { NAMESPACED_ATTENDANCE, FILTER_ATTENDANCES_BY_NAME, NAMESPACED_AUTH, GET_ATTENDANCES, NAME, REINIT_PAGINATION } from '../utils/alias'
import { uppercase } from '../mixins/formater'
export default {
  name: 'AttendanceListSearch',
  props: {
    attendances: Array
  },
  mixins: [session, uppercase],
  components: {
    CodeInput
  },
  data () {
    return {
      modal: false,
      namePatient: ''
    }
  },
  computed: {
    ...mapGetters (NAMESPACED_AUTH, [
      'userTypeAuthed',
      'healthCenterLogged'
    ]),
    ...mapGetters (NAMESPACED_ATTENDANCE, [
      'params'
    ])
  },
  methods: {
    paramsQuery () {
      let queries = {}
      if (this.params.healthCenter.id) queries['postocadastro'] = this.params.healthCenter.id
      if (this.params.realizer.id) queries['postorealizante'] = this.params.realizer.id
      if (this.params.accomodation.id) queries['acomodacao'] = this.params.accomodation.id
      if (this.params.situation.id) queries['situacao'] = this.params.situation.id
      queries['limit'] = this.params.limit
      queries['page'] = this.params.page
      if (this.params.name) queries['nome'] = this.params.name
    
      return queries
    },
    async exec () {
      let headers = {'X-Paginate': true}
      this.renitiPage()
      await this.filterAttendanceByName({ url: this.getURI(this.healthCenterLogged), params: this.paramsQuery(), headers })

    },
    getURI(id) {
      return GET_ATTENDANCES(
          id,
          this.params.begin.split(" - ").join("-"),
          this.params.end.split(" - ").join("-"),
          this.getTypeUser(this.userTypeAuthed))   
    },
    focus (e) {
      this.$emit('focus', e)
    },
    blur (e) {
      this.$emit('blur', e)
    },
    ...mapActions (NAMESPACED_ATTENDANCE, {
      filterAttendanceByName: FILTER_ATTENDANCES_BY_NAME
    }),
    ...mapMutations(NAMESPACED_ATTENDANCE, {
      setName: NAME,
      renitiPage: REINIT_PAGINATION
    })
  }
}
</script>
<style lang="sass" scoped>
.searcher
  width: 100%
.searcher--modal .searcher__input
  @include respond-to(handhelds)
    width: 90%
</style>