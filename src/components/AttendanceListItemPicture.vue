<template>
  <div class="picture" :class="getSituation">
    <img :src="require(`@/assets/${photo}`)" ref="photo" alt="asdasd"/>
  </div>
</template>

<script>
import { situation } from '../mixins/situation'
export default {
  name: 'AttendanceListItemPicture',
  mixins: [situation],
  props: {
    photo: String,
    situation: String
  },
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<style lang="sass" scoped>

@import "../styles/_colors.sass"

$border-value: 1px solid

.picture
  margin-right: 20px
  width: 80px
  height: 80px
  overflow: hidden
  border-radius: 50%
.picture img
  width: 80px
  height: 100px
.picture.pendency
  border: $border-value $EP
.picture.finished
  border: $border-value $TF
.picture.partial-finished
  border: $border-value $PF
.picture.in-progress
  border: $border-value $EA
.picture.unrealized
  border: $border-value $NR
</style>