<template>
  <div class="agreement-attendance">
    <span><font-awesome-icon icon="credit-card" :style="{fontSize: '23px', color: 'rgba(71, 77, 94, 0.8)'}" /></span>
    <div class="label">
      <span>Convenio</span>
      <span>{{agreement}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendanceAgreement',
  props: {
    agreement: String
  }
}
</script>

<style lang="sass" scoped>
.agreement-attendance
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