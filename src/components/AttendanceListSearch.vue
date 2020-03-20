<template>
  <div class="container-list-search">
    <code-input
      label="pesquisar paciente"
      placeholder="digite o nome do paciente"
      :hasIcon="true"
      name="patient"
      type="text"
      required
      padding="8px 7px"
      paddingIcon="8px 12px"
    >
      <!-- <template v-slot:label>
        <code-label
          label="Pesquisar Paciente"
          color="#676a6c"
          :fontWeight="500"
          fontSize="0.9rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
      </template> -->
      <template v-slot:icon>
        <font-awesome-icon icon="search"></font-awesome-icon>
      </template>
    </code-input>
  </div>
</template>
<script>
import CodeInput from './base/CodeInput'
/* import CodeLabel from './base/CodeLabel' */
export default {
  name: 'AttendanceListSearch',
  props: {
    attendances: Array
  },
  components: {
    CodeInput,
    /* CodeLabel */
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="sass" scoped>
.container-list-search
  margin-top: 20px
</style>