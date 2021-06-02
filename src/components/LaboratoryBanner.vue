<template>
  <div class="laboratory-banner">
    <div class="laboratory-banner__logo">
      <img class="laboratory-banner__image" :src="takeLogo" ref="logo" alt="logo da empresa"/>
    </div>
    <div class="laboratory-banner__header">
      <h1 class="laboratory-banner__title">Aplicação para visualização de resultados</h1>
    </div>
    <div class="laboratory-banner__info-versions" v-if="fullscreenMode">
      <small class="laboratory-banner__experience">experience: v2.0</small>
      <small class="laboratory-banner__datasnap">api: v2.0.3.0</small>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LaboratoryBanner',
  props: {
    fullscreenMode: Boolean
  },
  data () {
    return {
    }
  },

  computed: {
    takeLogo() {

      var logo = JSON.parse(localStorage.getItem('custom-access')).logo
      let images = require.context('@/assets/', false, /(\.png$)|(\.jpeg$)|(\.gif$)/)
      return images('./' + logo + ".png")
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../styles/__themes'
.laboratory-banner
  display: flex
  flex-direction: column
  width: 100%
.laboratory-banner__header
  display: flex
  justify-content: center
  align-items: center
.laboratory-banner__title
  color: $color__letters
  font-weight: 100
  font-size: 1.7rem
  @include respond-to(handhelds)
    font-size: 1.5rem
.laboratory-banner__info-versions
  display: flex
  flex-direction: column
  color: lightslategray
.laboratory-banner__logo
  display: flex
  justify-content: flex-start
  align-items: center
.laboratory-banner__image
  width: 200px
.laboratory-banner__logo,
.laboratory-banner__header,
.laboratory-banner__info-versions
  margin-top: 0.2rem
  margin-bottom: 0
</style>