<template lang="pug">
  main
    div(class="container")
      MainTable(:currencies="currencies")
</template>

<script>
import MainTable from './MainTable'
import { Currencies } from '../../mixins/Currencies'

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

  mixins: [Currencies],

  async mounted() {
    const currentPage = this.$store.getters.getCurrentPage

    this.currencies = await Currencies.methods.getCurrencyByPage(currentPage)
  },

  watch: {
    async currentPage(newCurrentPage) {
      this.currencies = await Currencies.methods.getCurrencyByPage(newCurrentPage)
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