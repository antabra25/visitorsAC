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
      <tr v-for="reason in reasons">
        <td>{{ reason.reason_id }}</td>
        <td>{{ reason.name }}</td>
        <td>
          <button>
            <router-link to="/reason/edit/:reasonId"><img src="../assets/svg/bx-edit.svg"></router-link>
          </button>
        </td>
        <td>
          <button @click="deleteReason"><img src="../assets/svg/delete-circle.svg" alt=""></button>
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
    }

  },
  methods: {
    closeTab() {
      this.showMessage = false
    },
    deleteReason() {

    },
    validateReason() {
      if (this.reason != "" && this.reason.length > 4) {
        this.reason = this.reason.toUpperCase()
        this.validReason = true
      } else {
        this.validReason = false
        this.reasonMessage = "Campo vacio"
      }
    },
    loadReasons: async function () {
      const URL = '/reasons/'
      await this.axios.get(URL).then(
          response => {
            this.reasons = response.data
          }
      ).catch(error => {
        console.log(error)
      })

    },
    sendReason: async function () {
      this.validateReason()
      if (this.validReason) {
        const URL = '/reasons/create'
        await this.axios.post(URL, {
              name: this.reason
            }
        ).then(response => {
          if (response.status === 201) {
            this.message = "Motivo Agregado Correctamente"
            this.showMessage = true
            this.$refs.reason.reset()

          }
        }).catch(error => {
          if (error.response.status == 404 && JSON.parse(error.response.request.responseText).detail === "Field Name Duplicate") {
            console.log(error.response)
            this.message = "Campo Motivo Duplicado"
            this.showMessage = true
          }

        })
      } else {
        this.message = "Verifica el Formulario"
        this.showMessage = true
      }
    }
  },
  mounted() {
    this.loadReasons()
  }
}
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