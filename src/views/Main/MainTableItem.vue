<template lang="pug">
  tr(@click="onUserClickCurrency")
    td {{ rank }}
    td {{ symbol }}
    td {{ name }}
    td {{ getCurrencySupply }}
    td {{ getCurrencyPrice }}
    td {{ getCurrencyChange }}
</template>

<script>
import { NumberHelper } from '../../mixins/NumberHelper'

export default {
  name: 'MainTableItem',

  props: {
    id: String,
    rank: String,
    symbol: String,
    name: String,
    supply: Number,
    priceUsd: Number,
    changePercent24Hr: Number,
  },

  mixins: [NumberHelper],

  methods: {
    onUserClickCurrency() {
      this.$router.push({ name: 'currency', params: { id: this.id } })
    },
  },
}
</script>

<style scoped lang="sass">
  td, th
    text-align: center
    padding: 10px 30px
  tr:nth-child(even)
    background: #f5f5f5
  tr
    cursor: pointer

    &:hover
      background-color: #808080 !important
      opacity: 1
</style>