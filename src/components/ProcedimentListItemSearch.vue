<template>
  <code-drop-down class="dropdown">
    <template v-slot:content>
      <div class="dropdown__search">
        <code-input 
          name="procediment"
          type="text"
          :width="9"
          :height="7"
          v-model="value"
          :hasIcon="true"
          placeholder="procedimento"
        >
          <template v-slot:icon>
            <font-awesome-icon icon="search" :style="{ color:'#676a6c' }"/>
          </template>
        </code-input>
      </div>
      <div class="dropdown__button">
        <code-button
          padding="10px 0"
          text="Localizar"
          bcolor="white"
          color="gray"
          :fontWeight="600"
          icon="search"
          @click="teste"
        ></code-button>
      </div>
    </template>
  </code-drop-down>
  
</template>
<script>
import CodeInput from './base/CodeInput'
import CodeDropDown from './base/CodeDropDown'
import CodeButton from './base/CodeButton'
export default {
  name: 'ProcedimentListItemSearch',
  components: {
    CodeInput,
    CodeDropDown,
    CodeButton
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    teste () {
      console.log(this.value)
    }
  }
}
</script>
<style lang="sass" scoped>
.dropdown
  display: flex
  flex-direction: row
  @include respond-to(handhelds)
    flex-direction: column
.dropdown__search
  width: 80%
  @include respond-to(handhelds)
    width: 100%
.dropdown__button
  width: 18%
  @include respond-to(handhelds)
    margin-top: 20px
    width: 100%
</style>