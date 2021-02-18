<template>
  <div class="procediment-instructions">
    <div class="procediment-instructions__header">
      <div class="procediment-instructions__titles">
        <span class="procediment-instructions__procediment-title">
         GLICEMIA POS DEXTROSE 15 MIN APOS 75G
        </span>
        <span class="procediment-instructions__instructions-title">
          Instruções de Exame
        </span>
      </div>
      <div class="procediment-instruction__close">  
        <span @click="closeModal"><font-awesome-icon icon="times" size="lg" /></span>
      </div>
    </div>
    <div class="procediment-instructions__body">
      <div class="procediment-instructions__loading" v-if="status === 'loading'">
        <code-loading
          class="exam__spin"   
          range="50px"
          velocity="1x"
        />
      </div>
      <div class="procediment-instructions__message"  v-if="message">
         <code-message
          class="procediment-instructions__message-content"
          :message="message.content || ''"
          :typeMessage="message.type"
          position="center"
          icon="info-circle"
        />
      </div>
      <code-menu-abas v-if="status !== 'loading' && !message">
        <template v-slot:header>
          <div @click="aba = 1" class="aba" :class="{ 'aba--active': aba == 1 }">Instruções de Exame</div>
        </template>
        <template v-slot:body>
          <div class="procediment-instructions__wrap" v-if="aba == 1">
            <div class="procediment-instructions__content" v-html="instructions"></div>
          </div>
        </template>
      </code-menu-abas>  
    </div>
  </div>
</template>

<script>
import CodeMenuAbas from './base/CodeMenuAbas'
import CodeLoading from './base/CodeLoading'
import CodeMessage from './base/CodeMessage'
import { mapGetters } from 'vuex'
import { NAMESPACED_INSTRUCTIONS } from '../utils/alias'

export default {
  name: 'ProcedimentInstructions',
  components: {
    CodeMenuAbas,
    CodeLoading,
    CodeMessage
  },
  data () {
    return {
      aba: 1
    }
  },
  methods: {
    closeModal () {
      this.$emit('close', false)
    }
  },
  computed: {
    ...mapGetters(NAMESPACED_INSTRUCTIONS, [
      'instructions',
      'status',
      'message'
    ])
  }
}
</script>

<style lang="sass" scoped>
.procediment-instructions
  display: flex
  flex-direction: column
  background-color: white
  border-radius: 4px
  width: 750px
  @include respond-to(handhelds)
    width: 98vw
.procediment-instructions__header
  width: 100%
  display: flex
  flex-direction: row
  justify-content: center
  border-bottom: 1px solid lightgray
  padding: 10px 20px
.procediment-instructions__content
  padding: 20px
.procediment-instruction__close
  display: flex
  flex-direction: row
  justify-content: flex-end
  align-self: flex-start
  color: dimgray
.procediment-instructions__titles
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  width: 100%
.procediment-instructions__procediment-title
  font-size: 1.5rem
  font-weight: 100
  color: gray
  @include respond-to(handhelds)
    font-size: 1.0rem
.procediment-instructions__instructions-title
  margin-top: 10px
  font-size: 1.2rem
  font-weight: 600
.procediment-instructions__body
  margin-top: 20px
.procediment-instructions__loading
  align-self: center
  display: flex
  justify-content: center
  align-items: center
  height: 70vh
.aba--active
  display: flex
  align-items: center
  justify-content: center
  border: 1px solid lightgray
  border-top-right-radius: 4px
  border-top-left-radius: 4px
  border-bottom: none
  background-color: white
  margin-bottom: -1px
.aba--active.aba
  padding-bottom: 12px
  color: #5f5e5e
.procediment-instructions__message
  display: flex
  align-items: center
  justify-content: center
  height: 50vh
.procediment-instructions__message-content
  width: 50%
</style>