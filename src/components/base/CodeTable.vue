<template>
  <div>
    <table>
      <thead>
        <th v-for="(caption, i) in captions" v-bind:key="i">{{ caption }}</th>
      </thead>
      <tbody>
        <tr v-for="(itens, i) in list" v-bind:key="i">
          <td v-for="(item, i) in itens" v-bind:key="i">{{ item }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CodeTable',
  props: {
    captions: Array,
    object: Array,
    keys: Array
  },
  data () {
    return {

    }
  },
  computed: {
    list (vm) {

      return vm.object.map((item) => {
    
        return Object.keys(item).map((key) => {
          if (key !== 'id') {
            return item[key]
          }
        }).filter(i => i !== undefined)

      })
    }
  }
}
</script>

<style lang="sass" scoped>
table
  border-collapse: collapse
th
  font-size: 1.0rem
th, td
  text-align: left
  padding: 10px 15px
tr
  font-size: 0.9rem
  border-bottom: 1px solid lightgray
</style>