<template>
  <div class="doctor-login">
    <form class="login-d-form">
      <div class="login-d-cr">
        <div class="login-cr">
          <code-label
            bind="attendance"
            label="Tipo CR"
            color="#676a6c"
            :fontWeight="700"
            fontSize="0.8rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-select
            class="d-cr"
            :options="list"
            name="attendance"
            option="escolha um doce"
            :width="9"
            :height="7"
            :hasIcon="false"
          ></code-select>
        </div>
       <div class="login-uf">
          <code-label
            bind="ufConselho"
            label="UF conselho"
            color="#676a6c"
            :fontWeight="700"
            fontSize="0.8rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-select
            class="d-uf"
            name="ufConselho"
            :options="ufs"
            option="escolha um doce"
            :hasIcon="false"
            :width="9"
            :height="7"
          ></code-select>
       </div>
      </div>
      <div class="login-d-ncrm">
        <code-label
          bind="numcrm"
          label="Número de CR"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <code-input
          placeholder="CR"
          :hasIcon="true"
          name="numcrm"
          type="text"
          required
          v-model="item"
          :width="9"
          :height="7"
          :weight="500"
          icon="stethoscope"
          color="#333"
        />
      </div>
      <div class="login-d-password">
        <code-label
          bind="password"
          label="Senha"
          color="#676a6c"
          :fontWeight="700"
          fontSize="0.8rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <code-input
          placeholder="Senha"
          :hasIcon="true"
          name="password"
          type="password"
          required
          v-model="item"
          :width="9"
          :height="7"
          :weight="500"
          color="#333"
          icon="lock"
        />
      </div>
      <div class="login-d-doubt">
       
        <code-tooltip
          text="Clique aqui"
        >
          <template>
            <small>duvidas <i><font-awesome-icon icon="question-circle"/></i></small>
          </template>
        </code-tooltip> 
      </div>
      <div class="login-d-buttons">
        <code-button
          text="acessar"
          borded
          bolded
          letters="uppercase"
          color="theme"
          size="md"
          shading
          streched
          size-icon="lg"
        ></code-button>
      </div>  
    </form>
  </div>
</template>

<script>
import CodeSelect from './base/CodeSelect'
import CodeInput from './base/CodeInput'
import CodeLabel from './base/CodeLabel'
import CodeButton from './base/CodeButton'
import CodeTooltip from './base/CodeTooltip'
export default {
  name: 'DoctorLogin',
  components: {
    CodeSelect,
    CodeInput,
    CodeLabel,
    CodeButton,
    CodeTooltip
  },
  data () {
    return {
      list: [
        { id: 1, item: 'CRM' },
        { id: 2, item: 'COREN' },
        { id: 3, item: 'CRBIO' },
        { id: 4, item: 'CRBM' },
        { id: 5, item: 'CREFITO' },
        { id: 6, item: 'CRF' },
        { id: 7, item: 'CRFA' }
      ],
      ufs: [
        { id: 1, item: 'MA'},
        { id: 2, item: 'MA'},
        { id: 3, item: 'MA'},
        { id: 4, item: 'MA'},
        { id: 5, item: 'MA'},
        { id: 6, item: 'MA'},
        { id: 7, item: 'MA'},
        { id: 8, item: 'MA'},
        { id: 9, item: 'MA'},
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.login-d-cr
  display: flex
  justify-content: space-between
  width: 100%
.login-cr
  width:  48%
.login-uf
  width: 48%
.doctor-login
  background-color: white
.login-d-form
  display: flex
  flex-direction: column
  padding: 20px
.login-d-cr,
.login-d-ncrm,
.login-d-password
  margin: 7px 0
.d-selects
  display: flex
  flex-direction: row
  justify-content: space-between
.login-d-buttons
  display: flex
  flex-direction: row
  width: 100%
.login-d-doubt
  display: flex
  flex-direction: row
  justify-content: flex-end
  align-items: baseline
  margin: 20px 0
.login-d-doubt small
  color: rgb(52, 181, 131)
  cursor: pointer
</style>
