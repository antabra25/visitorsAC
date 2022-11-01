<template>
  <div class="table-wrapper">
    <div class="table-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="table-content">
      <table class="table">
        <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in rows" :key=`row.${idName}`>
          <td v-for="header in headers" :key="header">
            {{ row[header] }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script>
export default {
  name: "Table",
  props: {
    idName: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>