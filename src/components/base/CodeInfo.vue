<template>
  <div class="info" :class="{ 'info--bottom': bottom, 'info--left': left }">
    <span class="info__icon"><font-awesome-icon :icon="icon" :size="size" :style="{color: color}"/></span>
    <div class="info__label" :class="{ 'info__label--bottom': bottom }">
      <span v-if="description && !bottom" class="info__description">{{description}}</span>
      <span class="info__content">{{info}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeInfo',
  props: {
    icon: String,
    size: String,
    color: String,
    info: String,
    description: String,
    left: Boolean,
    bottom: Boolean
  }
}
</script>

<style lang="sass" scoped>
.info
  display: flex
  flex-direction: row
  vertical-align: middle
  @include respond-to(handhelds)
    width: 100%
    padding: 10px 0
.info__icon
  display: flex
  justify-content: center
  align-items: center
.info__label
  display: flex
  flex-direction: column
  justify-content: center
  font-size: 0.7rem
  margin-left: 5px
.info__description
  font-size: 0.63rem
  color: rgba(0,0,0,0.6)
  text-transform: capitalize
  height: 12px
  @include respond-to(handhelds)
    display: none
.info__content
  font-weight: 600
.info--left .info__content
  margin-right: 10px
.info--bottom
  display: flex
  flex-direction: column
  align-items: center
  width: 12%
.info--left
  display: flex
  flex-direction: row-reverse
.info__label--bottom
  margin-top: 3px
</style>