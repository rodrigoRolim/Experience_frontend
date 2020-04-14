<template>
  <div class="pagination">
    <div class="pagination__search">
      <input type="text" name="search" id="search" @keypress.enter="search"/>
    </div>
    <div class="pagination__items">
      <p v-for="item in listFiltered" v-bind:key="item">{{item}}</p>
    </div>
    <div class="pagination__message" v-if="show">
      <span>{{message}}</span>
    </div>
    <div class="pagination__button">
      <button @click="getPagination()" :disabled="show">mais atendimentos</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodePagination',
  data () {
    return {
      value: '',
      show: false,
      message: 'não há mais registros disponíveis para esta consulta',
      pagination: {
        totalItems: null,
        linesPerPage: 10,
        requiredIndex: 0
      },
      listFiltered: [],
      listClient: [],
      listDB: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55]
    }
  },
  created () {

  },
  methods: {
    readAll () {
      let dates = this.listDB.slice(this.pagination.requiredIndex, this.pagination.linesPerPage + this.pagination.requiredIndex)
      let totalItems = this.listDB.length
      let response = {
        totalItems,
        dates
      }
      return response
    },
    getPagination () {

      let res = this.readAll()
      if (res.dates.length == 0) {
        this.show = true
      }

      this.pagination.totalItems = res.totalItems
      this.listClient.push(...res.dates)
      this.listFiltered = this.listClient
      this.pagination.requiredIndex = this.listClient.length
    },
    search (event) {

      let res = this.listClient.includes(event.target.value)
      if (res) {
        this.listFiltered = this.listClient.filter(item => item === +event.target.value)
        return 
      }
      this.listFiltered = this.readByValue(event.target.value)
        
        //this.listFiltered = this.listClient
 
    },
    readByValue (value) {
      let dates = this.listDB.filter(item => item == value)
      return dates
    }
  }
}
</script>

<style lang="sass" scoped>
.pagination
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background-color: white
.pagination__items
  display: flex
  flex-direction: column
  align-items: center
  height: 300px
  width: 100%
  overflow: auto
.pagination__items p
  text-align: center
  width: 100%
  border-bottom: 1px solid 
</style>