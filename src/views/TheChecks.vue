<template>

  <div>
    <button @click="limit++" >+</button>
    <ul>
      <li v-for="n in limit">{{ n }}</li>
    </ul>

  </div>

</template>

<script>
export default {
  name: "TheChecks",
  data() {
    return {
      limit: 1,

    }
  },
  methods: {

  }

}
</script>

<style scoped>

</style>