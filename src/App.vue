<template lang="pug">
  div#app
    Header

    router-view
</template>

<script>
import Header from './components/coincap/Header/Header'
export default {
  name: 'App',
  components: {
    Header
  },
}
</script>

<style lang="sass">
  html, body
    margin: 0 !important
    padding: 0 !important
</style>