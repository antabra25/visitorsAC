<template>
  <div class="main-content-wrapper">
    <h1 class="title">Selecciona Tu Ubicación</h1>
    <info-message :is-display="showMessage">{{ message }}</info-message>
    <form @submit.prevent="updateUserLocation" class="form">
      <div class="select-control">
        <label for="name">Ubicacion</label>
        <select name="ubicacion" id="ubicacion" v-model="location">
          <option v-for="option in listLocation" :value="option.location_id">{{ option.buildings.name }}
            PISO:{{ option.floor }}
          </option>
        </select>
      </div>
      <base-button>CONTINUAR</base-button>
    </form>
  </div>
</template>

<script>

import BaseButton from "../components/BaseButton.vue";
import InfoMessage from "../components/InfoMessage.vue";

export default {
  name: "SelectLocation",
  components: {
    BaseButton,
    InfoMessage
  },
  data() {
    return {
      listLocation: null,
      location: null,
      message: "",
      showMessage: false
    };

  },
  methods: {
    async updateUserLocation() {
      const userId = localStorage.getItem("user_id");
      await this.axios.put(`/users/update/location/${userId}`, {
        location_id: this.location
      }).then(
        response => {
          if (response.status === 200) {
            this.$router.push("/home");
          }
        }
      ).catch(
        error => {
          if (error.response.status === 404 || error.response.status > 400) {
            this.message = "Error Localizacion no Asignada";
            this.showMessage = true;

          }
        }
      );
    },
    async loadLocations() {
      await this.axios.get("/locations/")
        .then(
          response => {
            if (response.status === 200) {
              this.listLocation = response.data;
            }
          }
        )
        .catch(error => {
            if (error.response.status === 401) {
              let detail = error.response.request.responseText;
              detail = JSON.parse(detail);
            }
          }
        );
    }
  },
  mounted() {
    this.loadLocations();
  }
};
</script>

<style scoped>

label {
  @apply font-content font-normal text-sm text-black mb-[12px] block
}

select {
  border-radius: 5px;
  @apply w-[530px] h-[40px] bg-white font-content outline-none focus:border-2 border-oran
}

option {
  @apply font-content text-sm font-bold
}

.select-control {
  @apply mb-[12px]
}

</style>