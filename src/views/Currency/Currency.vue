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
import { Currencies } from '../../mixins/Currencies'
import CurrencyItem from './CurrencyItem'
import Loader from '../../components/Loader/Loader'
import NotFound from '../NotFound/NotFound'

export default {
  name: "Currency",
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
  mixins: [Currencies],
  async mounted() {
    this.currency = await Currencies.methods.getCurrency(this.currencyId)
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