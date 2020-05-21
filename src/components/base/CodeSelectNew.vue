<template>
  <div :class="'container ' + name">
    <div class="container__input" @click="toggleDisplaySelect" >
      <input type="text" v-model="value" @keyup="filterInput" @blur="verifyInput" ref="input"/>
      <i class="container__input__icon" ref="icon"><font-awesome-icon :icon="display ? 'caret-down' : 'caret-up'"/></i>
    </div>
    
    <ul class="container__list" 
      :class="{'container__list--close': display, 'container__list--open': !display}">
      <li class="container__list__item" v-for="(item, i) in listFilter" :key="i" @click="selected(item)">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CodeSelectNew',
  props: {
    height: Number,
    width: Number,
    name: String,
    list: { 
      type: Array,
      default: function () { return [] } 
    }
  },
  data () {
    return {
      display: true,
      value: '',
      listFilter: []
    }
  },
  created () {
    ['click', 'scroll'].forEach(event => {
      window.addEventListener(event, (e) => {
        if (!this.checkEventPathForClass(e.path, this.name)) {

          this.display = true
        }
      })
    })
  },
  mounted () {
    this.listFilter = this.list
  },
  methods: {
    filterInput (e) {
      this.display = false
      let item = ''
      item = e.target.value + item
      let pattern = new RegExp(item)

      this.listFilter = this.list.filter(it => pattern.test(it))
      
    },
    selected (value) {
      //console.log(value)
      this.value = value
      this.display = !this.display
    },
    toggleDisplaySelect (e) {
      if (!this.checkEventPathForClass(e.path, 'container__list')) {

        this.display = !this.display
      }
    },
    checkEventPathForClass (path, selector) {
      for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
          return true
        }
      }
      return false
    },
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
  width: 30px
  color: dimgray
  border: 1px solid lightgray
  border-left: none
  padding: 9px 0
  border-top-right-radius: 3px
  border-bottom-right-radius: 3px
.container__input input
  width: 100%
  padding: 9px 7px
  width: 100%
  border-radius: 3px
  border-top-right-radius: 0
  border-bottom-right-radius: 0
  border: 1px solid lightgray
  font-size: 14px
  border-right: none
  outline: none
.container__list--open
  display: flex
  flex-direction: column
.container__list--close
  display: none
.container__list
  position: absolute
  max-height: 250px
  overflow: auto
  top: 100%
  left: 0
  right: 0
  z-index: 999
  background-color: white
  width: 100% 
  border: 1px solid lightgray
  padding-inline-start: 0
  margin-block-end: 0
  margin-block-start: 0
.container__list .container__list__item
  list-style-type: none
  position: relative
  padding: 8px 0
  padding-left: 20px
  margin-right: 0
  color: darkslategray
  cursor: pointer
  pointer-events: all
.container__list .container__list__item:hover
  background-color: rgba(0,0,0,0.08)

</style>