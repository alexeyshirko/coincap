<template lang="pug">
  div(
    :class="paginationItemStyle"
    @click="onUserChangeCurrentPage"
  ) {{ pageNumber }}
</template>

<script>
export default {
  name: "MainPaginationItem",

  props: {
    pageNumber: Number,
    currentPage: Number,
  },

  computed: {
    paginationItemStyle() {
      return [
        'pagination__item',
        { 'isActive': this.currentPage === this.pageNumber }
      ]
    }
  },

  methods: {
    onUserChangeCurrentPage() {
      this.$emit('updateCurrentPage', this.pageNumber)
    },
  },
}
</script>

<style scoped lang="sass">
  .pagination__item
    padding: 10px 20px
    background: #f5f5f5
    font-family: 'Bakbak One', cursive
    cursor: pointer
    border-radius: 10px
    margin-right: 10px
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4)
    user-select: none

    &:last-child
      margin-right: 0

    &:hover
      color: white
      background-color: #808080
      opacity: 1
  .isActive
    background-color: #1E90FF
    color: white
</style>