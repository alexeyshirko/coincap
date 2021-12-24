<template lang="pug">
  header
    div(class="container")
      div(class="container__currencies")
        div(v-if="!isFoundCurrencies")
          NotFound(title="No information")
        HeaderCurrencies(
          v-else
          v-for="currency in currencies"
          :key="currency.id"
          :symbol="currency.symbol"
          :changePercent24Hr="+currency.changePercent24Hr"
          :priceUsd="+currency.priceUsd"
          :id="currency.id"
        )
      div(class="container__purse")
        HeaderPurse
</template>

<script>
import { Currencies } from '../../mixins/Currencies'
import HeaderCurrencies from './HeaderCurrencies'
import HeaderPurse from './HeaderPurse'
import NotFound from '../../views/NotFound/NotFound'

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

  mixins: [Currencies],

  async mounted() {
    this.currencies = await Currencies.methods.getPopularCurrency()
  },

  computed: {
    isFoundCurrencies() {
      return Array.isArray(this.currencies)
    },
  },
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