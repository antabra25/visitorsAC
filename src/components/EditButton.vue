<template>
  <button class="edit-btn">
    <router-link to="">
      <img src="../assets/svg/bx-edit.svg">
    </router-link>

  </button>
</template>

<script>
export default {
  name: "EditButton"
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