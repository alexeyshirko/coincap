<template lang="pug">
  div(class="container")
    div(v-if="isLoading")
      Loader
    div(v-else-if="isErrorsReceived")
      NotFound(title="No information")
    template(v-else-if="!isErrorsReceived")
      table
        tbody
        tr
          th Rank
          th Symbol
          th Name
          th Supply
          th Price
          th Change percent 24Hr
        MainTableItem(
          v-for="currency in currencies"
          :key="currency.id"
          :symbol="currency.symbol"
          :changePercent24Hr="+currency.changePercent24Hr"
          :name="currency.name"
          :priceUsd="currency.priceUsd"
          :rank="currency.rank"
          :supply="currency.supply"
          :id="currency.id"
        )
      MainPagination(:length="getCurrencyListLength()")
</template>

<script>
import MainTableItem from './MainTableItem'
import MainPagination from './MainPagination'
import NotFound from '../NotFound/NotFound'
import Loader from '../../../components/coincap/Loader/Loader'
export default {
  name: 'MainTable',

  components: {
    MainPagination,
    MainTableItem,
    NotFound,
    Loader,
  },

  props: {
    currencies: {
      type: Array,
      require: true,
    },
    isLoading: {
      type: Boolean,
      defaultValue: true
    },
    isErrorsReceived: {
      type: Boolean,
      defaultValue: null
    }
  },

  methods: {
    getCurrencyListLength() {
      return Array.isArray(this.currencies) ? this.currencies.length : 0
    },
  },
}
</script>

<style scoped lang="sass">
  .container
    display: flex
    justify-content: center
    flex-direction: column
    align-items: center
  table
    margin-top: 120px
    text-align: center
    border-collapse: collapse
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4)
  td, th
    text-align: center
    padding: 10px 30px
  tr:nth-child(even)
    background: #f5f5f5
  th
    background: #1e3d59
    color: white
    font-family: 'Bakbak One', cursive
</style>