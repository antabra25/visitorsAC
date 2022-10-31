<template>
  <div class="main-content-wrapper">
    <h1 class="title">Registro de Coordenadas</h1>
    <info-message :is-display="showMessage" @close-tab="closeTab">{{ message }}</info-message>
    <form @submit.prevent="sendLocation" class="form">
      <entry-select name="Edificio" :options="listBuildings" @select-value="setOption"
                    v-model="building"></entry-select>
      <entry-long name="Piso" type="text" v-model="floor" @focusout="validateFloor">
        <small class="small" v-if="validFloor==false">{{ floorMessage }}</small>
      </entry-long>
      <base-button id="location-btn">Registrar</base-button>
    </form>
  </div>
</template>

<script>

import EntryLong from "../components/EntryLong.vue";
import EntrySelect from "../components/EntrySelect.vue";
import BaseButton from "../components/BaseButton.vue";
import InfoMessage from "../components/InfoMessage.vue";


export default {
  name: "AddLocation",
  components: {
    EntryLong,
    EntrySelect,
    BaseButton,
    InfoMessage
  },

  data() {
    return {
      building: null,
      floor: null,
      listBuildings: null,
      message: "",
      validFloor: null,
      validBuilding: null,
      floorMessage: "",
      buildingMessage: "",
      showMessage: false


    }
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push("/");
    },
    closeTab() {
      this.showMessage = false
    },
    setOption: async function (value, name) {

      if (name === "Edificio") {
        console.log(value.building_id)
        this.building = value.building_id;
      }
    },
    validateFloor() {
      const floors = ['S', 'PB', 'MZ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
      if (this.floor != null && floors.find(floor => floor == this.floor.toUpperCase())) {
        this.validFloor = true
        this.floor = this.floor.toUpperCase()
      } else {
        this.validFloor = false
        this.floorMessage = "Piso seleccionado no existe"
      }
    },
    validateBuilding() {
      if (this.building != null) {
        this.validBuilding = true
      } else {
        this.validBuilding = false

      }
    },
    sendLocation: async function () {
      this.validateBuilding()

      if (this.validFloor && this.validBuilding) {
        await this.axios.post("/locations/create", {
          building_id: this.building,
          floor: this.floor
        }).then(response => {
          if (response.status === 201) {
            this.message = "Coordenada Agregada Correctamente"
            this.showMessage = true
          }
        }).catch(error => {
          if (error.response.status === 404 && JSON.parse(error.response.request.responseText).detail === "Duplicate location record") {
            this.message = "Error coordenada ya registrada"
            this.showMessage = true

          } else if (error.response.status === 403) {
            this.message = "Error no tienes permisos para realizar esta accion"
            this.showMessage = true

          } else if (error.response.status === 401) {
            this.logOut()
          }
        })
      } else {
        this.message = "Revisa el formulario"
        this.showMessage = true
      }
    },
    loadBuildings: async function () {
      const URL = "/buildings/";
      await this.axios.get(URL)
          .then(response => {
            this.listBuildings = response.data;
          }).catch(error => {
            if (error.response.status === 404) {
              this.message = "No hay Edificios Registrados"
              this.showMessage = true
            }else if(error.response.status === 401){
              this.logOut()
            }else if(error.response.status === 403){
              this.message = "Error no tienes permisos para realizar esta accion"
              this.showMessage = true
            }
          });
    },
  },
  mounted() {
    this.loadBuildings()
  }
}
</script>

<style scoped>

#location-btn {
  display: block;
  @apply mt-2


}

</style>