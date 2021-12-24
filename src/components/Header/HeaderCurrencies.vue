<template lang="pug">
  div(class="container" @click="onUserClickCurrency")
    div {{ symbol }}
    span
    div {{ getCurrencyPrice }} {{ getCurrencyChange }}
</template>

<script>
import {NumberHelper} from "../../mixins/NumberHelper";

export default {
  name: 'HeaderCurrencies',

  props: {
    symbol: String,
    changePercent24Hr: Number,
    priceUsd: Number,
    id: String,
  },

  mixins: [NumberHelper],

  methods: {
    onUserClickCurrency() {
      if (this.$route.name !== 'main') return alert('Go to the main page')

      this.$router.push({ name: 'currency', params: { id: this.id } })
    },
  },
}
</script>

<style scoped lang="sass">
  span
    width: 5px
  .container
    background-color: #f5f0e1
    border-radius: 15px
    padding: 5px 15px
    margin-left: 15px
    font-family: 'Bakbak One', cursive
    cursor: pointer

    &:first-child
      margin-left: 0
</style>