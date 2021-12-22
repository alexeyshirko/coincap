import Vue from 'vue'
import Router from 'vue-router'
import CoinCapMain from '../views/Main/Main'
import CoinCapCurrency from '../views/Currency/Currency'
import NotFound from '../views/NotFound/NotFound'

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