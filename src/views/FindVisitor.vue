<template>

  <div class="main-content-wrapper">
    <h1 class="title">Visitas</h1>
    <info-message :is-display="showMessage">{{ message }}</info-message>
    <div class="main-box ">
      <search-input></search-input>
      <table class="table-auto">
        <thead>
        <th>Cedula</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Telefono</th>
        <th>Pase</th>
        <th>Oficina</th>
        <th>Piso</th>
        <th>Funcionario</th>
        <th>Entrada</th>
        <th>Salida</th>
        <th>Eliminar</th>
        </thead>
        <tbody>
        <tr v-for="visit in visits">

          <td>{{ visit.ci }}</td>
          <td>{{ visit.name }}</td>
          <td>{{ visit.lastname }}</td>
          <td>{{ visit.phone }}</td>
          <td>{{ visit.pass }}</td>
          <td>{{ visit.office }}</td>
          <td>{{ visit.flat }}</td>
          <td>{{ visit.worker_name }} {{ visit.worker_lastname }}</td>
          <td>{{ visit.date }}</td>
          <td>{{}}</td>

          <td>
            <button @click="deleteVisit(visit.visit_id)">
              <img src="../assets/svg/delete-circle.svg" alt="">
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import SearchInput from "../components/SearchInput.vue";

export default {
  name: "FindVisitor",
  components: {
    SearchInput
  },
  data() {
    return {

      visits: null,
      message: "",
      showMessage: false

    };
  },
  methods: {
    async findVisit() {

    },
    async loadVisits() {
      await this.axios.get("/visits/")
        .then(
          response => {
            if (response.status === 200) {
              this.visits = response.data;
            }
          }
        ).catch(
          error => {

          }
        );
    },
    async deleteVisit(id) {
      await this.axios.delete(`/visits/delete/${id}`)
        .then(response => {
          if (response.status === 204) {
            this.message = "Elemento  eliminado";
            this.showMessage = true;
          }

        })
        .catch(
          error => {
            if (error.response.status === 401) {

            } else {

            }
          }
        );
    }
  },
  mounted() {

    this.loadVisits();

  }
};
</script>

<style scoped>

table {
}


</style>