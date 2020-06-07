<template>
  <div class="navbar">
    <!-- <span class="navbar__shadow-left"></span> -->
    <header class="navbar__header">
      <div class="navbar__logo" v-if="logo">
        <img class="navbar__image" :src="takeLogo(logo)" alt="logo da empresa">
      </div>
      <div class="navbar__profile">
        <slot name="perfil"></slot>
      </div>
    </header>
   <!--  <span class="navbar__shadow-right"></span> -->
  </div>
  
</template>
<script>
/* import { bus } from '../main' */
export default {
  name: 'TheNavbar',
  components: {
  },
  props: {
    logo: String
  },
  data () {
    return {

    }
  },
  created () {
  /*   bus.$on('hiddenHeader', (data) => {

    }) */
  },
  methods: {
    takeLogo(logo) {
      let images = require.context('../assets/', false, /(\.png$)|(\.jpeg$)|(\.gif$)/)
      return images('./' + logo + ".png")
    }
  }
}
</script>
<style lang="sass" scoped>
.navbar
  display: flex
  height: 9vh
.navbar__header
  display: flex
  flex-direction: row
  background-color: white
  justify-content: space-between
  min-height: 9vh
  border-bottom: 1px solid rgba(0, 0, 0, 0.1)
  width: 100%
.navbar__image
  width: 120px
.navbar__shadow-right
  width: 50%
  height: 40px
  background-color: white
.navbar__shadow-left
  width: 50%
  height: 40px
  background-color: white
  -webkit-box-box-shadow: 0 8px 6px 1px rgba(0,0,0,0.1)
  -moz-box-shadow: 0 8px 6px 1px rgba(0,0,0,0.1)
  box-shadow: 0 8px 6px 1px rgba(0,0,0,0.1)
  transform: rotate(0deg)
.navbar__logo
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  margin-left: 20px
.navbar__profile
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  margin-right: 20px
</style>