<template>
  <div class="procediment_instructions">
    <div class="procediment_instructions__header">
      <div class="procediment_instructions__header__titles">
        <span class="procediment_instructions__header__titles__p">
         GLICEMIA POS DEXTROSE 15 MIN APOS 75G
        </span>
        <span class="procediment_instructions__header__titles__s">
          Instruções de Exame
        </span>
      </div>
      <div class="procediment_instruction__header__close">  
        <span @click="closeModal"><font-awesome-icon icon="times" size="lg" /></span>
      </div>
    </div>
    <div class="procediment_instructions__body">
       <code-menu-abas>
        <template v-slot:header>
          <div @click="aba = 1" class="aba" :class="{ 'active-aba': aba == 1 }">Instruções de Exame</div>
        </template>
        <template v-slot:body>
          <div class="instructions" v-if="aba == 1">
            <div class="instructions__content">aqui vai as intruções do exame</div>
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
.procediment_instructions
  display: flex
  flex-direction: column
  background-color: white
  border-radius: 4px
.procediment_instructions__header
  width: 100%
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between
  border-bottom: 1px solid lightgray
  padding: 10px 20px
.instructions 
  height: 60vh
.instructions__content
  padding-left: 20px
  padding-top: 20px
.procediment_instruction__header__close
  display: flex
  flex-direction: column
  align-self: flex-start
  height: 90px
  margin-left: 30px
  color: red
.procediment_instructions__header__titles
  display: flex
  flex-direction: column
  align-items: center
.procediment_instructions__header__titles__p
  font-size: 1.5rem
  font-weight: 100
  color: gray
.procediment_instructions__header__titles__s
  margin-top: 10px
  font-size: 1.2rem
  font-weight: 600
.procediment_instructions__body
  margin-top: 20px 
</style>