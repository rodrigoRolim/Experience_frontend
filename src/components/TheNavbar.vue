<template>
  <header class="navbar__header">
    <div class="navbar__actions">
      <slot class="navbar__back" name="back"></slot>
      <div class="navbar__collapser">
        <slot name="collapser"></slot>
      </div>
    </div>
    <div class="navbar__logo">
      <img class="navbar__image" :src="takeLogo" alt="logo da empresa">
    </div>
    <div class="navbar__painel">
      <slot name="painel"></slot>
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
      const logo = JSON.parse(localStorage.getItem('custom-access')).logo
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
  min-height: 60px
  border-bottom: 1px solid rgba(0, 0, 0, 0.1)
  width: 100%
  @include respond-to(handhelds)
    justify-content: space-between
.navbar__collapser
  display: flex
.navbar__image
  width: 110px
  @include respond-to(medium-screens)
    margin: 0 auto
  @include respond-to(handhelds)
    width: 110px
    margin: 0  auto
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
.navbar__actions
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
/**   @include respond-to(handhelds)
    width: 17%
  @include respond-to(medium-screens)
    width: 0% **/
.navbar__logo
  display: flex
  justify-content: center
  align-self: center
.navbar__back
  display: flex
  justify-content: center
  width: 5%
.navbar__back:hover
  cursor: pointer
.navbar__collapser
  margin-left: 10px
  @include respond-to(wide-screens)
    display: none
.navbar__collapser:hover
  cursor: pointer
.navbar__image

  @include respond-to(handhelds)
    width: 70px
.navbar__user-perfil
  display: flex
  flex-direction: row
  align-items: center
  justify-content: flex-end
  margin-right: 20px
  width: 5%
  @include respond-to(handhelds)
    width: 90px
.navbar__home
  display: flex
  justify-content: flex-start
  align-items: center
.navbar__navigation
  display: flex
  justify-content: space-between
  @include respond-to(handhelds)
    margin-left: 0
.navbar__painel
  align-self: center
  margin-left: auto
  margin-right: 20px
  @include respond-to(handhelds)
    margin-left: 0
    margin-right: 0
</style>