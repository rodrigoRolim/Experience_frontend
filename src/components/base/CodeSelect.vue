<template>
  <div class="custom-select" :id="name">
    <div class="custom-select__select" tabindex="0">
      <i 
        class="custom-select__icon" 
        v-if="icon">
        <font-awesome-icon :icon="icon" />
      </i>
      <input 
        @input="filterOptions = $event" 
        class="custom-select__input"
        :class="{'custom-select__input--icon': icon}" 
        v-model="selectedInput" />
      <span class="custom-select__arrow">
        <div 
          class="custom-select__line-l"
          :class="{
            'custom-select__line-l--select-down': !lineAnimation,
            'custom-select__line-l--select-up': lineAnimation
          }"
        ></div>
        <div class="custom-select__line-r"
          :class="{
            'custom-select__line-r--select-down': !lineAnimation,
            'custom-select__line-r--select-up': lineAnimation
          }"
        ></div>
      </span>
      <div class="custom-select__message-error"  v-if="error">
        <small class="custom-select__text-error">{{error}}</small>
      </div>
    </div>
    <ul tabindex="1" class="custom-select__list" v-if="showList">
      <li 
        v-for="option in filterOptions" 
        :key="option.id" 
        class="custom-select__option"
        @click="selected(option)"
      >
        {{option.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CodeSelect',
  props: {
    options: Array,
    icon: String,
    name: String,
    error: String
  },
  data () {
    return {
      digiteds: '',
      showList: false,
      lineAnimation: false,
      selectedInput: ''
    }
  },
  mounted () {
    this.dropDown()
  },
  computed: {
    filterOptions: {
      set: function (e) {
        this.digiteds = e.target.value
        let isOption = this.options.filter((option) => option.name === this.digiteds)

        if (!isOption) {
          this.$emit('selected', this.digiteds)
        }
      },
      get: function () {
        return this.options.filter((option) => option.name.includes(this.digiteds))
      }
    }
  },
  methods: {
    dropDown () {
      document.addEventListener('click', (e) => {
        if (e.target.closest('#'+this.name)) {
          this.showList = true
          this.lineAnimation = true
        } else {
          this.showList = false
          this.lineAnimation = false
        }
      })
    },
    selected (option) {
      this.selectedInput = option.name
      this.$emit('selected', this.selectedInput)
    }
  }
}
</script>

<style lang="sass" scoped>
.custom-select 
  position: relative
.custom-select__list
  display: block
  border: 1px solid transparent
  background-color: white
  position: absolute
  padding: 10px 30px
  left: 0
  margin: 0
  min-width: 150px
  z-index: 999
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)
  border-bottom-left-radius: 2px
  border-bottom-right-radius: 2px
  color: #58595a
.custom-select__option
  list-style-type: none
  cursor: pointer
  margin: 5px 0px
.custom-select__select
  display: flex
.custom-select__select:focus
  outline: none
.custom-select__input
  width: 100%
  margin: 0
  padding: 9px 7px
  border-top-left-radius: 4px
  border-bottom-left-radius: 4px
  border: 1px solid lightgray
  border-right: none
  outline: none
.custom-select__input--icon
  border-left: none
  border-top-left-radius: 0
  border-bottom-left-radius: 0 
.custom-select__icon
  display: flex
  justify-content: center
  align-items: center
  width: 40px
  border: 1px solid lightgray
  background-color: white
  border-top-left-radius: 4px
  border-bottom-left-radius: 4px
  border-right: 0
  color: lightslategray
.custom-select__line-l
  width: 10px
  position: relative
  right: -2px
  border-bottom: 2px solid gray
  transition: transform 0.5s
  margin: 0
.custom-select__line-r
  width: 10px
  position: relative
  left: -2px
  transition: transform 0.5s
  border-bottom: 2px solid gray
  margin: 0
.custom-select__line-l--select-down
  transform: rotateZ(45deg)
.custom-select__line-r--select-down
  transform: rotateZ(-45deg)
.custom-select__line-l--select-up
  transform: rotateZ(-45deg)
.custom-select__line-r--select-up
  transform: rotateZ(45deg)
.custom-select__arrow
  display: flex
  justify-content: center
  align-items: center
  border: 1px solid lightgray
  border-left: none
  border-top-right-radius: 4px
  border-bottom-right-radius: 4px
  width: 35px
  background-color: white
.custom-select__message-error
  display: flex
  flex-direction: row
  margin-left: 10px
  color: $danger
.custom-select__text-error
  font-style: italic
  margin-bottom: 0
</style>