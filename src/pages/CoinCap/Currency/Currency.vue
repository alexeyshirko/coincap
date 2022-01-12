<template lang="pug">
  div(class="container")
    div(v-if="serviceLoading")
      Loader
    article(v-else-if="!serviceErrors")
      CurrencyItem(
        :symbol="currency.symbol"
        :changePercent24Hr="currency.changePercent24Hr"
        :name="currency.name"
        :priceUsd="currency.priceUsd"
        :rank="currency.rank"
        :supply="currency.supply"
        :id="currency.id"
      )
    div(v-else-if="serviceErrors")
      NotFound(title="Not found anything")
</template>

<script>
import CurrencyItem from './CurrencyItem'
import Loader from '../../../components/coincap/Loader/Loader'
import NotFound from '../NotFound/NotFound'
import serviceHandler from '../../../mixins/ServiceHandler/serviceHandler'
import { currencyItem } from '../../../domain/currency/service'

export default {
  name: 'Currency',

  components: {
    NotFound,
    CurrencyItem,
    Loader,
  },

  data() {
    return {
      currency: null,
    }
  },

  async mounted() {
    this.dispatch(currencyItem, this.currencyId).then(({ data }) => {
      this.currency = data
    })
  },

  computed: {
    currencyId() {
      return this.$route.params.id
    },
  },

  mixins: [serviceHandler],
}
</script>

<style scoped lang="sass">
  body
    margin: 0
</style>