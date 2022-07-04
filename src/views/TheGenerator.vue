<template>
  <div class="main-content-wrapper">
    <h1 class="title">Pases</h1>
    <info-message :is-display="showMessage" @close-tab="closeTab">{{ message }}</info-message>
    <div class="box">
      <form class="flex flex-col items-center pt-8" @submit.prevent="sendPass">
        <entry-select name="Edificio" @select-value="setOption" :options="listBuildings"></entry-select>
        <entry-long name="Cantidad" input-type="number" v-model.trim="qt" @focusout="validateQt">
          <small class="small" v-if="validQt === false">{{ qtMessage }}</small>
        </entry-long>
        <base-button class="btn">Generar</base-button>
      </form>

    </div>

  </div>
</template>

<script>
import EntrySelect from "../components/EntrySelect.vue";
import BaseButton from "../components/BaseButton.vue";
import InfoMessage from "../components/InfoMessage.vue";
import EntryLong from "../components/EntryLong.vue";

export default {
  name: "TheGenerator",
  components: {
    EntrySelect,
    EntryLong,
    BaseButton,
    InfoMessage
  },
  data() {
    return {
      qt: null,
      building: null,
      listBuildings: null,
      validBuilding: null,
      validQt: null,
      showMessage: "",
      qtMessage: "",
      message: ""

    };
  },
  methods: {
    async releaseLocation() {
      const user_id = localStorage.getItem("user_id");
      try {
        const response = await this.axios.put(`/locations/update/${user_id}`, {
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
    closeTab() {
      this.showMessage = false;
    },
    setOption(value, name) {
      if (value && name) {
        this.building = value.building_id;
      }

    },
    validateQt() {
      if (this.qt && this.qt < 31) {
        this.validQt = true;
      } else {
        this.validQt = false;
        this.qtMessage = "No mas 30 pases por operacion";
      }
    }
    ,
    loadBuildings: async function() {
      const URL = "/buildings/";
      await this.axios.get(URL)
        .then(response => {
          this.listBuildings = response.data;
        }).catch(error => {
          if (error.response.status === 401) {
            this.releaseLocation();
          } else if (error.response.status === 404) {
            this.message = "No hay Edificios Registrados";
            this.showMessage = true;
          }
        });
    },
    sendPass: async function() {
      await this.axios.post("/pass/create", {
        building: this.building,
        qt: this.qt
      })
        .then(response => {
          if (response.status === 201) {
            this.message = "Pases Generado Correctamente";
            this.showMessage = true;

          }

        }).catch(error => {
          if (error.response.status === 401) {
            this.releaseLocation();
          } else if (error.response.status === 500) {
            this.message = "Error Pase No Generado";
            this.showMessage = true;
          }


        });

    }
  },
  mounted() {
    this.loadBuildings();
  }

};
</script>

<style scoped>

.box {
  border-radius: 50px;
  @apply w-[680px] h-[560px] bg-royal mx-auto
}


.btn {
  @apply bg-boregray text-[#2A2F35] mt-2.5 hover:border-amber-400
}


img {

  width: 350px;
  height: 350px;
}


</style>