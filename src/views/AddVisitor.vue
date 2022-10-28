<template>
  <div class="mx-[78px] flex flex-col">
    <h1 class="text-2xl font-subtitle text-black font-medium mt-[60px] mb-[38px]">
      Registro Visitas
    </h1>
    <info-message :is-display="showMessage" @close-tab="closeTab">{{ message }}</info-message>
    <web-cam @upload-photo="(canva)=>photo=canva" :photo="serverPhoto"/>

    <form @submit.prevent="sendVisit" ref="visit">
      <h2 class="sub mb-[25px]">Datos Personales</h2>

      <div class="row">
        <entry-small
            name="Cedula"
            input-type="number"
            v-model.trim="CI"
            @focusout="findVisitor"
        ></entry-small>
        <entry-small name="Celular" input-type="tel" v-model.trim="phone" :model-value="phone"
                     @focusout="validatePhone">
          <small class="small" v-if="validPhone==false">{{ phoneMessage }}</small>
        </entry-small>
      </div>
      <div class="row">
        <entry-small name="Nombre" input-type="text" v-model.trim="name" :model-value="name"></entry-small>
        <entry-small name="Apellido" input-type="text" v-model.trim="lastName" :model-value="lastName"></entry-small>
      </div>

      <h2 class="sub mt-[16px] mb-[21px]">Visita</h2>

      <div class="column">
        <entry-long name="Empresa de Origen" class="mb-[12px]" v-model="homeCompany"></entry-long>
        <entry-select name="Edificio" :options="listBuildings" v-model="building"
                      @select-value="setOption"></entry-select>

        <div class="row">
          <entry-select name="Oficina" v-model="office" @select-value="setOption" :options="listOffices"></entry-select>
          <entry-small name="Extension" v-model="extension"></entry-small>
        </div>

        <div class="row">
          <entry-long name="Persona a Visitar" v-model="host"></entry-long>
          <entry-small name="Codigo Tarjeta" input-type="number" v-model="cardId" @focusout="validatePass">
            <small class="small" v-if="validCard===false">{{ cardMessage }}</small>
          </entry-small>
        </div>
        <entry-select name="Motivo" v-model="reason" @select-value="setOption" :options="listReasons"></entry-select>
      </div>

      <div class="row mt-[25px] mb-[54px]">
        <collapse-input>
          <template #title>Vehiculo</template>
          <template #body>
            <entry-small name="Fabricante" input-type="text" v-model="maker"></entry-small>
            <entry-small name="Serie" input-type="text" v-model="cardModel"></entry-small>
            <entry-small name="Numero de Placa" input-type="text" v-model="plate"></entry-small>
          </template>
        </collapse-input>

        <collapse-input>
          <template #title>Equipo</template>
          <template #body>
            <entry-small name="Marca" input-type="text" v-model="devices.brand[0]"></entry-small>
            <entry-small name="Modelo" input-type="text" v-model="devices.model[0]"></entry-small>
            <entry-small name="Serial" input-type="text" v-model="devices.serial[0]"></entry-small>
          </template>
        </collapse-input>
        <collapse-input>
          <template #title>Equipo</template>
          <template #body>
            <entry-small name="Marca" input-type="text" v-model="devices.brand[1]"></entry-small>
            <entry-small name="Modelo" input-type="text" v-model="devices.model[1]"></entry-small>
            <entry-small name="Serial" input-type="text" v-model="devices.serial[1]"></entry-small>
          </template>
        </collapse-input>
        <collapse-input>
          <template #title>Equipo</template>
          <template #body>
            <entry-small name="Marca" input-type="text" v-model="devices.brand[2]"></entry-small>
            <entry-small name="Modelo" input-type="text" v-model="devices.model[2]"></entry-small>
            <entry-small name="Serial" input-type="text" v-model="devices.serial[2]"></entry-small>
          </template>
        </collapse-input>
        <collapse-input>
          <template #title>Equipo</template>
          <template #body>
            <entry-small name="Marca" input-type="text" v-model="devices.brand[3]"></entry-small>
            <entry-small name="Modelo" input-type="text" v-model="devices.model[3]"></entry-small>
            <entry-small name="Serial" input-type="text" v-model="devices.serial[3]"></entry-small>
          </template>
        </collapse-input>

      </div>
      <base-button>Registrar</base-button>
    </form>

  </div>
</template>

<script>


import EntrySmall from "../components/EntrySmall.vue";
import EntryLong from "../components/EntryLong.vue";
import EntrySelect from "../components/EntrySelect.vue";
import BaseButton from "../components/BaseButton.vue";
import CollapseInput from "../components/CollapseInput.vue";
import WebCam from "../components/WebCam.vue";
import InfoMessage from "../components/InfoMessage.vue";


export default {
  name: "AddVisitor",
  components: {
    EntrySmall,
    EntryLong,
    EntrySelect,
    BaseButton,
    CollapseInput,
    WebCam,
    InfoMessage
  },
  data() {
    return {

      name: "",
      lastName: "",
      CI: "",
      phone: "",
      homeCompany: "",
      office: "",
      reason: "",
      building: "",
      host: "",
      extension: "",
      cardId: "",
      plate: null,
      maker: null,
      cardModel: null,
      devices: {
        "brand": [],
        "model": [],
        "serial": []
      },
      listBuildings: "",
      listReasons: "",
      listOffices: "",
      photo: null,
      serverPhoto: null,
      validCard: null,
      validPhone: null,
      validForm: null,
      showMessage: false,
      message: "",
      cardMessage: "",
      phoneMessage: "",
    };
  },
  methods: {
    closeTab() {
      this.showMessage = false
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
    validateFields() {
      if (
          this.photo &&
          this.name &&
          this.CI &&
          this.lastName &&
          this.homeCompany &&
          this.reason &&
          this.building &&
          this.host &&
          this.validCard &&
          this.validPhone) {

        this.name = this.name.toUpperCase()
        this.lastName = this.lastName.toUpperCase()
        this.homeCompany = this.homeCompany.toUpperCase()
        this.host = this.host.toUpperCase()
        this.validForm = true
      } else {
        this.validForm = false
      }
    },

    validatePhone() {
      if (this.phone != "" && this.phone.length === 11) {
        this.validPhone = true
      } else {
        this.validPhone = false
        this.phoneMessage = "Campo vacio o invalido"
      }
    },
    async validatePass() {
      console.log(this.cardId)
      if (this.cardId != "") {
        await this.axios.get(`/pass/${this.cardId}`)
            .then(response => {
                  if (response.status === 200) {
                    const isActivated = response.data.activated
                    if (isActivated) {
                      this.cardMessage = "Pase en uso"
                      this.validCard = false
                    } else {
                      this.validCard = true
                    }
                  }
                }
            )
            .catch(
                error => {
                  if (error.response.status === 404) {
                    this.cardMessage = "No existe este pase"
                    this.validCard = false

                  }
                }
            )
      } else {
        this.validCard = false
      }

    },

    loadOffices: async function (id) {
      const URL = `/offices/building/${id}`;
      await this.axios.get(URL)
          .then(
              response => {
                this.listOffices = response.data;
              }
          ).catch(
              error => {
                if (error.response.status === 403) {

                } else if (error.response.status === 404) {

                } else if (error.response.status > 404) {

                }

              }
          );
    },
    setOption: async function (value, name) {

      if (name === "Edificio") {
        this.building = value.building_id;
        this.loadOffices(this.building);
      } else if (name === "Oficina") {
        this.office = value.office_id;
        const selectedOffice = this.listOffices.filter(office => office.office_id == this.office);
        this.extension = selectedOffice[0].phone;
      } else if (name === "Motivo") {
        this.reason = value.reason_id;
      }
    },
    findVisitor: async function () {
      const CI = this.CI;
      const URL = `/visitors/${CI}`;
      await this.axios.get(URL)
          .then(response => {
            this.name = response.data.name;
            this.lastName = response.data.lastname;
            this.phone = response.data.phone;
            this.serverPhoto = response.data.photo;

          })
          .catch((error) => {
            console.log(error);
          });
    },
    loadBuildings: async function () {
      const URL = "/buildings/";
      await this.axios.get(URL)
          .then(response => {
            this.listBuildings = response.data;
          }).catch(error => {
            console.log("Error", error);
          });
    },
    loadReasons: async function () {
      const URL = "/reasons/";
      await this.axios.get(URL)
          .then(response => {
            this.listReasons = response.data;
          }).catch(error => {
            console.log("Error:", error);
          });
    },
    sendVisit: async function () {

      console.log(this.devices)

      this.validateFields()

      if (this.validForm) {
        const fullName = this.host.split(" ");
        const visitor = {
          visitor_ci: this.CI,
          name: this.name,
          lastname: this.lastName,
          phone: this.phone,
          photo: this.photo
        };
        const devices = [
          {
            brand: this.devices.brand[0],
            model: this.devices.model[0],
            serial: this.devices.serial[0]
          },
          {
            brand: this.devices.brand[1],
            model: this.devices.model[1],
            serial: this.devices.serial[1]
          },
          {
            brand: this.devices.brand[2],
            model: this.devices.model[2],
            serial: this.devices.serial[2]
          },
          {
            brand: this.devices.brand[3],
            model: this.devices.model[3],
            serial: this.devices.serial[3]
          }
        ]

        const worker = {
          name: fullName[0],
          lastname: fullName[1]
        };
        const car = {
          maker: this.maker,
          model: this.cardModel,
          plate: this.plate
        };
        parseInt(this.cardId);
        const visit = {
          reason_id: this.reason,
          office_id: this.office,
          building_id: this.building,
          passcard_id: parseInt(this.cardId),
          company: this.homeCompany
        };

        const payload = {visit, visitor, worker};
        await this.axios.post("/visits/create", payload)
            .then(
                 (response) => {
                  if (response.status === 201) {
                    const visitor_id = response.data.visitor_id;

                    // const car = await this.axios.post(`/cars/create/${visitor_id}`, car)
                    // const devices = await this.axios.post(`/devices/create/${visitor_id}`, devices)

                    this.message = "Visita Agregada"
                    this.showMessage = true
                    this.$refs.visit.reset()

                  }
                }
            ).catch(error => {
              if (error.response.status === 401) {
                console.log("Vuelve a Iniciar Sesion ")
                this.$router.push("/")

              } else if (error.response.status > 401) {
                this.message = "Error Visita No Agregada"
                this.showMessage = true
              }
            });

      } else {
        this.message = "Comprueba los campos"
        this.showMessage = true
      }
    }
  },
  mounted() {
    this.loadBuildings();
    this.loadReasons();

  }
};
</script>

<style scoped>
.row {
  @apply flex flex-row flex-wrap  gap-x-[36px];
}

.column {
  @apply flex flex-col flex-nowrap items-start;
}

.sub {
  @apply font-subtitle font-bold text-sm;
}
</style>
