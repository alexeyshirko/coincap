<template lang="pug">
  button(
    class="button"
    @click="onUserClickButton"
  ) {{ buttonText }}
</template>

<script>
export default {
  name: "Button",

  props: {
    buttonText: String,
  },

  methods: {
    onUserClickButton() {
      this.$emit('onUserClickButton')
    },
  },
}
</script>

<style scoped lang="sass">
  .button
    margin-top: 20px
    width: 250px
    padding: 10px 0
    border-radius: 15px
    text-transform: uppercase
    font-family: 'Bakbak One', cursive
    border: none
    color: #fff
    box-shadow: 0 0 40px 40px #1E90FF inset
    -webkit-transition: all 150ms ease-in-out
    transition: all 150ms ease-in-out
    cursor: pointer

    &:hover
      box-shadow: 0 0 10px 0 #1E90FF inset, 0 0 10px 4px #1E90FF
      color: #1E90FF
</style>