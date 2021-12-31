<template lang="pug">
  div(class="modal")
    div(class="modal__container" :style="{ width }")
      h1(class="modal__title") {{ titleText }}
      div(
        class="modal__close"
        @click="onUserCloseModal"
      ) &#10006;
      slot
      Button(@onUserClickButton="onUserClickButton" :buttonText="buttonText")
</template>

<script>
import Button from '../Button/Button'
export default {
  name: 'Modal',

  components: {
    Button,
  },

  props: {
    buttonText: String,
    titleText: String,
    width: {
      type: String,
      default: '400px'
    },
  },

  methods: {
    onUserCloseModal() {
      this.$emit('onUserInteractsWithModal')
    },

    onUserClickButton() {
      this.$emit('onUserClickButton')
    },
  },
}
</script>

<style scoped lang="sass">
  .modal
    display: flex
    justify-content: center
    align-items: center
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: rgba(0,0,0,0.5)
    z-index: 1000
    pointer-events: auto
    margin: 0
    padding: 0

    h1
      margin: 0 0 20px 0
      font-size: 20px
      font-family: 'Bakbak One', cursive
      font-weight: normal

    &__input
      border: 0
      outline: none
      width: 200px
      border-bottom: 1px solid #1E90FF

    &__close
      position: absolute
      top: 15px
      right: 15px
      cursor: pointer
      transform: scale(1.4)
      user-select: none

    &__container
      position: relative
      padding: 30px 20px
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      margin-bottom: 280px
      background-color: white
      border-radius: 15px
</style>