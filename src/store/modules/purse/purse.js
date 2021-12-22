export default {
  actions: {},
  mutations: {},
  state: {
    currencies: null,
  },
  getters: {
    getUserPurse(state) {
      return state.currencies;
    }
  },
}