<template>
  <div class="pagination-btn-wrapper">
    <button class="baseButton" @click="$emit('left')">&lt</button>
    <button class="baseButton" @click="$emit('right')">&gt</button>
  </div>
</template>

<script>
export default {
  name: "PaginationButton",
  emits: ['right', 'left'],
};
</script>

<style scoped>

.pagination-btn-wrapper {
  @apply flex flex-row justify-center mt-16 gap-x-1.5
}

</style>