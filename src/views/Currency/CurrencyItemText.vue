<template lang="pug">
  div(class="currency__item")
    p {{ heading }}
    p {{ value }}
</template>

<script>
export default {
  name: "CurrencyItemText",
  props: {
    heading: String,
    value: String,
  },
}
</script>

<style scoped lang="sass">
  .currency__item
    display: flex
    justify-content: space-between
    border-bottom: 1px solid #1e3d59
    padding: 0 40px

    &:last-child
      border-bottom: 0
</style>