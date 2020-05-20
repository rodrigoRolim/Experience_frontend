<template>
  <div class="help-login">
    <div class="help-login__header"> 
      <strong class="help-login__title-primary">como acessar</strong>
      <div class="help-login__close">
        <i @click="close"><font-awesome-icon icon="times" size="lg"/></i>
      </div>
    </div>
    <div class="help-login__body">
      <div class="help-login__title-second">
        <h1 class="help-login__title-instruct-acess">Instruções de acesso</h1>
      </div>
      <div class="help-login__content">
        <div class="help-login__unique-attendance">
          <h2 class="help-login__title-h2">Acesso - Atendimento Único</h2>
          <p class="help-login__unique-attendance-text">
            Esse tipo de acesso permiti a visualização dos exames e resultados 
            de um único atendimento, para isso utilize das credenciais ID e Senha
            que estão presentes no <strong class="help-login__unique-attendance-text--uppercase">comprovante de resultados.</strong>
          </p>
          <div class="help-login__image">
            <img src="../assets/card.png" class="help-login__image-item"/>
          </div>
        </div>
        <div class="help-login__historic-results">
          <h2 class="help-login__title-h2">Acesso - Histórico de Resultados</h2>
          <p class="help-login__historic-results-text">
            Através deste modo é possível ter acesso ao seu histórico de atendimentos, 
            e assim facilitar o comparativo com resultados anteriores. Para isso será
            necessário a solicitação de <strong>Senha Única</strong> que deverá ser cadastrada
            em qualquer das unidades.
          </p>
          <p class="help-login__historic-results-text">
            Na sua próxima visita solicite a uma das nossas atendentes o cadastro da Senha
            Única e aproveite esta vantagem.
          </p>
        </div>
      </div>
    </div>
    <div class="help-login__buttons">
      <code-button
        @click="close"
        class="help-login__ok-button"
        text="Ok"
        color="primary"
      />
    </div>
  </div>
</template>
<script>
import CodeButton from './base/CodeButton'
export default {
  name: 'HelpToLogin',
  components: {
    CodeButton
  },
  methods: {
    close () {
      this.$emit('close', false)
    }
  }
}
</script>
<style lang="sass" scoped>
.help-login__title-instruct-acess
  padding: 0
  margin: 0
  font-size: 1.7rem
.help-login__title-h2
  font-size: 1.0rem
  color: #368c8c
.help-login
  display: flex
  flex-direction: column
  background-color: white
  width: 900px
  @include respond-to(medium-screens)
    width: 700px
  @include respond-to(handhelds)
    width: 100%
    height: 100vh
  border-radius: 4px
.help-login__header
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  color: gray
  border-bottom: 1px solid lightgray
  padding: 3% 2%
  margin-bottom: 20px
.help-login__title-primary
  margin: 0 auto
.help-login__close
  margin: 0px 8px 0 0
.help-login__title-second
  background-color: #368c8c
  color: white
  display: flex
  flex-direction: row
  justify-content: center
  padding: 8px 0
  margin-bottom: 20px
.help-login__buttons
  display: flex
  flex-direction: row
  justify-content: flex-end
  align-items: flex-end
  height: 12vh
  padding: 20px
.help-login__ok-button
  width: 20%
  @include respond-to(handhelds)
    width: 100%
.help-login__body
  padding: 0 20px
.help-login__content
  display: flex
  flex-direction: row
  max-height: 60vh
  overflow: auto
  @include respond-to(medium-screens)
    flex-direction: column
  @include respond-to(handhelds)
    flex-direction: column
.help-login__unique-attendance-text,
.help-login__historic-results
  padding: 0 30px
  text-align: justify
.help-login__unique-attendance .help-login__unique-attendance-text,
.help-login__historic-results .help-login__historic-results-text
  font-size: 0.94rem
  color: dimgray
.help-login__unique-attendance
  width: 55%
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
.help-login__historic-results
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
  width: 45%
.help-login__image
  display: flex
  flex-direction: row
  justify-content: center
.help-login__image .help-login__image-item
  @include respond-to(medium-screens)
    height: 25vh
  @include respond-to(handhelds)
    height: 25vh
.help-login__unique-attendance-text--uppercase
  text-transform: uppercase
  font-size: 0.8rem
</style>