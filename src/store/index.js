import Vue from 'vue'
import Vuex from 'vuex'
import purse from './modules/purse/purse'
import page from './modules/page/page'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    purse,
    page,
  },
})