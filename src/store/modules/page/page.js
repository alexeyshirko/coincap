export default {
  actions: {
    onUserUpdatePage(context, page) {
      context.commit('updatePage', page)
    },
  },
  mutations: {
    updatePage(state, page) {
      state.page = page
      localStorage.setItem('page', page)
    },
  },
  state: {
    page: localStorage.getItem('page') || 1,
  },
  getters: {
    getCurrentPage(state) {
      return +state.page
    },
  },
}