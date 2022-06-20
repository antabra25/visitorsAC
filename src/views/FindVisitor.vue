<template>

  <div class="main-content-wrapper">
    <h1 class="title">Visitas</h1>
    <info-message :is-display="showMessage">{{ message }}</info-message>
    <div class="main-box ">

      <div class="typeSearch flex flex-row flex-nowrap gap-x-2.5 font-semibold font-title justify-center">
        <search-input v-model="search" @keydown.enter="findVisit"></search-input>
        <input type="radio" id="CI" value="CI" v-model="picked" />
        <label for="CI">C.I</label>

        <input type="radio" id="phone" value="telf" v-model="picked" />
        <label for="phone">Telf</label>

        <input type="radio" id="office" value="office" v-model="picked" />
        <label for="office">Oficina</label>

        <input type="radio" id="date" value="date" v-model="picked" />
        <label for="date">Fecha</label>
      </div>

      <table class="table-auto">
        <thead>
        <th>Nro</th>
        <th>Cedula</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Telefono</th>
        <th>Pase</th>
        <th>Oficina</th>
        <th>Piso</th>
        <th>Funcionario</th>
        <th>Fecha</th>
        <th>Eliminar</th>
        </thead>
        <tbody>
        <tr v-for="visit in visits">
          <td>{{ visit.visit_id }}</td>
          <td>{{ visit.ci }}</td>
          <td>{{ visit.name }}</td>
          <td>{{ visit.lastname }}</td>
          <td>{{ visit.phone }}</td>
          <td>{{ visit.pass }}</td>
          <td>{{ visit.office }}</td>
          <td>{{ visit.flat }}</td>
          <td>{{ visit.worker_name }} {{ visit.worker_lastname }}</td>
          <td>{{ visit.date }}</td>


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
import InfoMessage from "../components/InfoMessage.vue";

export default {
  name: "FindVisitor",
  components: {
    SearchInput,
    InfoMessage
  },
  data() {
    return {

      visits: null,
      search: null,
      picked: null,
      message: "",
      showMessage: false

    };
  },
  methods: {
    async findVisit() {
      if (this.search && this.picked) {
        await this.axios.get(`/visits/find/${this.search}/${this.picked}`)
          .then(
            response => {
              if (response.status === 200) {

                this.visits = response.data;

              }
            }
          )
          .catch(
            error => {

            }
          );

      }

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