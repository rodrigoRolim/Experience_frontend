<template>
  <div class="code-info" :class="{ 'bottom': bottom, 'left': left }">
    <span><font-awesome-icon :icon="icon" :size="size" :style="{color: color}"/></span>
    <div class="label" :class="{ 'l-bottom': bottom }">
      <span v-if="description && !bottom" class="description">{{description}}</span>
      <span class="info">{{info}}</span>
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
.icon
  margin-right: 5px
.label
  display: flex
  flex-direction: column
  justify-content: center
  font-size: 0.7rem
  margin-left: 5px
.description
  font-size: 0.65rem
  color: rgba(0,0,0,0.8)
  text-transform: capitalize
.info
  font-weight: 600
.bottom
  display: flex
  flex-direction: column
  align-items: center
  width: 12%
.l-bottom
  margin-top: 3px
</style>