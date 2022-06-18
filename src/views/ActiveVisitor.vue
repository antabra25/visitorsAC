<template>


  <div class="main-content-wrapper">
    <h1 class="title-local">Visitantes Activos</h1>
    <search-input name="Buscar"></search-input>
    <div class="visitor-layout">
      <visitor-card></visitor-card>
      <visitor-card></visitor-card>

    </div>
  </div>

</template>

<script>
import SearchInput from "../components/SearchInput.vue";
import VisitorCard from "../components/VisitorCard.vue";

export default {
  name: "ActiveVisitor",
  components: {
    SearchInput,
    VisitorCard
  }


};
</script>

<style scoped>

.title-local {
  @apply mt-[60px] font-subtitle font-medium text-black text-2xl  text-center
}

.visitor-layout {
  @apply flex flex-row flex-wrap gap-x-12 gap-y-4  w-[1306px] mx-auto mt-7
}

</style>