<template>
  <div class="container-filter-att">
    <div class="container-form">
      <slot name="filters"></slot>
    </div>
    <div class="button-filter">
      <slot name="button"></slot>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AttendanceListFilter',
  components: {

  },
  created () {
  },
  methods: {
    filter () {

    }
  }
}
</script>
<style lang="sass" scoped>
@import "../../styles/_colors.sass"
.container-filter-att
  background-color: $green
.input-health-center
  @include respond-to(wide-screens)
    width: 100%

</style>