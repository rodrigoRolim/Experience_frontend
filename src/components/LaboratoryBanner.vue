<template>
  <div class="laboratory-banner">
    <div class="laboratory-banner__logo">
      <img class="laboratory-banner__image" :src="takeLogo(logo)" ref="logo" alt="logo da empresa"/>
    </div>
    <div class="laboratory-banner__header">
      <h1 class="laboratory-banner__title">Aplicação para visualização de resultados</h1>
    </div>
    <div class="laboratory-banner__info-versions">
      <small class="laboratory-banner__experience">experience: v2.0</small>
      <small class="laboratory-banner__datasnap">datasnap: v2.0.3.0</small>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LaboratoryBanner',
  props: {
    logo: {
      type: String,
      default: 'logo'
    }
  },
  data () {
    return {
    }
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
.laboratory-banner
  display: flex
  flex-direction: column
  width: 100%
.laboratory-banner__header
  display: flex
  justify-content: center
  align-items: center
.laboratory-banner__title
  color: #4eaf6e
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
  margin: 0.2em 0
</style>