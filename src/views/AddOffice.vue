<template>
  <div class="main-content-wrapper">
    <h1 class="title">Oficina Administrativa</h1>
    <info-message :is-display="showMessage" @close-tab="closeTab">{{ message }}</info-message>
    <form @submit.prevent="sendOffice" class="form" ref="office">
      <entry-long name="Nombre Oficina" input-type="text" v-model.trim="office">
        <small class="small">{{ messageOffice }}</small>
      </entry-long>
      <entry-long name="Acronimo" input-type="text" v-model.trim="acronymOffice">
        <small class="small">{{ messageAcronym }}</small>
      </entry-long>
      <entry-select name="Edificio" :options="buildings" @select-value="setValue"></entry-select>
      <entry-small name="Piso" input-type="text" v-model.trim="flat">
        <small class="small">{{ messageFloor }}</small>
      </entry-small>
      <entry-small name="Extension Telefonica" input-type="tel" v-model.trim="phone">
        <small class="small">{{ messagePhone }}</small></entry-small>
      <base-button class="register-btn">Registrar</base-button>
    </form>
  </div>
</template>

<script>
import EntryLong from "../components/EntryLong.vue";
import EntrySmall from "../components/EntrySmall.vue";
import EntrySelect from "../components/EntrySelect.vue";
import BaseButton from "../components/BaseButton.vue";
import InfoMessage from "../components/InfoMessage.vue";

export default {
  name: "AddOffice",
  components: {
    EntryLong,
    EntrySmall,
    EntrySelect,
    BaseButton,
    InfoMessage
  },
  data() {
    return {
      office: "",
      acronymOffice: "",
      flat: "",
      phone: "",
      building: null,
      buildings: "",
      showMessage: false,
      message: "",
      validPhone: null,
      validAcronym: null,
      validFloor: null,
      validOffice: null,
      messageOffice: "",
      messageFloor: "",
      messageAcronym: "",
      messagePhone: "",
      floors: ["S", "PB", "MZ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
      validForm: false,
    }
  }
  , methods: {
    logOut() {
      localStorage.clear()
      this.$router.push("/")
    },
    closeTab() {
      this.showMessage = false
    },
    validateForm() {

      if (this.office != "" && this.office.length > 4) {
        this.office = this.office.toUpperCase()
        this.validOffice = true
      } else {
        this.validOffice = false
        this.messageOffice = "Formato del campo invalido"

      }
      if (this.acronymOffice != "" && this.acronymOffice.length > 2) {
        this.acronymOffice = this.acronymOffice.toUpperCase()
        this.validAcronym = true

      } else {
        this.validAcronym = false
        this.messageAcronym = "Campo vacio o Formato no valido"
      }
      if (this.flat != "" && this.floors.find(floor => floor === this.flat)) {
        this.validFloor = true
      } else {
        this.validFloor = false
        this.messageFloor = "Campo vacio o piso no valido"
      }
      if (this.phone != "" && this.phone.length === 4) {
        this.validPhone = true
      } else {
        this.validPhone = false
        this.messagePhone = "Campo vacio o Formato del telefono invalido"
      }

      if (this.validOffice && this.validAcronym && this.validFloor && this.validPhone && this.building != null) {
        this.validForm = true
      }


    },
    sendOffice: async function () {
      this.validateForm()
      if (this.validForm) {

        await this.axios.post('/offices/create', {
          building_id: this.building,
          name: this.office,
          phone: this.phone,
          acronym: this.acronymOffice,
          flat: this.flat
        }).then(
            response => {

              if (response.status === 201) {
                this.message = "Oficina Agregada Correctamente"
                this.showMessage = true
                this.$refs.office.reset()
              }
            }
        ).catch(
            error => {
              if (error.response.status === 401) {
                this.logOut()
              } else if (error.response.status > 401) {
                this.message = "Error en el Servidor."
                this.showMessage = true
              }
            }
        )
      } else {
        this.message = "Verifica los campos primero"
        this.showMessage = true

      }

    },
    loadBuildings: async function () {

      await this.axios.get('/buildings/')
          .then(response => {
            this.buildings = response.data
          }).catch(error => {
        if (error.response.status === 401) {
          this.logOut()
        } else if (error.response.status > 401) {
          this.message = "Error en el Servidor."
          this.showMessage = true
        }
          })
    },
    setValue: async function (value) {

      this.building = value.building_id

    }
  },
  mounted() {
    this.loadBuildings()

  }
}
</script>

<style scoped>


</style>