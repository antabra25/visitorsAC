<template>
  <div class="main-content-wrapper">
    <h1 class="title">Edificio</h1>
    <info-message :is-display="showMessage" @close-tab="closeTab">{{ message }}</info-message>

    <form @submit.prevent="sendBuilding" ref="building">
      <div class="form">
        <entry-long input-type="text" name="Nombre del Edificio" v-model.trim="name" :model-value="name"
                    @focusout="validateName">
          <template #default>
            <small class="small" v-if="validName === false">
              {{ nameBuildingMessage }}
            </small>
          </template>
        </entry-long>

        <entry-long name="Dirección" v-model.trim="address" :model-value="address" input-type="text"
                    @focusout="validateAddress">
          <template #default>
            <small class="small" v-if="validAddress === false">
              {{addressMessage}}
            </small>
          </template>
        </entry-long>
        <base-button class="register-btn ">Registrar</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import EntryLong from "../components/EntryLong.vue";
import BaseButton from "../components/BaseButton.vue";
import InfoMessage from "../components/InfoMessage.vue";

export default {
  name: "AddBuilding",
  components: {
    EntryLong,
    BaseButton,
    InfoMessage
  },
  data() {
    return {
      name: '',
      address: '',
      isCheckRegister: false,
      message: '',
      nameBuildingMessage: "",
      addressMessage: "",
      validFields: null,
      validName: null,
      validAddress: null,
      showMessage: false


    }
  },
  methods: {

    closeTab() {
      this.showMessage = false
    },
    validateName() {

      if (this.name != '' && this.name.length > 3) {
        this.name = this.name.toUpperCase()
        this.validName = true
      } else {
        this.nameBuildingMessage = "Campo vacio o < a 4 Caracteres"
        this.validName = false
      }
    },
    validateAddress() {
      if (this.address != '' && this.address.length > 3) {
        this.address = this.address.toUpperCase()
        this.validAddress = true
      } else {
        this.validAddress = false
        this.addressMessage = "Campo Vacio o < a 4 caracteres"
      }
    },

    validForm() {

      if (this.validName && this.validAddress) {
        this.validFields = true
      } else {
        this.validFields = false
      }
    },
    sendBuilding: async function () {

      this.validForm()

      if (this.validFields) {

        await this.axios.post('/buildings/create', {
          name: this.name,
          address: this.address
        })
            .then(response => {

                  if (response.status === 201) {

                    this.message = "Edificio Agregado Correctamente"
                    this.showMessage = true
                    this.$refs.building.reset()
                  }
                }
            )
            .catch(error => {
              if (error.response.status == 409) {
                this.message = "Ya existe un registro con este Nombre"
                this.showMessage = true

              } else {
                this.message = "Error registro no agregado"
                this.showMessage = true
              }


            })
      } else {

        this.message = "Verifica los campos primero"
        this.showMessage = true

      }

    }
  }
}
</script>

<style scoped>

</style>