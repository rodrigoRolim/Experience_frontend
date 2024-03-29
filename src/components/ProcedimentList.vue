<template>
  <div class="procediments">
    <div class="procediments__header"> 
      <procediment-list-item-search />    
    </div>
    <div class="procediments__body">
      <procediment-list-item
        v-for="procediment in procediments"
        :key="procediment.mnemonico"
        :mnemonic="procediment.mnemonico"
        :name="procediment.nome"
        :material="procediment.nomeMaterial"
        :laboratory="procediment.nomeSetor" 
        class="procediments__body__item" 
        @click="showInstructions(procediment.mnemonico)"
      />
    </div>
    <div class="modal_instructions">
      <code-modal
        normal
        :display="show"
        @display="show = $event"
        position="start"
      >
        <template v-slot:modal>
          <procediment-instructions @close="show = $event"></procediment-instructions>
        </template>
      </code-modal>
    </div>
    <div class="procediment__loading">
      <code-modal
        class="procediment__modal-load"
        :display="displayLoading"
        position="center"
      >
        <template v-slot:modal>
          <code-loading
            class="procediment__spin"   
            range="50px"
            velocity="1x"
          />
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
import CodeLoading from './base/CodeLoading'
import { mapGetters, mapActions } from 'vuex'
import { NAMESPACED_PROCEDIMENT, NAMESPACED_INSTRUCTIONS, GET_INSTRUCTIONS, INSTRUCTIONS } from '../utils/alias'
export default {
  name: 'ProcedimentList',
  components: {
    ProcedimentListItem,
    ProcedimentListItemSearch,
    ProcedimentInstructions,
    CodeModal,
    CodeLoading
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_PROCEDIMENT, [
      'procediments',
      'status'
    ]),
    displayLoading () {
      return this.status === 'loading'
    }
  },
  methods: {
    async showInstructions (mnemonico) {
      this.show = !!mnemonico
      let url = GET_INSTRUCTIONS(mnemonico)
      await this.getInstructions({url})
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
  z-index: 3
.procediments__body
  display: flex
  flex-direction: column
  align-items: center
  padding: 0 10px
  margin-top: 10px
  @include respond-to(handhelds)
    margin-top: 120px
.procediments__body__item
  margin: 5px
.modal_instructions
  width: 100% 
.procediment__modal-load
  position: fixed
.procediment__spin
  margin-top: 90px
</style>
