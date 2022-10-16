<template>
  <div class="main-content-wrapper">
    <h1 class="title">Motivo</h1>
    <info-message :is-display="showMessage" @close-tab="closeTab">{{ message }}</info-message>
    <form @submit.prevent="sendReason" ref="reason">
      <div class="form" ref="reason">
        <entry-long name="Motivo de Visita" v-model.trim="reason" :model-value="reason">
          <template #default>
            <small class="small" v-if="!validReason">{{ reasonMessage }}</small>
          </template>
        </entry-long>
        <base-button class="register-btn ">Registrar</base-button>
      </div>
    </form>

    <table class="table-fixed">
      <thead>
      <tr>
        <th class="w-[38px]">Nro</th>
        <th class="w-[462px]">Motivo</th>
        <th>Editar</th>
        <th>Eliminar</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="reason in reasons" :key="reason.reason_id">
        <td>{{ reason.reason_id }}</td>
        <td>{{ reason.name }}</td>
        <td>
          <button>
            <router-link to="/reason/edit/:reasonId"><img src="../assets/svg/bx-edit.svg"></router-link>
          </button>
        </td>
        <td>
          <button @click="deleteReason(reason.reason_id)"><img src="../assets/svg/delete-circle.svg" alt=""></button>
        </td>
      </tr>
      </tbody>
    </table>

  </div>


</template>

<script>
import EntryLong from "../components/EntryLong.vue";
import BaseButton from "../components/BaseButton.vue";
import InfoMessage from "../components/InfoMessage.vue";

export default {
  name: "AddReason",
  components: {
    EntryLong,
    BaseButton,
    InfoMessage

  },
  data() {

    return {
      reason: "",
      reasons: null,
      validReason: null,
      showMessage: false,
      message: "",
      reasonMessage: ""
    };

  },
  methods: {

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
    closeTab() {
      this.showMessage = false;
    },
    async deleteReason(id) {
      try {
        const response = await this.axios.delete(`/reasons/delete/${id}`)
        if (response.status === 204) {
          this.message = "Elemento eliminado"
          this.showMessage = true
          await this.loadReasons()
        }

      } catch (error) {
        if (error.response.status === 404) {
          this.message = "Error.No existe registro con ese nombre"
          this.showMessage = true
        } else if (error.response.status === 401) {
          this.releaseLocation()
        }
      }


    },
    validateReason() {
      if (this.reason != "" && this.reason.length > 4) {
        this.reason = this.reason.toUpperCase();
        this.validReason = true;
      } else {
        this.validReason = false;
        this.reasonMessage = "Campo vacio";
      }
    },
    async loadReasons() {

      await this.axios.get("/reasons/").then(
          response => {
            this.reasons = response.data;
          }
      ).catch(error => {
        console.log(error);
      });

    },
    sendReason: async function () {
      this.validateReason();
      if (this.validReason) {
        try {
          const response = await this.axios.post("/reasons/create", {
            name: this.reason
          });
          if (response.status === 201) {
            this.message = "Motivo registrado"
            this.showMessage = true
             this.$refs.reason.reset();
            await this.loadReasons();
          }
        } catch (error) {

          if (error.response.status === 401) {
            await this.releaseLocation();

          } else if (error.response.status == 404 && JSON.parse(error.response.request.responseText).detail === "Field Name Duplicate") {
            this.message = "Error.El motivo ya existe"
            this.showMessage = true;
          } else {
            this.message = "Error en el servidor";
            this.showMessage = true;

          }

        }

      } else {
        this.message = "Verifica el Formulario";
        this.showMessage = true;
      }
    }
  },
  mounted() {
    this.loadReasons();
  }
};
</script>

<style scoped>


table {

  border-collapse: collapse;
  background: linear-gradient(180deg, rgba(229, 229, 229, 0.2) 23.02%, rgba(229, 229, 229, 0.132) 30.73%, rgba(41, 92, 152, 0.2) 79.17%),
  linear-gradient(0deg, #FFFFFF, #FFFFFF);
  @apply w-[650px] mx-[395px] mt-7
}

table thead {

  @apply bg-[#2A2F35] text-white text-sm h-8
}

table, th, td {
  border: 1px dashed rgba(41, 92, 152, 1);
}

td {
  @apply text-center h-[30px]
}


</style>