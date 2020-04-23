<template>
  <div class="health-center-home">
    <div class="navbar">
      <the-navbar />
    </div>
    <div class="main">
      
    </div>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
export default {
  name: 'HealthCenterHome',
  components: {
    TheNavbar
  }
}
</script>

<style lang="sass" scoped>
.main
  width: 95%
</style>