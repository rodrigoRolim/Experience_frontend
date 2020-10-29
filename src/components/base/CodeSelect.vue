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
        @input="filterOptions = $event.target.value"
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
      <input :name="name" style="display:none" autocomplete="address-level4"/>
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
          @click="filterOptions = option.name"
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
      set (value) {
        console.log(value)
        this.$emit('input', value)
        this.$emit('key', value?.id)
      },
      get () {
        return this.value?.name || this.value
      }
    },
    filterOptions: {
      set (value) {
        this.digiteds = value.toLowerCase()
        let isOption = this.searchOptionByName(this.digiteds)
        if (isOption.length === 1) {
          this.selectItem(...isOption)
          return
        }
        this.triggerInternalError(true)
      },
      get () {
        return this.filterOptionsByKeys
      }
    },
    selectName () {
      return '#' + this.name 
    },
    filterOptionsByKeys () {
      console.log(this.digiteds)
      return this.options.filter((option) => option.name.toLowerCase().includes(this.digiteds.toLowerCase()))
    },
  },
  watch: {
    filterOptionsByKeys () {
      this.currentOption = -1
    },
    digiteds (value) {
      let isOption = false
      if (this.digiteds) {
        console.log(this.searchOptionByName(value))
        isOption = !(this.searchOptionByName(value).length === 1)
      }
      this.triggerInternalError(isOption)
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
        this.matchingOption()
      }
    },
    matchingOption () {
      let isOption = false
      if (this.digiteds) {
        isOption = !(this.searchOptionByName(this.digiteds).length === 1)
      }
      this.triggerInternalError(isOption)
    },
    selectItem (selectedOption) {
      selectedOption.name = selectedOption.name.toLowerCase()
      this.selectedInput = selectedOption
      this.triggerInternalError(false)
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
      return this.filterOptionsByKeys.filter((option) => option.name.toLowerCase() === optionName)
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
            this.filterOptions = this.filterOptionsByKeys[this.currentOption].name
          } else {
            this.filterOptions = this.digiteds
          }
          this.closeList()
          return
        case this.TAB_KEY_CODE:
          this.closeList()
          this.matchingOption()
          return
      }
    },
    triggerInternalError (value) {
      this.invalidOption = value
      let message = (value) ? 'valid' : 'no valid'
      let err = { message, error: value }
      this.$emit('error', err)
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