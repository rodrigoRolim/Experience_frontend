<template>
  <header class="navbar__header">
    <div class="navbar__logo">
      <div class="navbar__collapser">
        <slot name="collapser"></slot>
      </div>
      <img class="navbar__image" :src="takeLogo" alt="logo da empresa">
    </div>
    <div class="navbar__navigation">
      <div class="navbar__home">
       <slot name="home"></slot>
      </div>
      <div class="navbar__user-perfil">
        <slot name="perfil"></slot>
      </div>
    </div>
  </header>
</template>
<script>

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
    
  },
  computed: {
    takeLogo() {
      const logo = document.documentElement.dataset.logo
      let images = require.context('@/assets/', false, /(\.png$)|(\.jpeg$)|(\.gif$)/)
      return images('./' + logo + ".png")
    }
  }
}
</script>
<style lang="sass" scoped>
.navbar__header
  display: flex
  flex-direction: row
  background-color: #f3f1f1
  justify-content: space-between
  min-height: 60px
  border-bottom: 1px solid rgba(0, 0, 0, 0.1)
  width: 100%
.navbar__collapser
  display: flex
.navbar__image
  width: 120px
  @include respond-to(handhelds)
    width: 80px
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
  justify-content: space-between
  align-items: center
  margin-left: 20px
  width: 15%
  @include respond-to(handhelds)
    width: auto
.navbar__collapser
  margin-right: 20px
  @include respond-to(wide-screens)
    display: none
.navbar__user-perfil
  display: flex
  flex-direction: row
  align-items: center
  justify-content: flex-end
  margin-right: 20px
  @include respond-to(handhelds)
    width: 90px
.navbar__home
  display: flex
  justify-content: flex-start
  align-items: center
.navbar__navigation
  display: flex
  width: 170px
  justify-content: space-between
  @include respond-to(handhelds)
    width: 135px
</style>