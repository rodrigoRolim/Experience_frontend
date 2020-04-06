<template>
  <div class="change-pass">
    <div class="change-pass__message"></div>
    <div class="inputs">
      <div class="inputs__last-password">
        <code-label
          label="Doces"
          color="#676a6c"
          :fontWeight="500"
          fontSize="1.0rem"
          fontFamily='"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ></code-label>
        <code-input
          label="number"
          placeholder=""
          :hasIcon="true"
          name="number"
          type="password"
          :width="9"
          :height="7"
          required
          v-model="value"
        >
          <template v-slot:icon>
            <font-awesome-icon icon="password" :style="{ color: '#676a6c' }"></font-awesome-icon>
          </template>
        </code-input>
      </div>
      <div class="inputs__new-password">

      </div>
    </div>
  </div>
</template>
<script>
import CodeInput from './base/CodeInput'
import CodeLabel from './base/CodeLabel'
export default {
  name: 'ChangePasswordForm',
  components: {
    CodeInput
  }
}
</script>
<style lang="sass" scoped>

</style>