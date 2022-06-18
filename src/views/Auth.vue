<template>
  <div class="main-content-wrapper">
    <div>
      <h1 class="font-title text-deepblue text-5xl font-bold text-center mt-28">Conectarse</h1>
      <login-box></login-box>
    </div>
  </div>
</template>

<script>
import LoginBox from "../components/LoginBox.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Auth",
  components: {
    LoginBox
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>