<template>
  <button class="delete-btn" @click="$emit('close')">
      <img src="../assets/svg/delete-circle.svg">
  </button>

</template>

<script>
export default {
  name: "DeleteButton",
  emits: ['close']
};
</script>

<style scoped>

.delete-btn {
  border-radius: 5px;
  @apply w-10 h-8 bg-boregray px-[8px] py-[3px]
}

</style>