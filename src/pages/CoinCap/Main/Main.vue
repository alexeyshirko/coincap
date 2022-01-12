<template lang="pug">
  main
    div(class="container")
      MainTable(
        :currencies="currencies"
        :isLoading="serviceLoading"
        :isErrorsReceived="serviceErrors"
      )
</template>

<script>
import MainTable from './MainTable'
import serviceHandler from '../../../mixins/ServiceHandler/serviceHandler'
import { currencyList } from '../../../domain/currency/service'

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

    this.dispatch(currencyList, currentPage).then(({ data }) => {
      this.currencies = data.slice((currentPage - 1) * 10, currentPage * 10)
    })
  },

  watch: {
    currentPage(newCurrentPage) {
      const currentPage = this.$store.getters.getCurrentPage

      this.dispatch(currencyList, newCurrentPage).then(({ data }) => {
        this.currencies = data.slice((currentPage - 1) * 10, currentPage * 10)
      })
    }
  },

  computed: {
    currentPage() {
      return this.$store.getters.getCurrentPage
    },
  },

  mixins: [serviceHandler],
}
</script>

<style scoped lang="sass">
  .container
    display: flex
    justify-content: center
</style>