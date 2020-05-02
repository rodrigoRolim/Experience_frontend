<template>
  <div class="code-info" :class="{ 'code-info--bottom': bottom, 'code-info--left': left }">
    <span class="code-info__icon"><font-awesome-icon :icon="icon" :size="size" :style="{color: color}"/></span>
    <div class="code-info__label" :class="{ 'l-bottom': bottom }">
      <span v-if="description && !bottom" class="code-info__label__description">{{description}}</span>
      <span class="code-info__label__info">{{info}}</span>
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
.code-info
  display: flex
  flex-direction: row
  vertical-align: middle
  @include respond-to(handhelds)
    width: 100%
    padding: 10px 0
.code-info__icon
  display: flex
  justify-content: center
  align-items: center
  margin-right: 5px
.code-info__label
  display: flex
  flex-direction: column
  justify-content: center
  font-size: 0.7rem
  margin-left: 5px
.code-info__label__description
  font-size: 0.63rem
  color: rgba(0,0,0,0.6)
  text-transform: capitalize
  @include respond-to(handhelds)
    display: none
.code-info__label__info
  font-weight: 600
.code-info--bottom
  display: flex
  flex-direction: column
  align-items: center
  width: 12%
.code-info--left
  display: flex
  flex-direction: row-reverse
.l-bottom
  margin-top: 3px
</style>