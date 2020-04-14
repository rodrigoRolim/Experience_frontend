<template>
  <div class="container">
    <div class="container__input">
      <input type="text" v-model="value" />
      <i class="container__input__icon"><font-awesome-icon icon="caret-down"/></i>
    </div>
    
    <ul class="container__list container__list--close">
      <li class="container__list__item selected">item 1</li>
      <li class="container__list__item">item 2</li>
      <li class="container__list__item">item 3</li>
      <li class="container__list__item">item 4</li>
      <li class="container__list__item">item 5</li>
      <li class="container__list__item">item 6</li>
      <li class="container__list__item">item 7</li>
      <li class="container__list__item">item 8</li>
      <li class="container__list__item">item 9</li>
      <li class="container__list__item">item 10</li>
      <li class="container__list__item">item 11</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CodeSelectNew',
  props: {
    height: Number,
    width: Number
  },
  data () {
    return {
      show: false,
      value: ''
    }
  },
  created () {
   /*  window.addEventListener('click', function (e) {
      const container = document.querySelector('.container')
      const select = document.querySelector('.container__list')
      console.log(container.contains(e.target))
      if (container.contains(e.target)) {
        select.classList.replace('container__list--close', 'container__list--open')
      } else {
        select.classList.replace('container__list--open', 'container__list--close')
      }
    }) */
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100%
  position: relative
  display: flex
  flex-direction: column 
.container__input
  display: flex
  flex-direction: row
  position: relative
  background-color: white
.container__input__icon
  width: 2%
  color: dimgray
  border: 1px solid lightgray
  border-left: none
  padding: 9px 0
  border-top-right-radius: 3px
  border-bottom-right-radius: 3px
.container__input input
  width: 98%
  padding: 9px 7px
  width: 100%
  border-radius: 3px
  border-top-right-radius: 0
  border-bottom-right-radius: 0
  border: 1px solid lightgray
  border-right: none
  outline: none
.container__list--open
  display: flex
  flex-direction: column
.container__list--close
  display: none
.container__list
  position: absolute
  top: 100%
  left: 0
  right: 0
  background-color: white
  width: 100% 
  border: 1px solid lightgray
  padding-inline-start: 0
  margin-block-end: 0
  margin-block-start: 0
.container__list li
  list-style-type: none
  position: relative
  padding: 8px 0
  padding-left: 10px
  margin-right: 0
  color: darkslategray
  cursor: pointer
  pointer-events: all
.container__list li:hover
  background-color: rgba(0,0,0,0.08)

</style>