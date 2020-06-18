<template>
  <div class="about">
    <div class="about__image">
      <img 
        :src="require('../assets/logo_experience.png')" 
        alt="logo experience"
        class="about__img" 
      />
    </div>
    <div class="about__version">
      <small class="about__number-version">v2.0</small>
    </div>
    <div class="about__text">
      <h1 class="about__title">Aplicação para visualização de resultados</h1>
      <div class="about__content">
        <p class="about__section first_section">
          O <strong>eXperience</strong>
          é uma ferramenta que fornece a você, de forma objetiva e bastante simples,
          a possibilidade de verificar os resultados dos exames de seus clientes em 
          qualquer lugar, a qualquer hora, acompanhando o andamento de suas análises.
        </p>
        <p class="about__section second_section">
          Evite custos desnecessários. Esta é a mais nova proposta que temos para você
        </p>
      </div>
    </div>
    <div class="about__codemed">
      <small class="about__title-img">
				Desenvolvido por:
      </small>
      <img :src="require('../assets/logo_cod.png')" alt="logo codemed">
    </div>
  </div>
</template>

<script>
export default {
  name: 'about'
}
</script>

<style lang="sass" scoped>
.about
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 100vh
.about__image
  display: flex
  justify-content: center
  align-items: center
.about__text
  display: flex
  flex-direction: column
  text-align: center
  justify-content: center
  align-items: center
  width: 80%
  margin-bottom: 30px
  color: dimgray
.about__codemed
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
.about__title-img
  display: flex
  margin-bottom: 10px
  color: gray
  font-size: 12px
.about__title
  color: $green
  margin-bottom: 10px
  font-weight: 200
  font-size: 1.7rem
.about__version
  display: flex
  justify-content: center
  align-items: center
  margin: 20px 0
.about__section
  margin: 10px 0
  line-height: 22px
.about__number-version
  color: gray
</style>