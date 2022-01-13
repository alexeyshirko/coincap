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
    const currentPage = this.$store.getters.getCurrentPage - 1

    this.dispatch(currencyList, currentPage).then(({ data }) => {
      this.currencies = data
    })
  },

  watch: {
    currentPage(newCurrentPage) {
      this.dispatch(currencyList, newCurrentPage - 1).then(({ data }) => {
        this.currencies = data
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