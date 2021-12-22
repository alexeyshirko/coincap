<template>
  <header>
    header
  </header>
</template>

<script>
import { Currencies } from '../../mixins/Currencies'

export default {
  name: "CoinCapHeader",
  data() {
    return {
      currencies: [],
    }
  },
  mixins: [Currencies],
  async mounted() {
    this.currencies = await Currencies.methods.getPopularCurrency()
  },
}
</script>

<style scoped lang="sass">
  header
    width: 100vw
    height: 50px
    padding: 10px 40px
    background-color: #6b7b8c
</style>