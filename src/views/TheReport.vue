<template>

  <div class="main-content-wrapper">
    <h1 class="title">Reporte de Visitas</h1>
    <info-message :is-display="showMessage" @close-tab="closeTab">{{ message }}</info-message>
    <form class="form" @submit.prevent="generateReport">
      <entry-select name="Edificio" @select-value="setOption" :options="buildings"></entry-select>
      <entry-select name="Oficina" @select-value="setOption" :options="offices"></entry-select>
      <div class="flex-date">
        <entry-small name="Desde" input-type="date" v-model="since"></entry-small>
        <entry-small name="Hasta" input-type="date" v-model="until"></entry-small>
      </div>
      <base-button class="register-btn">Generar</base-button>
    </form>
  </div>
</template>

<script>

import EntrySelect from "../components/EntrySelect.vue";
import EntrySmall from "../components/EntrySmall.vue";
import BaseButton from "../components/BaseButton.vue";
import InfoMessage from "../components/InfoMessage.vue";

export default {
  name: "TheReport",
  components: {
    EntrySelect,
    EntrySmall,
    BaseButton,
    InfoMessage
  },
  data() {
    return {
      since: "",
      until: "",
      office: null,
      building: null,
      buildings: null,
      offices: null,
      showMessage: false,
      message: "",
    }
  },
  methods: {

    closeTab() {
      this.showMessage = false
    },
    setOption: async function (value, name) {
      if (name === "Edificio") {
        this.building = value.building_id;
        await this.loadOffices(this.building);
      } else if (name === "Oficina") {
        this.office = value.office_id;

      }
    },
    async releaseLocation() {
      try {
        const response = await this.axios.put('/locations/update/', {
          available: true
        });
        if (response.status === 200) {
          localStorage.clear();
          this.$router.push("/");
        }
      } catch (error) {

        if (error.response.status === 404) {
          this.message = "Error No se Desactivo la localizacion";
          this.showMessage = true;

        }

      }
    },
    async loadBuildings() {
      try {
        const response = await this.axios.get("/buildings/");
        if (response.status === 200) {
          this.buildings = response.data;
        }
      } catch (error) {
        if (error.response.status === 404) {
          this.message = "Error No se pudo cargar los edificios";
          this.showMessage = true;
        } else if (error.response.status === 401) {
          await this.releaseLocation()
        }
      }
    },
    async loadOffices(id) {
      const URL = `/offices/building/${id}`;
      await this.axios.get(URL)
          .then(
              response => {
                this.offices = response.data;
              }
          ).catch(
              error => {
                if (error.response.status === 401) {
                  this.releaseLocation()
                } else if (error.response.status === 404) {
                  this.message = "No se encontraron oficinas";
                  this.showMessage = true;
                } else if (error.response.status > 404) {
                  this.message = "Error en el servidor";
                  this.showMessage = true;
                }

              }
          );
    },
    async getReport(id) {
      try {
        const response = await this.axios.get(`/report/${id}`)
        if (response.status === 200) {
          console.log(response.data)
          window.open(response.data.url, "Reporte")
          this.message = "Reporte Generado Correctamente"
          this.showMessage = true
        }
      } catch (error) {
        const status = error.response.status
        if (status === 404) {

        } else if (status === 401) {
          await this.releaseLocation()

        }

      }

    },
    async generateReport() {
      try {
        const response = await this.axios.post("/report", {
          since: this.since,
          until: this.until,
          office_id: this.office,
          building_id: this.building

        })
        if (response.status === 201) {
          const id = response.data.report_id
          await this.getReport(id)
        }
      } catch (error) {
        if (error.response.status === 401) {
          await this.releaseLocation()
        } else if (error.response.status === 404) {
          this.message = "No se encontraron coincidencias"
          this.showMessage = true
        } else {

        }
      }
    }
  },
  watch: {
    since(newValue) {
      if (newValue > this.until) {
        this.until = newValue;
      }
    },
    until(newValue) {
      if (newValue < this.since) {
        this.since = newValue;
      }
    }
  },
  mounted() {
    this.loadBuildings()
  }
}
</script>

<style scoped>
.flex-date {
  column-gap: 32px;
  @apply flex flex-row flex-nowrap mt-[25px];
}

.body-form {
  @apply flex flex-col flex-nowrap mx-auto
}
</style>