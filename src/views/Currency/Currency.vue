<template>
  <article>currency</article>
</template>

<script>
import { Currencies } from '../../mixins/Currencies'

export default {
  name: "Currency",
  mixins: [Currencies],
  async mounted() {
    console.log(await Currencies.methods.getCurrency('ethereum'))
  }
}
</script>

<style scoped lang="sass">
  body
    margin: 0
</style>