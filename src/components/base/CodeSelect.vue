<template>
  <div class="custom-select" :id="name" ref="box">
    <div class="custom-select__select" ref="containerInput">
      <i 
        class="custom-select__icon"
        :class="{ 'custom-select__icon--required': error }"
        v-if="icon">
        <font-awesome-icon :icon="icon" />
      </i>
      <input
        ref="input"
        :name="name"
        @input="filterOptions = $event"
        @keypress.enter.prevent="enter"
        class="custom-select__input"
        autocomplete="off"
        :class="{
          'custom-select__input--icon': icon, 
          'custom-select__input--invalid': invalidOption,
          'custom-select__input--required': error
        }"
        v-model="selectedInput"
        placeholder="selecione uma opção" 
      />
      <span class="custom-select__arrow" :class="{'custom-select__arrow--required': error}">
        <div 
          class="custom-select__line-l"
          :class="{
            'custom-select__line-l--select-down': !lineAnimation,
            'custom-select__line-l--select-up': lineAnimation,
            'custom-select__line-l--required': error
          }"
        ></div>
        <div class="custom-select__line-r"
          :class="{
            'custom-select__line-r--select-down': !lineAnimation,
            'custom-select__line-r--select-up': lineAnimation,
            'custom-select__line-r--required': error
          }"
        ></div>
      </span>
    </div>
    <div class="custom-select__message-error"  v-if="error">
      <small class="custom-select__text-error">{{ error }}</small>
    </div>
    <div :class="{'custom-select__modal': showModalList}" @click.self="closeList">
      <ul
        ref="list"
        class="custom-select__list" 
        :class="{'custom-select__list--invalid': invalidOption}"
        v-show="showList || invalidOption" 
        role="list">
        <li class="custom-select__invalid-option" v-show="invalidOption">opção inválida</li>
        <li 
          ref="items"
          role="listitem"
          v-for="(option, i) in filterOptions" 
          :key="i"
          :data-value="option.id"
          :data-selected="option.id" 
          class="custom-select__option"
          @click="selectItem(option.name)"
          :class="{'custom-select__option--focused': i == currentOption}"
        >
          {{option.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeSelect',
  props: {
    options: [Set, Array],
    icon: String,
    name: String,
    error: String,
    value: [Object, String]
  },
  data () {
    return {
      digiteds: '',
      showList: false,
      lineAnimation: false,
      invalidOption: false,
      showModalList: false,
      currentOption: -1,
      DOWN_ARROW_KEY_CODE: 40,
      UP_ARROW_KEY_CODE: 38,
      ENTER_KEY_CODE: 13,
      TAB_KEY_CODE: 9
    }
  },
  mounted () {
    this.dropDownEvent()
    this.keyEvents()
    this.checkListPosition()
  },
  computed: {
    selectedInput: {
      set: function (value) {
        this.$emit('input', value)
        this.$emit('key', value?.id)
      },
      get: function () {
        return this.value?.name || this.value
      }
    },
    filterOptions: {
      set: function (e) {
        this.digiteds = e.target.value
        let isOption = this.searchOptionByName(this.digiteds)

        if (isOption.length > 0) {
          this.selectItem(this.digiteds)
          return
        }
      },
      get: function () {
        return this.filterOptionsByKeys
      }
    },
    selectName: function () {
      return '#' + this.name 
    },
    filterOptionsByKeys: function () {
      return this.options.filter((option) => option.name.includes(this.digiteds))
    },
  },
  watch: {
    filterOptionsByKeys () {
      this.currentOption = -1
    },
    digiteds () {
      this.triggerInternalError(false)
    }
  },
  methods: {
    enter (e) {
      this.$emit('enter', e)
    },
    dropDownEvent () {
      document.addEventListener('click', this.toggleListByClick)
      this.$refs.input.addEventListener('focus', this.openList)
    },
    keyEvents () {
      this.$refs.input.addEventListener('keydown', this.pickerOptions)
    },
    toggleListByClick (e) {
      if (!e.target.closest(this.selectName)) {
        this.closeList()
      }
    },
    selectItem (option) {
      let isOption = null
      let selectOption = option?.name || option

      if (selectOption) {
        isOption = this.searchOptionByName(selectOption)
      }
      if (!isOption || isOption.length > 0) {
        this.triggerInternalError(false)
        this.selectedInput = option
        this.closeList()
        return
      }
      this.triggerInternalError(true)
    },
    closeList () {
      this.showList = false
      this.lineAnimation = false
      this.showModalList = false
    },
    openList () {
      this.showList = true
      this.lineAnimation = true
      this.showModalList = true
    },
    valideOption (optionName) {

      let isOption = this.searchOptionByName(optionName)

      if (isOption.length > 0) {
        this.triggerInternalError(false)
      } else {
        this.triggerInternalError(true)
      }
    },
    searchOptionByName (optionName) {
      return this.filterOptionsByKeys.filter((option) => option.name === optionName)
    },
    nextItem () {
      this.currentOption++
      if (this.filterOptionsByKeys.length === this.currentOption)
        this.currentOption = 0
    },
    previousItem () {
      if (this.currentOption === 0)
        this.currentOption = this.filterOptionsByKeys.length
      this.currentOption--
    },
    pickerOptions (e) {
      if (!this.showList)
        this.openList()

      switch (e.keyCode) {
        case this.DOWN_ARROW_KEY_CODE:
          this.nextItem()
          return
        case this.UP_ARROW_KEY_CODE:
          this.previousItem()    
          return
        case this.ENTER_KEY_CODE:
          if (this.currentOption > -1 && this.filterOptionsByKeys.length > 0) {
            this.selectItem(this.filterOptionsByKeys[this.currentOption])
          } else {
            this.selectItem(this.digiteds)
          }
          this.closeList()
          return
        case this.TAB_KEY_CODE:
          this.closeList()
          this.triggerInternalError(false)
          return
      }
    },
    triggerInternalError (value) {
      this.invalidOption = value
    },
    checkListPosition () {
      var targetNode = this.$refs.list
      var observer = new MutationObserver(() => {

        if (targetNode.style.display != 'none') {

          let bottom = this.$refs.box.getBoundingClientRect().bottom
        
          if (window.innerHeight - bottom <= targetNode.clientHeight) {
            this.$refs.list.style.bottom = '100%'
            this.$refs.list.style.top = ''
          } else {
          
            this.$refs.list.style.top = '100%'
            this.$refs.list.style.bottom = ''
          }
        }
      })
      observer.observe(targetNode, { attributes: true, childList: true })
    },
  }
}
</script>

<style lang="sass" scoped>
.custom-select 
  position: relative
.custom-select__modal
  @include respond-to(handhelds)
    display: flex
    justify-content: center
    align-items: center
    overflow: auto
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    bottom: 0
    z-index: 999
    background-color: rgba(0,0,0,0.5)
.custom-select__list
  display: block
  border: 1px solid transparent
  background-color: white
  position: absolute
  left: 0
  margin: 0
  min-width: 250px
  max-height: 200px
  overflow: auto
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)
  border-bottom-left-radius: 2px
  border-bottom-right-radius: 2px
  color: #58595a
  z-index: 100
  @include respond-to(handhelds)
    top: 0
    bottom: 0
    width: 100px
    position: static
.custom-select__list--invalid
  background-color: #ffcbcb !important
.custom-select__option,
.custom-select__invalid-option
  list-style-type: none
  cursor: pointer
  margin: 5px 0px
  padding: 5px 10px
  text-transform: uppercase
  font-size: 0.9rem
.custom-select__invalid-option
  color: white
  background-color: red
  margin: 0
.custom-select__select
  display: flex
.custom-select__select:focus
  outline: none
.custom-select__input
  width: 100%
  min-width: 20px
  margin: 0
  padding: 10px 7px
  font-size: 14px
  text-transform: uppercase
  border-top-left-radius: 4px
  border-bottom-left-radius: 4px
  border: 1px solid lightgray
  border-right: none
  outline: none
.custom-select__input--required,
.custom-select__line-l--required,
.custom-select__line-r--required,
.custom-select__arrow--required
  border-color: $danger !important
.custom-select__icon--required
  border-color: $danger !important
  color: $danger !important
.custom-select__input::placeholder
  font-size: 14px
  text-transform: none
.custom-select__option--focused
  background-color: rgba(0, 0, 0, 0.09)
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
  position: absolute
  display: flex
  flex-direction: row
  margin-left: 10px
  color: $danger
  z-index: 0
.custom-select__text-error
  font-style: italic
  margin-bottom: 0
.custom-select__input--invalid
  background-color: #ffcbcb
</style>