<template lang="pug">
  div(class="pagination")
    div(class="pagination__block")
      MainPaginationItem(
        v-for="item in length"
        :key="item"
        :pageNumber="item"
        :currentPage="getCurrentPage"
        @updateCurrentPage="onUserUpdatePage"
      )
</template>

<script>
import MainPaginationItem from './MainPaginationItem'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "MainPagination",
  components: {
    MainPaginationItem
  },
  props: {
    length: Number,
  },
  methods: mapActions(['onUserUpdatePage']),
  computed: mapGetters(['getCurrentPage']),
}
</script>

<style scoped lang="sass">
  .pagination
    margin-top: 30px

    &__block
      display: flex
      justify-content: center
</style>