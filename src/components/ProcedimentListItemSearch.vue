<template>
  <code-drop-down class="dropdown">
    <template v-slot:content>
      <div class="dropdown__procediment">
        <div class="dropdown__search">
          <code-input 
            name="procediment"
            type="text"
            :width="12"
            :height="10"
            v-model="mnemonic"
            icon="search"
            placeholder="procedimento"
          />
        </div>
        <div class="dropdown__button">
          <code-button
            text="Localizar"
            bcolor="white"
            color="light"
            letters="uppercase"
            bolded
            size="sm"
            streched
            borded
            name-icon="search"
            @click="search"
          ></code-button>
        </div>
      </div>
    </template>
  </code-drop-down>
</template>
<script>
import CodeInput from './base/CodeInput'
import CodeDropDown from './base/CodeDropDown'
import CodeButton from './base/CodeButton'
import { mapActions } from 'vuex'
import { 
  GET_PROCEDIMENTS_LIKE_STORE,
  GET_PROCEDIMENTS_LIKE,
  NAMESPACED_PROCEDIMENT 
} from '../utils/alias'
export default {
  name: 'ProcedimentListItemSearch',
  components: {
    CodeInput,
    CodeDropDown,
    CodeButton
  },
  data () {
    return {
      mnemonic: '',
      LIMIT: 10,
      PAGE: 1
    }
  },
  methods: {
    ...mapActions(NAMESPACED_PROCEDIMENT, {
      getProcediment: GET_PROCEDIMENTS_LIKE_STORE
    }),
    search () {
      let params = { limit: this.LIMIT, page: this.PAGE}
      let url = GET_PROCEDIMENTS_LIKE(this.mnemonic)
      this.getProcediment({ url, params })
        .then((resp) => console.log(resp))
    }
  }
}
</script>
<style lang="sass" scoped>
.dropdown
  display: flex
  flex-direction: row
  width: 100%
  @include respond-to(handhelds)
    flex-direction: column
.dropdown__procediment
  display: flex
  justify-content: space-around
  padding: 10px
  width: 100%
  @include respond-to(handhelds)
    flex-direction: column
.dropdown__search
  width: 84%
  @include respond-to(handhelds)
    width: 100%
.dropdown__button
  width: 14%
  @include respond-to(handhelds)
    margin-top: 20px
    width: 100%
</style>