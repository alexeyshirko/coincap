<template lang="pug">
  div(class="container")
    article(v-if="isDataReceived()")
      CurrencyItem(
        :symbol="currency.symbol"
        :changePercent24Hr="+currency.changePercent24Hr"
        :name="currency.name"
        :priceUsd="+currency.priceUsd"
        :rank="currency.rank"
        :supply="+currency.supply"
        :id="currency.id"
      )
    div(v-else-if="isDataReceivedWithProblem()")
      NotFound(title="Not found anything")
    div(v-else)
      Loader
</template>

<script>
import CurrencyItem from './CurrencyItem'
import Loader from '../../../components/coincap/Loader/Loader'
import NotFound from '../NotFound/NotFound'
import { currency } from '../../../api/currency-info'

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
    this.currency = await currency.getCurrency(this.currencyId)
  },

  computed: {
    currencyId() {
      return this.$route.params.id
    },
  },

  methods: {
    isDataReceived() {
      return this.currency !== null && typeof this.currency === 'object'
    },

    isDataReceivedWithProblem() {
      return this.currency === undefined
    },
  },
}
</script>

<style scoped lang="sass">
  body
    margin: 0
</style>