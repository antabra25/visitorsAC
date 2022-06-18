<template>
  <button class="baseButton">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton"
}
</script>

<style scoped>

.baseButton {
  border-radius: 5px;
  @apply w-[110px] h-[30px]  bg-deepblue text-white  font-title font-bold text-xs shadow-md hover:bg-white hover:border-2 hover:border-deepblue hover:text-deepblue mb-2
}

</style>