<template lang="pug">
  div
    Modal(
      v-if="isModalVisible"
      @onUserInteractsWithModal="onUserInteractsWithModal"
      @onUserClickButton="onUserInteractsWithModal"
      buttonText="Close modal"
      titleText="Your purse"
      width="600px"
    )
      p(v-if="!getUserPurse") Your purse is empty
      template(v-else)
        ul
          li Symbol
          li Price
          li Change 24Hr
          li Quantity
        div(
          v-for="currency in getUserPurse"
          v-bind:key="currency.id"
          class="purse__list"
        )
          p {{ currency.symbol }}
          p {{ getCurrencyPrice(currency.priceUsd) }}
          p {{ getCurrencyChange(currency.changePercent24Hr) }}
          p {{ currency.quantity }}
          button(class="purse__button" @click="onUserDeleteCurrency(currency.id)") &#10006;
        p Cost: {{ getPurseCost }}
    div(class="purse" @click="onUserInteractsWithModal") Purse: {{ getPurseCost }}
</template>

<script>
import Modal from '../Modal/Modal'
export default {
  name: 'HeaderPurse',

  components: {
    Modal,
  },

  data() {
    return {
      isModalVisible: false
    }
  },

  computed: {
    getPurseCost() {
      const purseCost = this.$store.getters.getPurseCost

      return purseCost ? purseCost.toFixed(3) + '$' : 0 + '$'
    },

    getUserPurse() {
      const purse = this.$store.getters.getUserPurse
      if (!purse.length) return false

      return purse
    },
  },

  methods: {
    onUserInteractsWithModal() {
      this.isModalVisible = !this.isModalVisible
    },

    onUserDeleteCurrency(id) {
      const updatePurse = this.$store.getters.getUserPurse.filter(item => item.id !== id)

      this.$store.dispatch('updateUserCurrency', updatePurse)
    },

    getCurrencyPrice(value) {
      return (+value).toFixed(3) + '$'
    },

    getCurrencyChange(value) {
      return `${(+value).toFixed(2)} ${value > 0 ? '↑' : '↓'}`
    },
  },
}
</script>

<style scoped lang="sass">
  .purse
    background-color: #f5f0e1
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    max-width: 150px
    border-radius: 15px
    padding: 5px 15px
    margin-left: 15px
    font-family: 'Bakbak One', cursive
    cursor: pointer

    &__list
      display: flex
      justify-content: space-around
      font-family: 'Bakbak One', cursive
      width: 100%
      min-width: 100%

    &__button
      margin-top: 10px
      width: 30px
      height: 30px
      border-radius: 15px
      transform: scale(1.4)
      border: none
      color: #fff
      box-shadow: 0 0 40px 40px #1E90FF inset
      -webkit-transition: all 150ms ease-in-out
      transition: all 150ms ease-in-out
      cursor: pointer

      &:hover
        box-shadow: 0 0 5px 0 #1E90FF inset, 0 0 5px 4px #1E90FF
        color: #1E90FF
  ul
    margin: 0
    padding: 0

    & li
      margin: 0 70px 0 0
      padding: 0
      display: inline
      text-align: left
</style>