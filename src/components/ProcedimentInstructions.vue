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
       <code-menu-abas>
        <template v-slot:header>
          <div @click="aba = 1" class="aba" :class="{ 'active-aba': aba == 1 }">Instruções de Exame</div>
        </template>
        <template v-slot:body>
          <div class="procediment-instructions__wrap" v-if="aba == 1">
            <div class="procediment-instructions__content">aqui vai as intruções do exame</div>
          </div>
        </template>
      </code-menu-abas>  
    </div>
  </div>
</template>

<script>
import CodeMenuAbas from './base/CodeMenuAbas'
export default {
  name: 'ProcedimentInstructions',
  components: {
    CodeMenuAbas
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
.procediment-instructions__wrap
  height: 60vh
.procediment-instructions__content
  padding-left: 20px
  padding-top: 20px
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
</style>