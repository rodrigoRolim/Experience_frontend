<template>
  <div class="custom-select" id="custom-select">
    <div class="custom-select__select" tabindex="0">
      <input type="text" class="custom-select__input">
      <span class="custom-select__icon">
        <div class="custom-select__line-l"></div>
        <div class="custom-select__line-r"></div>
      </span>
    </div>
    <ul tabindex="1" class="custom-select__list" v-if="showList">
      <li 
        v-for="option in options" 
        :key="option.id" 
        class="custom-select__option"
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
    options: Array
  },
  data () {
    return {
      digiteds: '',
      showList: false
    }
  },
  momunted () {
    this.dropDown()
  },
  computed: {
    filterOptions: {
      set: function (e) {
        this.digiteds = e.target.value
      },
      get: function () {
        return this.options.filter((option) => option.name.includes(this.digiteds))
      }
    }
  },
  methods: {
    dropDown () {
      document.addEventListener('click', (e) => {
        if (e.target.closest('#custom-select')) {
          this.showList = true
        } else {
          this.showList = false
        }
      })
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
.custom-select__container-input
  display: flex
.custom-select__container-input:focus
  outline: none
.custom-select__container-input:focus .custom-select__input
  border: 1.5px solid rgb(206, 3, 206)
  border-right: 0
.custom-select__container-input:focus .custom-select__icon
  border: 1.5px solid rgb(206, 3, 206)
  border-left: 0
.custom-select__input
  width: 100%
  margin: 0
  padding: 9px 7px
  border-top-left-radius: 4px
  border-bottom-left-radius: 4px
  border: 1.5px solid purple
  border-right: none
  outline: none
.custom-select__line-l
  width: 10px
  position: relative
  right: -2px
  border-bottom: 2px solid purple
  transition: transform 0.5s
  margin: 0
.custom-select__line-r
  width: 10px
  position: relative
  left: -2px
  transition: transform 0.5s
  border-bottom: 2px solid purple
  margin: 0
.custom-select__line-l--select-down
  transform: rotateZ(45deg)
.custom-select__line-r--select-down
  transform: rotateZ(-45deg)
.custom-select__line-l--select-up
  transform: rotateZ(-45deg)
.custom-select__line-r--select-up
  transform: rotateZ(45deg)
.custom-select__icon
  display: flex
  justify-content: center
  align-items: center
  border: 1.5px solid purple
  border-left: none
  border-top-right-radius: 4px
  border-bottom-right-radius: 4px
  width: 35px
.custom-select__item--hidden
  display: none
</style>