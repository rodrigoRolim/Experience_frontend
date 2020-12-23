<template>
  <div class="procediments">
    <div class="procediments__header"> 
      <procediment-list-item-search />    
    </div>
    <div class="procediments__body">
      <procediment-list-item
        v-for="(procediment, i) in procediments"
        :key="i"
        :mnemonic="procediment.mnemonico"
        :name="procediment.nome"
        :material="procediment.nome_material"
        :laboratory="procediment.nome_setor" 
        class="procediments__body__item" 
        @click="showInstructions(procediment.mnemonico)"
      />
      
    </div>
    <div class="modal_instructions">
      <code-modal
        normal
        :display="show"
        @display="show = $event"
      >
        <template v-slot:modal>
          <procediment-instructions @close="show = $event"></procediment-instructions>
        </template>
      </code-modal>
    </div>
  </div>
</template>
<script>
import ProcedimentInstructions from './ProcedimentInstructions'
import ProcedimentListItem from './ProcedimentListItem'
import ProcedimentListItemSearch from './ProcedimentListItemSearch'
import CodeModal from './base/CodeModal'
import { mapGetters, mapActions } from 'vuex'
import { NAMESPACED_PROCEDIMENT, NAMESPACED_INSTRUCTIONS, GET_INSTRUCTIONS, INSTRUCTIONS } from '../utils/alias'
export default {
  name: 'ProcedimentList',
  components: {
    ProcedimentListItem,
    ProcedimentListItemSearch,
    ProcedimentInstructions,
    CodeModal
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_PROCEDIMENT, [
      'procediments'
    ]),
  },
  methods: {
    showInstructions (mnemonico) {
      this.show = !!mnemonico
      let url = GET_INSTRUCTIONS(mnemonico)
      this.getInstructions(url)
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err))
    },
    ...mapActions(NAMESPACED_INSTRUCTIONS, {
      getInstructions: INSTRUCTIONS
    })
  }
}
</script>
<style lang="sass" scoped>
.procediments
  display: flex
  flex-direction: column
  background-color: white
.procediments__header
  position: fixed
  top: 60px
  display: flex
  flex-direction: column
  width: 100%
.procediments__body
  display: flex
  flex-direction: column
  align-items: center
  padding: 10px
.procediments__body__item
  margin: 5px
.modal_instructions
  width: 100%
</style>
