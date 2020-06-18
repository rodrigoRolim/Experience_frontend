<template>
  <div class="procediments">
    <div class="procediment__navbar">
      <the-navbar logo="logo_cedro">
        <template v-slot:perfil>
          <div class="procediments__menu">
            <code-button
              class="procediments__sign"
              text="sign-in" 
              borded
              letters="uppercase"
              color="dark"
              size="md"
              size-icon="lg"
              transparent
              @click="redirectToLogin"
            />
            <code-button
              class="procediments__manual"
              text="manuais"
              borded
              letters="uppercase"
              size="md"
              transparent
            />
          </div>
        </template>
      </the-navbar>
    </div>
    <procediment-list />
  </div>
</template>

<script>
import CodeButton from '../components/base/CodeButton'
import ProcedimentList  from '../components/ProcedimentList'
import TheNavbar from '../components/TheNavbar'
export default {
  name: 'Procediments',
  components: { 
    ProcedimentList,
    TheNavbar,
    CodeButton
  },
  data () {
    return {

    }
  },
  methods: {
    redirectToLogin () {
      this.$router.push({path: '/acesso'})
    }
  }
}
</script>

<style lang="sass" scoped>
.procediment__navbar
  position: fixed
  top: 0
  left: 0
  width: 100%
.procediments__manual

.procediments__sign
  margin-right: 15px
</style>