<template>
  <div class="info" 
    :class="positionDescription"
  >
    <span class="info__icon" v-if="icon"><font-awesome-icon :icon="icon" :size="size" :style="{color: color}"/></span>
    <div class="info__label" 
      :class="{
        'info__label--bottom': bottom
      }">
      <sup v-if="description && !bottom" class="info__description">{{description}}</sup>
      <sub
        class="info__content" 
        :style="{ 'font-size': sizeInfo }"
      >{{info}}</sub>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeInfo',
  props: {
    icon: {
      type: String,
      default: ''
    },
    size: String,
    color: String,
    info: String,
    description: String,
    left: Boolean,
    bottom: Boolean,
    mobileHidden: Boolean,
    sizeInfo: String
  },
  computed: {
    positionDescription () {

      return { 
        'info--bottom': this.bottom, 
        'info--left': this.left,
        'info__content--hidden': this.mobileHidden
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.info
  display: flex
  flex-direction: row
  vertical-align: middle
.info__icon
  display: flex
  justify-content: center
  align-items: center
  @include respond-to(handhelds)
    width: 29px
.info__label
  display: flex
  flex-direction: column
  justify-content: center
  margin-left: 5px
.info__description
  font-size: 0.65rem
  text-transform: capitalize
  height: 12px
  letter-spacing: .5px
  @include respond-to(handhelds)
    display: none
.info__description--sm
  font-size: 0.7rem
.info__description--md
  font-size: 0.9rem
.info__description--lg
  font-size: 1.0rem
.info__content
  font-weight: 500
  font-size: 0.72rem
  letter-spacing: .5px
.info--left .info__content
  margin-right: 10px
.info--bottom
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
.info--left
  display: flex
  flex-direction: row-reverse
.info__label--bottom
  margin-top: 3px
  margin-right: 3px
.info__content--hidden
  justify-content: center
  align-items: center
.info__content--hidden .info__label .info__content
  @include respond-to(handhelds)
    display: none 
</style>