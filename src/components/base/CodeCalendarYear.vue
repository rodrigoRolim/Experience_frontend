<template>
  <div class="calendar-years">
    <button
      type="button"
      @click.stop.prevent="toggleListOfYears"
      class="calendar-years__button"
    >{{selectedYear}}</button>
    <div class="calendar-years__options" v-show="displayList">
      <a
        class="calendar-years__option"
        v-for="year of generateListOfYears"
        :key="year"
        href="javascript:void(0)"
        @click="selectYear(year)"
      >{{year}}</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CodeCalendarYear',
  props: {
    inputYear: [Number, String]
  },
  data() {
    return {
      displayList: false
    }
  },
  created() {
    //this.selectedYear = new Date().getFullYear()
   // this.$emit('year', this.selectedYear)
  }, 
  filters: {
    concatHashtag(value) {
      return '#'+value
    }
  },
  computed: {
    selectedYear: {
      get() {
        return this.inputYear
      },
      set(value) {

        this.$emit('outputYear', value)
      }
    },
    generateListOfYears() {
      var max = new Date().getFullYear()
      var min = max - 130
      var years = []

      for (var i = max; i >= min; i--) {
        years.push(i)
      }
      return years
    }
  },
  methods: {
    toggleListOfYears() {
      this.displayList = !this.displayList
    },
    selectYear(value) {
      this.selectedYear = value
      this.toggleListOfYears()
      //this.$emit('year', value)
    }
  }
}
</script>

<style lang="sass" scoped>
.calendar-years
  display: flex
  flex-direction: column
.calendar-years__options
  display: flex
  flex-direction: column
  position: absolute
  max-height: 250px
  overflow: auto
  background-color: white
  top: 28px
.calendar-years__button
  border: none
  background-color: white
  font-size: 1.1rem
  font-family: Roboto, Arial, sans-serif
  color: #505050
  outline: none
.calendar-years__option
  text-decoration: none
  color: #505050
  padding: 2px 10px
</style>