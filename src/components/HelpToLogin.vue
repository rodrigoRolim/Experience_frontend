<template>
  <div class="help_login">
    <div class="help_login__header"> 
      <strong class="help_login__header__title">como acessar</strong>
      <div class="help_login__header__close">
        <i @click="close"><font-awesome-icon icon="times" size="lg"/></i>
      </div>
    </div>
    <div class="help_login__body">
      <div class="help_login__body__title">
        <h1>Instruções de acesso</h1>
      </div>
      <div class="help_login__body__content">
        <div class="help_login__body__content__att">
          <h2>Acesso - Atendimento Único</h2>
          <p>
            Esse tipo de acesso permiti a visualização dos exames e resultados 
            de um único atendimento, para isso utilize das credenciais ID e Senha
            que estão presentes no <strong id="uppercase">comprovante de resultados.</strong>
          </p>
          <div class="help_login__body__content__att__image">
            <img src="../assets/card.png"/>
          </div>
        </div>
        <div class="help_login__body__content__results">
          <h2>Acesso - Histórico de Resultados</h2>
          <p>
            Através deste modo é possível ter acesso ao seu histórico de atendimentos, 
            e assim facilitar o comparativo com resultados anteriores. Para isso será
            necessário a solicitação de <strong>Senha Única</strong> que deverá ser cadastrada
            em qualquer das unidades.
          </p>
          <p>
            Na sua próxima visita solicite a uma das nossas atendentes o cadastro da Senha
            Única e aproveite esta vantagem.
          </p>
        </div>
      </div>
    </div>
    <div class="help_login__buttons">
      <code-button
        @click="close"
        class="help_login__buttons__ok"
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
h1
  padding: 0
  margin: 0
  font-size: 1.7rem
h2
  font-size: 1.0rem
  color: #368c8c
.help_login
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
.help_login__header
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  color: gray
  border-bottom: 1px solid lightgray
  padding: 3% 2%
  margin-bottom: 20px
.help_login__header__title
  margin: 0 auto
.help_login__header__close
  margin: 0px 8px 0 0
.help_login__body__title
  background-color: #368c8c
  color: white
  display: flex
  flex-direction: row
  justify-content: center
  padding: 8px 0
  margin-bottom: 20px
.help_login__buttons
  display: flex
  flex-direction: row
  justify-content: flex-end
  align-items: flex-end
  height: 12vh
  padding: 20px
.help_login__buttons__ok
  width: 20%
  @include respond-to(handhelds)
    width: 100%
.help_login__body
  padding: 0 20px
.help_login__body__content
  display: flex
  flex-direction: row
  max-height: 60vh
  overflow: auto
  @include respond-to(medium-screens)
    flex-direction: column
  @include respond-to(handhelds)
    flex-direction: column
.help_login__body__content__att,
.help_login__body__content__results
  padding: 0 30px
  text-align: justify
.help_login__body__content__att p,
.help_login__body__content__results p
  font-size: 0.94rem
  color: dimgray
.help_login__body__content__att
  width: 55%
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
.help_login__body__content__results
  @include respond-to(medium-screens)
    width: 100%
  @include respond-to(handhelds)
    width: 100%
  width: 45%
.help_login__body__content__att__image img
  @include respond-to(medium-screens)
    height: 25vh
  @include respond-to(handhelds)
    height: 25vh
#uppercase
  text-transform: uppercase
</style>