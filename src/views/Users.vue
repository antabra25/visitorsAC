<template>
  <div class="main-content-wrapper">
  <Table idName="role_id" :headers="headers">

  </Table>

  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      users: null,
      message: "",
      showMessage: false,
      headers:["role_id",""]
    };
  },
}
</script>

<style scoped>

</style>