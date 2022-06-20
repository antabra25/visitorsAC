<template>
  <div class="main-content-wrapper">
    <h1 class="title">Verificar Visitantes</h1>
    <info-message :is-display="showMessage">{{ message }}</info-message>
    <web-cam @upload-photo="(canva)=>photo=canva"></web-cam>
    <form @submit.prevent>
      <div class="main-verify">
        <entry-small-off name="Nro Carnet" input-type="number" v-model="passId"></entry-small-off>
        <entry-small-off name="C.I" input-type="number" disabled v-model="ci"></entry-small-off>
        <entry-small-off name="Nombre" input-type="text" v-model="name"></entry-small-off>
        <entry-small-off name="Apellido" input-type="text" v-model="lastName"></entry-small-off>
        <entry-small-off name="Piso" input-type="number" v-model="flat"></entry-small-off>
        <entry-small-off name="Oficina" input-type="text" v-model="office"></entry-small-off>
        <base-button class="mt-4" @click="checkPass">Verificar</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import EntrySmallOff from "../components/EntrySmallOff.vue";
import WebCam from "../components/WebCam.vue";
import InfoMessage from "../components/InfoMessage.vue";
import BaseButton from "../components/BaseButton.vue";

export default {
  name: "VerifyPass",
  components: {
    EntrySmallOff,
    WebCam,
    InfoMessage,
    BaseButton
  },
  data() {
    return {
      passId: "",
      ci: "",
      name: "",
      lastName: "",
      flat: "",
      office: "",
      message: "",
      showMessage: false,
      photo: "",
      updated: null
    };
  },
  methods: {
    async releaseLocation() {
      const user_id = localStorage.getItem("user_id")
      this.axios.put(`/locations/update/${user_id}`, {
        available: true
      }).then(
          response => {
            if (response.status === 200) {
              this.updated = true
            }
          }
      ).catch(
          error => {
            if (error.response.status === 404) {
              this.updated = false
              this.message = "Error No se Desactivo la localizacion"
              this.showMessage = true

            }
          }
      )
    },
    async checkPass() {
      if (this.photo) {
        await this.axios.post("/check/create", {
          qr: this.photo
        }).then(response => {
              if (response.status === 201) {
                const visitor = response.data
                this.passId = visitor.pass_id
                this.ci = visitor.ci
                this.name = visitor.name
                this.lastName = visitor.lastname
                this.flat = visitor.flat
                this.office = visitor.office
              }
            }
        ).catch(
            async error => {
              if (error.response.status === 401) {
                console.log("Estoy dentro del condicional 401")
                await this.releaseLocation()
                if (this.updated === true) {
                  console.log("Estoy dentro de la respuesta del 401 ")
                  /* Limpiar localStorage */
                  localStorage.clear()
                  this.$router.push("/")
                }
              } else if (error.response.status > 401) {
                /* Notificar error al usuario */
                console.log(error.response.data)
              }
            }
        );
      }
    }
  }
};
</script>

<style scoped>

.main-verify {
  @apply w-[888px] h-[208px] flex flex-row flex-wrap gap-x-[69px] mx-auto mb-[319px] mt-[256px]
}


</style>