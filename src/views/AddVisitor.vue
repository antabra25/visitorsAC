<template>
  <div class="mx-[78px] flex flex-col">
    <h1 class="text-2xl font-subtitle text-black font-medium mt-[60px] mb-[38px]">
      Registro Visitas
    </h1>
    <info-message :is-display="showMessage" @close-tab="closeTab">{{ message }}</info-message>
    <web-cam @upload-photo="(canva)=>photo=canva">
    </web-cam>
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
          <template #title>Vehiculos</template>
          <template #body>
            <entry-small name="Fabricante" input-type="text" v-model="maker"></entry-small>
            <entry-small name="Serie" input-type="text" v-model="cardModel"></entry-small>
            <entry-small name="Numero de Placa" input-type="text" v-model="plate"></entry-small>
          </template>
        </collapse-input>

        <collapse-input>
          <template #title>Equipo 1</template>
          <template #body>
            <entry-small name="Marca" input-type="text" v-model="brand1"></entry-small>
            <entry-small name="Modelo" input-type="text" v-model="model1"></entry-small>
            <entry-small name="Serial" input-type="text" v-model="serial1"></entry-small>
          </template>
        </collapse-input>
        <collapse-input>
          <template #title>Equipo 2</template>
          <template #body>
            <entry-small name="Marca" input-type="text" v-model="brand2"></entry-small>
            <entry-small name="Modelo" input-type="text" v-model="model2"></entry-small>
            <entry-small name="Serial" input-type="text" v-model="serial2"></entry-small>
          </template>
        </collapse-input>
        <collapse-input>
          <template #title>Equipo 3</template>
          <template #body>
            <entry-small name="Marca" input-type="text" v-model="brand3"></entry-small>
            <entry-small name="Modelo" input-type="text" v-model="model3"></entry-small>
            <entry-small name="Serial" input-type="text" v-model="serial3"></entry-small>
          </template>
        </collapse-input>
        <collapse-input>
          <template #title>Equipo 4</template>
          <template #body>
            <entry-small name="Marca" input-type="text" v-model="brand4"></entry-small>
            <entry-small name="Modelo" input-type="text" v-model="model4"></entry-small>
            <entry-small name="Serial" input-type="text" v-model="serial4"></entry-small>
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
      brand1: null,
      model1: null,
      serial1: null,
      brand2: null,
      model2: null,
      serial2:null,
      brand3: null,
      model3: null,
      serial3:null,
      brand4: null,
      model4: null,
      serial4:null,
      listBuildings: "",
      listReasons: "",
      listOffices: "",
      photo: null,
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
      console.log(this.photo)
      const CI = this.CI;
      const URL = `/visitors/${CI}`;
      await this.axios.get(URL)
          .then(response => {
            this.name = response.data.name;
            this.lastName = response.data.lastname;
            this.phone = response.data.phone;
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

      this.validateFields()

      if (this.validForm) {
        const fullName = this.host.split(" ");
        const visitor = {
          visitor_ci: this.CI,
          name: this.name,
          lastname: this.lastName,
          phone: this.phone
        };
        const photo = {
          url: this.photo
        }
        const worker = {
          name: fullName[0],
          lastname: fullName[1]
        };
        const car = {
          maker: this.maker,
          model: this.cardModel,
          plate: this.plate
        };
        const devices = [
          {
            brand: this.brand1,
            model: this.model1,
            serial: this.serial1
          },
          {
            brand: this.brand2,
            model: this.model2,
            serial: this.serial2
          },
          {
            brand: this.brand3,
            model: this.model3,
            serial: this.serial3
          },
          {
            brand: this.brand4,
            model: this.model4,
            serial: this.serial4
          }
        ];
        parseInt(this.cardId);
        const visit = {
          reason_id: this.reason,
          office_id: this.office,
          building_id: this.building,
          passcard_id: parseInt(this.cardId),
          company: this.homeCompany
        };

        const payload = {visit, visitor, worker, devices, car, photo};
        console.log(payload)
        await this.axios.post("/visits/create", payload)
            .then(
                response => {
                  if (response.status === 201) {
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
