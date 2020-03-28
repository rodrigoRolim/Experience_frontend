<template>
  <div class="age-patient">
    <span><font-awesome-icon icon="birthday-cake" size="lg" class="icon" :style="{color: 'rgba(71, 77, 94, 0.8)'}"/></span>
    <div class="label">
      <span>Idade</span>
      <span>{{age}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientAge',
  props: {
    age: {
      type: String
    }
  }
}
</script>

<style lang="sass" scoped>
.age-patient
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center
  margin-top: 3px
  @include respond-to(handhelds)
    padding: 10px 0
    margin-right: 10px
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
.icon
  margin-right: 5px
</style>