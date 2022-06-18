<template>
  <button class="delete-btn">
    <router-link to="">
      <img src="../assets/svg/delete-circle.svg">
    </router-link>

  </button>

</template>

<script>
export default {
  name: "DeleteButton"
};
</script>

<style scoped>

.delete-btn {
  border-radius: 5px;
  @apply w-10 h-8 bg-boregray px-[8px] py-[3px]
}

</style>