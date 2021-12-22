export const NumberHelper = {
  computed: {
    getCurrencyPrice() {
      return this.priceUsd.toFixed(3) + '$'
    },

    getCurrencySupply() {
      return Math.trunc(this.supply)
    },

    getCurrencyChange() {
      return `${this.changePercent24Hr.toFixed(2)} ${this.changePercent24Hr > 0 ? '↑' : '↓'}`
    },
  },
}