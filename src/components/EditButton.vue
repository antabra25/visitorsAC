<template>
  <button class="edit-btn" @click="$emit('check')">
    <img src="../assets/svg/bx-edit.svg">
  </button>
</template>

<script>
export default {
  name: "EditButton",
  emits: ["check"],
};
</script>

<style scoped>

button img {
  @apply w-6 h-6
}

.edit-btn {

  border-radius: 5px;
  @apply w-10 h-8 bg-boregray px-[8px] py-[3px]
}

</style>