<template>
  <div class="container">
    <div>
      {{ symbol }}
    </div>
    &nbsp;
    <div>
      {{ getCurrencyPrice }}
      {{ getCurrencyChange }}
    </div>
  </div>
</template>

<script>
/* TODO ability to go directly to the component Currency */
export default {
  name: "HeaderItem",
  props: {
    priceUsd: Number,
    symbol: String,
    change: Number,
  },
  computed: {
    getCurrencyChange() {
      return this.change > 0 ? '↑' : '↓'
    },

    getCurrencyPrice() {
      return this.priceUsd.toFixed(3)
    },
  },
}
</script>

<style scoped lang="sass">
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