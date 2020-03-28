<template>
  <div class="delivery-attendance">
    <span><font-awesome-icon icon="clock" size="2x" :style="{color: 'rgba(71, 77, 94, 0.8)'}"/></span>
    <div class="label">
      <span>Previsão Entrega</span>
      <span>{{dateDelivery}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendanceDelivery',
  props: {
    dateDelivery: String
  }
}
</script>

<style lang="sass" scoped>
.delivery-attendance
  display: flex
  flex-direction: row
  align-items: center
  vertical-align: middle
  @include respond-to(handhelds)
    width: 100%
    padding: 10px 0
.icon
  margin-right: 5px
.label
  display: flex
  flex-direction: column
  font-size: 0.7rem
  margin-left: 3px
.label span:first-child
  font-size: 0.65rem
  color: gray
.label span:last-child
  font-weight: 600
</style>