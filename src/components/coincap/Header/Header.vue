<template lang="pug">
  header
    div(class="container")
      div(class="container__currencies")
        div(v-if="serviceErrors")
          NotFound(title="No information")
        HeaderCurrencies(
          v-else
          v-for="currency in currencies"
          :key="currency.id"
          :symbol="currency.symbol"
          :changePercent24Hr="currency.changePercent24Hr"
          :priceUsd="currency.priceUsd"
          :id="currency.id"
        )
      div(class="container__purse")
        HeaderPurse
</template>

<script>
import HeaderCurrencies from './HeaderCurrencies'
import HeaderPurse from './HeaderPurse'
import NotFound from '../../../pages/CoinCap/NotFound/NotFound'
import serviceHandler from '../../../mixins/ServiceHandler/serviceHandler'
import { popularCurrency } from '../../../domain/currency/service'

export default {
  name: 'Header',

  components: {
    HeaderPurse,
    HeaderCurrencies,
    NotFound,
  },

  data() {
    return {
      currencies: [],
    }
  },

  mounted() {
    this.dispatch(popularCurrency).then(({ data }) => {
      this.currencies = data
    })
  },

  mixins: [serviceHandler],
}
</script>

<style scoped lang="sass">
  header
    height: 50px
    background-color: #6b7b8c
    padding: 0 40px
  .container
    display: flex
    justify-content: space-between

    &__currencies
      display: flex
      align-items: center
      height: 50px

    &__purse
      display: flex
      align-items: center
</style>