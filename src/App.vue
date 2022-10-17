<script setup>
import TopBanner from "./components/TopBanner.vue";
import NavBar from "./components/NavBar.vue";
import TheFooter from "./components/TheFooter.vue";
import {ref} from 'vue'

const initial = ref(0)

</script>

<template>

  <top-banner/>
  <nav-bar v-if="$route.path !=='/' && $route.path!='/location' "/>
  <main className="bg-dirtywhite min-h-full">
    <router-view/>
  </main>
  <the-footer/>
</template>


<style>

</style>





