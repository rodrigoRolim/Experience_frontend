<template>
<div class="progress">
  <div class="progress__percent">
    {{numExams}} exame(s) / {{dones}} pronto(s)
  </div>
  <div class="progress__content">
    <div
      v-for="n of size()"
      :key="n"
      class="progress__block"
    ></div>
  </div>
</div>
</template>

<script>
export default {
  name: "CodeProgress",
  props: {
    numExams: {
      type: Number,
      validator: function(value) {
        return value > 0
      }
    },
    dones: Number,
    max: {
      types: Number,
      default: 10
    }
  },
  data() {
    return {
    
    }
  },

  methods: {
    size() {
      if (this.numExams) {
        const rate = this.dones/this.numExams
        return Math.floor(rate * this.max)
      }
      return 0
    }
  }
  
}
</script>

<style lang="sass" scoped>
.progress__percent
  margin-bottom: 2px
.progress__content
  display: flex
  flex-direction: row
  border: 1px solid rgba(0,0 ,0 , 0.4)
  min-width: 140px 
  min-height: 14px
  border-radius: 4px
.progress__block
  background-color: #ccc
  height: 8px
  width: 10px
  margin: 2px
</style>