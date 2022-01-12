import Vue from 'vue'
import Router from 'vue-router'
import CoinCapMain from '../pages/CoinCap/Main/Main'
import CoinCapCurrency from '../pages/CoinCap/Currency/Currency'
import NotFound from '../pages/CoinCap/NotFound/NotFound'

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
    path: '*',
    name: 'notfound',
    component: NotFound,
  },
]

export default new Router({
  mode: 'history',
  routes,
})