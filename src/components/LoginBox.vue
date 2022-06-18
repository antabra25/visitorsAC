<template>
  <form @submit.prevent="login" class="boxLogin">
    <div class="flex flex-col flex-nowrap items-center gap-y-6">
      <div class="relative">
        <input class="loginInput" placeholder="Usuario" name="username" type="text" required v-model="username"
               @blur="validateUserName">
        <small class="small" v-if="validUserName === false">{{ usernameMessage }}</small>
      </div>
      <div class="relative">
        <input class="loginInput" placeholder="Contraseña" name="password" type="password" required v-model="password"
               @blur="validatePassword">
        <small class="small" v-if="validPassword === false">{{ passwordMessage }}</small>
      </div>
      <login-btn class="">ENTRAR</login-btn>
    </div>
  </form>
</template>

<script>
import LoginBtn from "./LoginBtn.vue";

export default {
  components: {
    LoginBtn
  },
  data() {
    return {
      username: "",
      password: "",
      usernameMessage: "",
      passwordMessage: "",
      validPassword: null,
      validUserName: null,


    }
  },
  methods: {
    validateUserName() {
      if (this.username != "" && this.username.length > 6) {
        this.validUserName = true
      } else {
        this.validUserName = false
        this.usernameMessage = "Campo vacio o < a 7 caracter"
      }
    },
    validatePassword() {
      if (this.password != "" && this.password.length > 7) {
        this.validPassword = true
      } else {
        this.validPassword = false
        this.passwordMessage = "Campo vacio o contraseña < 8 Digitos"
      }

    },

    login: async function () {

      if (this.validUserName && this.validPassword) {


        const payload = new URLSearchParams()
        payload.append("username", this.username)
        payload.append("password", this.password)
        const customConfig = {
          baseURL: 'http://127.0.0.1:8000',
          timeout: 1000,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        }
        const instance = this.axios.create(customConfig)
        await instance.post("/login", payload)
            .then(response => {
              if (response.status === 200) {
                this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user_id',response.data.user_id)
                localStorage.setItem('role_id',response.data.role_id)
                this.$router.push('/location');
              }

            }).catch(error => {
              if (error.response.status === 403) {
                this.passwordMessage = "Credenciales Invalidas"
                this.validPassword = false
              }

            })


      }


    }
  }
}


</script>

<style scoped>

.small {
  display: block;
  position: absolute;
  left: 0px;
  top: 40px;
  color: white;
}

</style>