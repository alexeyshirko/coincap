<template lang="pug">
  div(class="notfound")
    h3(class="notfound__title") {{ title }}
</template>

<script>
export default {
  name: "NotFound",

  props: {
    title: {
      type: String,
      default: "Page not found!"
    }
  },
}
</script>

<style scoped lang="sass">
  .notfound
    display: flex
    justify-content: center

    &__title
      font-family: 'Bakbak One', cursive
      font-weight: normal
</style>