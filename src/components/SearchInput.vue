<template>
  <div class="search-field">
    <img src="../assets/svg/search-red.svg" alt="" id="lupa-icon">
    <input type="search" :placeholder="name" @input="$emit('update:modelValue',$event.target.value)" :value="modelValue">
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: ["name","modelValue"]
};
</script>

<style scoped>

input {
  @apply w-[361px] h-[30px] px-6 font-title text-firered font-bold focus:outline-0 focus:border-2 focus:border-firered rounded
}

input[placeholder="Buscar"] {
  @apply font-title
}

.search-field {
  @apply relative
}

#lupa-icon {
  @apply absolute top-[5px] left-[326px]
}
</style>