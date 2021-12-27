import Vue from 'vue'
import Router from 'vue-router'
import CoinCapMain from '../views/Main/Main'
import CoinCapCurrency from '../views/Currency/Currency'
import NotFound from '../views/NotFound/NotFound'
import SearchEngine from '../views/SearchEngine/SearchEngine'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'main',
    component: CoinCapMain,
  },
  {
    path: '/currency/:id',
    name: 'currency',
    component: CoinCapCurrency,
    props: true,
  },
  {
    path: '/search',
    name: 'search',
    component: SearchEngine,
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound,
  },
]

export default new Router({
  mode: 'history',
  routes,
})