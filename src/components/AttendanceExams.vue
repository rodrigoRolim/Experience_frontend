<template>
  <div class="list-exams" :class="getSituation">
    <span><font-awesome-icon icon="flask" size="2x" class="icon" :style="{color: 'rgba(71, 77, 94, 1)'}"/></span>
    <div class="label">
      <span>Exames</span>
      <span class="exams">{{exams}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendanceExams',
  props: {
    exams: String
  }
}
</script>

<style lang="sass" scoped>
$border-value: 1px solid
$p-side: 12px
$p-top-bott: 5px
.list-exams
  display: flex
  flex-direction: row
  align-items: center
  vertical-align: middle
  @include respond-to(handhelds)
    width: 100%
    padding: 10px 0
.list-exams
  padding-top: $p-top-bott
  @include respond-to(handhelds)
    padding-left: $p-side
.list-exams span
  display: flex
  flex-direction: row
  align-items: center
.exams
  @include respond-to(handhelds)
    width: 90%
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