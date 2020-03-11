<template>
  <div class="container-patient">
    <strong>{{name}}</strong>
    <div class="age-patient">
      <span><font-awesome-icon icon="birthday-cake" size="lg" class="icon" :style="{color: 'purple'}"/></span>
      <div class="label">
        <span>Idade</span>
        <span>{{age}}</span>
      </div>
    </div>
    <div class="gender-patient">
      <span><font-awesome-icon icon="mars" size="lg" class="icon" :style="{color: 'blue'}"/></span>
      <div class="label">
        <span>Sexo</span>
        <span>{{gender}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { situation } from '../mixins/situation'
export default {
  name: 'AttendanceListItemProfile',
  mixins: [situation],
  props: {
    name: String,
    age: String,
    gender: String,
    situation: String
  }
}
</script>

<style lang="sass" scoped>
.container-patient
  display: flex
  flex-direction: column
  width: 34%
.age-patient, .gender-patient
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center
  margin-top: 3px
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