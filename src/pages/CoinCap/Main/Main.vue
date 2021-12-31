<template lang="pug">
  main
    div(class="container")
      MainTable(:currencies="currencies")
</template>

<script>
import MainTable from './MainTable'
import { currency } from '../../../api/currency-info'

export default {
  name: 'Main',

  data() {
    return {
      currencies: null,
    }
  },

  components: {
    MainTable,
  },

  async mounted() {
    const currentPage = this.$store.getters.getCurrentPage

    this.currencies = await currency.getCurrencyByPage(currentPage)
  },

  watch: {
    async currentPage(newCurrentPage) {
      this.currencies = await currency.getCurrencyByPage(newCurrentPage)
    }
  },

  computed: {
    currentPage() {
      return this.$store.getters.getCurrentPage
    },
  },
}
</script>

<style scoped lang="sass">
  .container
    display: flex
    justify-content: center
</style>