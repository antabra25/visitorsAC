<template>
  <top-banner/>
  <nav-bar v-if="$route.path !=='/' && $route.path!='/location' "></nav-bar>
  <main class="bg-dirtywhite min-h-full">
    <router-view/>
  </main>
  <the-footer/>
</template>

<script>
import TopBanner from "./components/TopBanner.vue";
import NavBar from "./components/NavBar.vue";
import TheFooter from "./components/TheFooter.vue";

export default {
  components: {
    TopBanner,
    TheFooter,
    NavBar
  },

  data() {
    return {};
  }
};
</script>

<style></style>





