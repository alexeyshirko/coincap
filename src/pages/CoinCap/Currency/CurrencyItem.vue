<template lang="pug">
  div(class="container")
    Modal(
      v-if="isModalVisible"
      @onUserInteractsWithModal="onUserInteractsWithModal"
      @onUserClickButton="onUserAddCurrency"
      buttonText="Add currency"
      titleText="Add currency to your wallet"
    )
      input(class="modal__input" placeholder="Quantity" v-model="quantity")
    div(class="currency__block")
      div(class="currency")
        CurrencyItemText(heading="Rank" :value="rank")
        CurrencyItemText(heading="Symbol" :value="symbol")
        CurrencyItemText(heading="Name" :value="name")
        CurrencyItemText(heading="Supply" :value="getCurrencySupply.toString()")
        CurrencyItemText(heading="Price Usd" :value="getCurrencyPrice")
        CurrencyItemText(heading="Change percent 24Hr" :value="getCurrencyChange")
      TestChart(:currencyHistory="currencyHistory" v-if="currencyHistory")
    Button(@onUserClickButton="onUserInteractsWithModal" buttonText="Add")
</template>

<script>
import CurrencyItemText from './CurrencyItemText'
import Modal from '../../../components/coincap/Modal/Modal'
import Button from '../../../components/coincap/Button/Button'
import { mapGetters } from 'vuex'
import { NumberHelper } from '../../../mixins/NumberHelper'
import Chart from '../../../components/coincap/Chart/Chart'
import TestChart from '../../../components/coincap/TestChart/TestChart'
import serviceHandler from '../../../mixins/ServiceHandler/serviceHandler'
import { currencyHistory } from '../../../domain/currency/service'
export default {
  name: "CurrencyItem",

  components: {
    Modal,
    CurrencyItemText,
    Button,
    Chart,
    TestChart,
  },

  data() {
    return {
      isModalVisible: false,
      quantity: '',
      currencyHistory: null,
    }
  },

  props: {
    id: String,
    rank: String,
    symbol: String,
    name: String,
    supply: Number,
    priceUsd: Number,
    changePercent24Hr: Number,
  },

  async mounted() {
    this.fetch(currencyHistory, this.$route.params.id).then(({ data }) => {
      this.currencyHistory = data
    })
  },

  methods: {
    validationQuantity() {
      const purseLength = this.getPurseLength
      if (purseLength === 5) return 'Maximum - 5 currencies'

      const quantity = +this.quantity
      if (quantity < 0 || isNaN(quantity) || !quantity) {
        this.quantity = ''
        return 'Enter the normal amount of currency'
      }
    },

    onUserInteractsWithModal() {
      this.isModalVisible = !this.isModalVisible
    },

    onUserAddCurrency() {
      const validationMessage = this.validationQuantity()
      if (validationMessage) return alert(validationMessage)

      this.addNewCurrency()

      this.quantity = ''
      this.onUserInteractsWithModal()
    },

    addNewCurrency() {
      const isCurrencyInPurse = this.$store.getters.getUserPurse.find((item) => item.id === this.id)
      const currency = isCurrencyInPurse
        ? this.$store.getters.getUserPurse.map(item => {
          return item.id !== this.id ? item : {
            ...item,
            quantity: item.quantity && (+item.quantity + +this.quantity).toString()
          }
        }) : [...this.$store.getters.getUserPurse, {
          id: this.id,
          symbol: this.id,
          priceUsd: this.priceUsd,
          changePercent24Hr: this.changePercent24Hr,
          quantity: this.quantity,
        }]

      this.$store.dispatch('updateUserCurrency', currency)
    },
  },

  mixins: [NumberHelper, serviceHandler],

  computed: mapGetters(['getPurseLength']),
}
</script>

<style scoped lang="sass">
  .container
    display: flex
    justify-content: center
    flex-direction: column
    align-items: center
    margin-top: 120px
  .modal__input
    border: 0
    outline: none
    width: 200px
    border-bottom: 1px solid #1E90FF
  .currency
    background-color: #f5f0e9
    padding: 20px 0
    width: 350px
    text-align: center
    border-radius: 15px
    font-family: 'Bakbak One', cursive

    &__block
      display: flex
      flex-direction: row
</style>