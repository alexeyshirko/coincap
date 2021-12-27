<template lang="pug">
  div(class="search")
    SearchEngineItem(
      v-for="currency in currencies"
      :key="currency.id"
      :currency="currency"
      v-if="isNameMatches(currency)"
      class="search__item"
    )
</template>

<script>
import SearchEngineItem from './SearchEngineItem'
export default {
  name: "SearchEngineList",

  components: {
    SearchEngineItem,
  },

  props: {
    currencies: {
      type: Array,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },

  methods: {
    isNameMatches(currency) {
      return currency.name.toLowerCase().includes(this.name)
    },
  },
}
</script>

<style scoped lang="sass">
  .search
    display: flex
    align-items: center
    flex-direction: column

    &__item
      width: 100%
      border: 3px solid #1E90FF
      padding: 10px 40px
      box-shadow: 0 0 4px 0 #1E90FF inset, 0 0 10px 2px #1E90FF
      margin-bottom: 20px
      cursor: pointer
      text-align: center
</style>