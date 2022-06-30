<template>
  <div class="main-content-wrapper">
    <h1 class="mt-[60px] font-subtitle font-medium text-black text-2xl pb-[125px] text-center">Usuario</h1>
    <web-cam @upload-photo="(canva)=>photo=canva"></web-cam>
    <info-message :is-display="showMessage" @close-tab="closeTab">{{ message }}</info-message>
    <form @submit.prevent="sendUser" class="form" ref="user">
      <entry-small name="Correo" input-type="email" v-model.trim="email" @focusout="checkEmail">
        <template #default>
          <small v-if="validEmail===false" class="small">
            {{ emailMessage }}
          </small>
        </template>
      </entry-small>
      <entry-small name="Nombre de Usuario" input-type="text" v-model.trim="username"
                   @focusout="checkUserName">
        <template #default>
          <small class="small" v-if="validUserName===false">
            {{ usernameMessage }}
          </small>
        </template>
      </entry-small>
      <entry-small name="Contraseña" input-type="password" v-model.trim="password"></entry-small>
      <entry-small name="Repita Contraseña" input-type="password" v-model.trim="checkPassword"
                   @focusout="validatePassword">
        <template #default>
          <small v-if="validPassword === false" class="small">{{ passwordMessage }}</small>
        </template>
      </entry-small>

      <entry-select-small name="Rol" :options="listRole" @select-value="setOption"></entry-select-small>
      <base-button class="register-btn">Registrar</base-button>
    </form>
  </div>
</template>

<script>
import EntrySmall from "../components/EntrySmall.vue";
import EntrySelectSmall from "../components/EntrySelectSmall.vue";
import BaseButton from "../components/BaseButton.vue";
import InfoMessage from "../components/InfoMessage.vue";
import WebCam from "../components/WebCam.vue";

export default {
  name: "AddUser",
  components: {
    EntrySmall,
    EntrySelectSmall,
    BaseButton,
    InfoMessage,
    WebCam
  },
  data() {
    return {

      username: null,
      email: null,
      password: null,
      checkPassword: null,
      rol: null,
      photo : null,
      listRole: null,
      validPassword: null,
      validEmail: null,
      validUserName: null,
      usernameMessage: "",
      emailMessage: "",
      passwordMessage: "",
      showMessage: false,
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
    setOption: async function (value) {

      if (value) {
        this.rol = value.role_id;
      }
    },
    loadRoles: async function () {
      const URL = "/roles/";
      await this.axios.get(URL)
          .then(response => {
            this.listRole = response.data;
          })
          .catch(
              (error) => {
                if (error.response.status === 401) {
                  this.releaseLocation();
                } else {
                  this.message = "Error no se recupero los roles";
                  this.showMessage = true;
                }
              }
          );

    },
    checkEmail: async function () {
      if (
          this.email != null &&
          this.email.length > 10 &&
          this.email.includes("@") &&
          this.email.includes(".") &&
          !(this.email.includes(" "))
      ) {
        const URL = `/users/verify/${this.email}`;
        await this.axios.get(URL)
            .then(
                response => {
                  if (response.status == 200) {
                    console.log(response.data);
                    this.validEmail = response.data.available;
                    this.emailMessage = "Correo registrado en el sistema";
                  }
                })
            .catch(
                error => {
                  if (error.response.status === 401) {
                    this.releaseLocation();
                  } else {
                    this.message = "Error en la verificacion";
                    this.showMessage = true;
                  }
                }
            );
      } else {
        this.emailMessage = "Formato del correo no valido";
        this.validEmail = false;

      }
    },
    checkUserName: async function () {

      if (this.username != null && this.username.length > 6) {

        const URL = `/users/check/${this.username}`;

        await this.axios.get(URL)
            .then(
                response => {
                  this.validUserName = response.data.available;
                  this.usernameMessage = "Usuario no disponible";
                }
            )
            .catch(
                error => {
                  if (error.response.status === 401) {
                    this.releaseLocation();
                  }
                }
            );
      } else {
        this.validUserName = false;
        this.usernameMessage = "Campo vacio o menor a 7 caracteres";

      }
    },
    validatePassword: async function () {

      if (this.password != null && this.checkPassword != null) {

        if (this.password === this.checkPassword && this.password.length > 7) {
          this.validPassword = true;

        } else {
          this.validPassword = false;
          this.passwordMessage = "Contraseñas distintas o menor a 8 caracteres";

        }
      } else {

        this.passwordMessage = "Campo Contraseña vacio";
        this.validPassword = false;
      }


    },
    sendUser: async function () {

      if (this.validEmail && this.validUserName && this.validPassword && this.rol != null && this.photo) {

        const URL = "/users/create";
        await this.axios.post(URL, {
          username: this.username,
          email: this.email,
          password: this.password,
          role_id: this.rol,
          photo: this.photo
        }).then(response => {
          console.log(response.data);
          if (response.status === 201) {
            this.message = "Usuario Agregado Correctamente";
            this.showMessage = true;
            this.$refs.user.reset();
          }
        }).catch(
            error => {
              if (error.response.status === 401) {
                this.releaseLocation();
              } else if (error.response.status > 401) {
                this.message = "Error Usuario no Agregado";
                this.showMessage = true;

              }
            }
        );
      } else {

        this.message = "Revisa el Formulario";
        this.showMessage = true;

      }
    }
  },
  mounted() {
    this.loadRoles();
  }
};
</script>

<style scoped>


</style>