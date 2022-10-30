<template>
  <header>
    <nav class="navbar shadow-md">

      <div class="menu-item">
        <router-link to="/home">
          <img src="../assets/svg/home.svg" alt="">
        </router-link>
      </div>

      <div class="dropdown menu-item " v-if="currentRole === '1' || currentRole==='3' || currentRole==='2'">
        <button class="dropdown-btn" @click="setActive(1)">
          VISITANTE
          <img src="../assets/svg/barret.svg" alt="">
        </button>
        <div :class="isActiveVisitor ? 'dropdown-content':'hidden'">
          <router-link class="sub-menu-item " to="/visitor">REGISTRAR</router-link>
          <router-link class="sub-menu-item" to="/visitor/find">BUSCAR</router-link>
        </div>
      </div>

      <div class="menu-item">
        <button class="dropdown-btn">
          <router-link to="/visitor/active">ACTIVOS</router-link>
        </button>
      </div>

      <div class="menu-item">
        <button class="dropdown-btn">
          <router-link to="/verify">VERIFICAR</router-link>
        </button>
      </div>

      <div class="dropdown menu-item" v-if="currentRole === '1'|| currentRole ==='2'">
        <button class="dropdown-btn" @click="setActive(2)">
          ADMINISTRAR
          <img src="../assets/svg/barret.svg" alt="">
        </button>
        <div :class="isActiveAdmin ? 'dropdown-content':'hidden'">
          <router-link class="sub-menu-item" to="/building">EDIFICIO</router-link>
          <router-link class="sub-menu-item" to="/office">OFICINA</router-link>
          <router-link class="sub-menu-item" to="/reason">MOTIVO</router-link>
          <router-link class="sub-menu-item" to="/coordinate">COORDENADA</router-link>
          <router-link class="sub-menu-item" to="/report">REPORTE</router-link>
          <router-link class="sub-menu-item" to="/generator">GENERAR</router-link>
        </div>
      </div>

      <div class="dropdown menu-item" v-if="currentRole === '1'|| currentRole ==='2'">

        <button class="dropdown-btn" @click="setActive(3)">
          USUARIO
          <img src="../assets/svg/barret.svg" alt="">
        </button>

        <div :class="isActiveUser ? 'dropdown-content':'hidden'">
          <router-link class="sub-menu-item" to="/user">REGISTRO</router-link>
          <router-link class="sub-menu-item" to="/users">BUSCAR</router-link>
        </div>

      </div>

      <div id="logout-btn">
        <button @click="logOut">
          <img src="../assets/svg/logout.svg">
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavBar",
  data() {

    return {
      isActiveVisitor: false,
      isActiveAdmin: false,
      isActiveUser: false,
      currentRole: localStorage.getItem("role_id")
    };

  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push("/");
    },

    setActive(btn) {
      if (btn === 1) {
        this.isActiveVisitor = !this.isActiveVisitor;
      } else if (btn === 2) {
        this.isActiveAdmin = !this.isActiveAdmin;
      } else if (btn === 3) {
        this.isActiveUser = !this.isActiveUser;
      }
    }
  }
};
</script>

<style scoped>

.navbar {
  height: 50px;
  width: 100%;
  @apply bg-deepblue text-xs text-white font-title font-bold flex flex-row flex-nowrap  justify-start  px-[79px] items-center drop-shadow-cs ;
}

.dropdown {
  position: relative;
}

.sub-menu-item {
  @apply h-[30px]  border border-b-firered border-x-transparent border-t-transparent w-[160px] hover:bg-firered
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: calc(100% + 17px);
  left: 5%;
  width: 160px;
  @apply bg-deepblue

}

.dropdown-btn {
  @apply font-bold font-title
}

.menu-item {
  @apply mx-2
}

nav img {
  display: inline-block;
}

nav a {
  text-decoration: none;
}

#logout-btn {

  @apply ml-auto
}

</style>