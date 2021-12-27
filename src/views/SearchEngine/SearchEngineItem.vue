<template lang="pug">
  div
    p {{ currency.name }}
</template>

<script>
export default {
  name: "SearchEngineItem",

  props: {
    currency: {
      type: Object,
      require: true,
    },
  },
}
</script>

<style scoped>

</style>