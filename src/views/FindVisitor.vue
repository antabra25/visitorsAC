<template>

  <div class="main-content-wrapper">
    <h1 class="title">Visitas</h1>
    <info-message :is-display="showMessage" @close-tab="closeTab">{{ message }}</info-message>
    <div class="main-box">

      <div class="typeSearch flex flex-row flex-nowrap gap-x-2.5 font-semibold font-title justify-center">
        <search-input v-model="search" @keydown.enter="findVisit"></search-input>
        <input type="radio" id="CI" value="CI" v-model="picked"/>
        <label for="CI">C.I</label>

        <input type="radio" id="phone" value="telf" v-model="picked"/>
        <label for="phone">Telf</label>

        <input type="radio" id="office" value="office" v-model="picked"/>
        <label for="office">Oficina</label>

        <input type="radio" id="date" value="date" v-model="picked"/>
        <label for="date">Fecha</label>
      </div>
      <div class="table-wrapper">
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
        <tr v-for="visit in visits" :key="visit.ci">
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
    <pagination-button  @left="()=>pageNumber--" @right="()=>pageNumber++">
      Cargar más
    </pagination-button>
  </div>

</template>

<script>
import SearchInput from "../components/SearchInput.vue";
import InfoMessage from "../components/InfoMessage.vue";
import PaginationButton from "../components/PaginationButton.vue";

export default {
  name: "FindVisitor",
  components: {
    SearchInput,
    InfoMessage,
    PaginationButton
  },
  data() {
    return {

      visits: null,
      search: null,
      picked: null,
      message: "",
      showMessage: false,
      pageSize: 2,
      pageNumber: 1,

    };
  },
  watch: {
    pageNumber() {
      this.loadVisits()
    }
  },
  methods: {
    closeTab() {
      this.showMessage = false;
    },
    logOut() {
      localStorage.clear();
      this.$router.push("/");
    },
    async findVisit() {

      try {
        if (this.search && this.picked) {
          const response = await this.axios.get(`/visits/find/${this.search}/${this.picked}`)

          if (response.status === 200) {
            this.visits = response.data;
          }
        }
      } catch (error) {

        if (error.response.status === 401) {
          this.logOut()
        } else if (error.response.status === 404) {
          this.message = "No se encontraron coincidencia";
        } else {
          this.message = "Error del Servidor";
          this.showMessage = true;
        }
      }
    },
    async loadVisits() {
      try {
        const visits = await this.axios.get(`/visits/?page_size=${this.pageSize}&page_number=${this.pageNumber}`)
        if (visits.status == 200) {
          this.visits = visits.data
        }
      } catch (error) {

        if (error.response.status === 401) {
          this.logOut()
        } else if (error.response.status === 404) {
          this.message = "No hay registros agregados";
          this.showMessage = true;
        }
      }
    },

    async deleteVisit(id) {
      try {
        const response = await this.axios.delete(`/visits/delete/${id}`)
        if (response.status === 204) {
          this.message = "Elemento  eliminado";
          this.showMessage = true;
          await this.loadVisits();
        }
      } catch (error) {

        if (error.response.status === 401) {
          this.logOut()
        } else if (error.response.status === 404) {
          this.message = "No existe elemento con el ID proporcionado";
          this.showMessage = true;
        } else {
          this.message = "Error del Servidor";
          this.showMessage = true;
        }
      }
    }
  }
  ,
  mounted() {
    this.loadVisits();
  }
}
;
</script>

<style scoped>
</style>