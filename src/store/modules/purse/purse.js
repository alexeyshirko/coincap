export default {
  actions: {
    updateUserCurrency(context, currency) {
      context.commit('updateCurrency', currency)
    },
  },
  mutations: {
    updateCurrency(state, currency) {
      state.currencies = currency
      localStorage.setItem('purse', JSON.stringify(state.currencies))
    },
  },
  state: {
    currencies: JSON.parse(localStorage.getItem('purse')) || [],
  },
  getters: {
    getUserPurse(state) {
      return state.currencies
    },

    getPurseCost(state) {
      if (!state.currencies.length) return 0

      return state.currencies.map(item => {
        return +item.priceUsd * +item.quantity
      }).reduce((prev, next) => prev + next, 0)
    },

    getPurseLength(state) {
      return state.currencies.length
    },
  },
}