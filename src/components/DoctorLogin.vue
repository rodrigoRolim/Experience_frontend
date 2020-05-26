<template>
  <div class="doctor-login">
    <form class="doctor-login__form">
      <div class="doctor-login__selects">
        <div class="doctor-login__cr">
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
       <div class="doctor-login__uf">
          <code-label
            bind="ufConselho"
            label="UF conselho"
            color="#676a6c"
            :fontWeight="700"
            fontSize="0.8rem"
            fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
          ></code-label>
          <code-select
            class="doctor-login__cr-select"
            name="ufConselho"
            :options="ufs"
            option="escolha um doce"
            :hasIcon="false"
            :width="9"
            :height="7"
          ></code-select>
       </div>
      </div>
      <div class="doctor-login__crm">
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
          :width="9"
          :height="7"
          :weight="500"
          icon="stethoscope"
          color="#333"
        />
      </div>
      <div class="doctor-login__password">
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
          :width="9"
          :height="7"
          :weight="500"
          color="#333"
          icon="lock"
        />
      </div>
      <div class="doctor-login__doubt">
        <code-tooltip
          text="Clique aqui"
        >
          <template>
            <small class="doctor-login__doubt-button">duvidas <i><font-awesome-icon icon="question-circle"/></i></small>
          </template>
        </code-tooltip> 
      </div>
      <div class="doctor-login__buttons">
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
.doctor-login
  width: 100%
  height: 100%
  background-color: white
.doctor-login__selects
  display: flex
  justify-content: space-between
  width: 100%
.doctor-login__cr
  width:  48%
.doctor-login__uf
  width: 48%
.doctor-login__form
  display: flex
  flex-direction: column
  padding: 20px
.doctor-login__selects,
.doctor-login__crm,
.doctor-login__password
  margin: 7px 0
.d-selects
  display: flex
  flex-direction: row
  justify-content: space-between
.doctor-login__buttons
  display: flex
  flex-direction: row
  width: 100%
.doctor-login__doubt
  display: flex
  flex-direction: row
  justify-content: flex-end
  align-items: baseline
  margin: 20px 0
.doctor-login__doubt .doctor-login__doubt-button
  color: rgb(52, 181, 131)
  cursor: pointer
</style>
