<template lang="pug">
  div(class="search")
    input(class="search__input" placeholder="Enter the name of the currency" v-model="currency")
    Loader(v-if="isDataLoaded")
    SearchEngineList(v-else-if="isDataReceived" :currencies="list" :name="currency")
    NotFound(v-else title="Data is not received!")
</template>

<script>
import SearchEngineList from './SearchEngineList'
import NotFound from '../NotFound/NotFound'
import Loader from '../../../components/coincap/Loader/Loader'
import { currency } from '../../../api/currency-info'
export default {
  name: "SearchEngine",

  components: {
    NotFound,
    SearchEngineList,
    Loader,
  },

  data() {
    return {
      currency: '',
      list: null,
    }
  },

  async mounted() {
    this.list = await currency.getCurrencies()
  },

  computed: {
    isDataReceived() {
      return typeof this.list === 'object' && this.list !== null
    },

    isDataLoaded() {
      return this.list === null
    },
  },
}
</script>

<style scoped lang="sass">
  .search
    display: flex
    align-items: center
    flex-direction: column
    padding: 40px 0 0 0

    &__input
      width: 30%
      font-size: 20px
      border: none
      border-bottom: 2px solid #1E90FF
      outline: none


</style>