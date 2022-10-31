<template>

  <div class="main-content-wrapper">
    <info-message :is-display="showMessage">{{ message }}</info-message>
    <h1 class="title-local">Visitantes Activos</h1>
    <search-input name="Buscar" class="ml-[78px] mt-8"></search-input>
    <div class="visitor-layout">
      <visitor-card
          v-for="visitor in visits"
          :key="visitor.visitId"
          :id="visitor.visitId"
          :visitor="visitor.visitorId"
          :name="visitor.name"
          :lastname="visitor.lastname"
          :ci="visitor.ci"
          :office="visitor.office"
          :building="visitor.building"
          :flat="visitor.flat"
          :photo="visitor.photo"
          @close="closeVisit"
          @check="checkVisitor">
      </visitor-card>
    </div>
  </div>

</template>

<script>
import SearchInput from "../components/SearchInput.vue";
import VisitorCard from "../components/VisitorCard.vue";
import InfoMessage from "../components/InfoMessage.vue";

export default {
  name: "ActiveVisitor",
  components: {
    SearchInput,
    VisitorCard,
    InfoMessage
  },
  data() {
    return {
      visits: null,
      message: '',
      showMessage: false,
    };
  },
  methods: {
    closeTab() {
      this.showMessage = false;
    },
    logOut() {
      localStorage.clear()
      this.$router.push("/")
    },
    async checkVisitor(visitorId) {
      const user = localStorage.getItem('user_id')
      console.log(user)
      try {
        const response = await this.axios.post("/check/manual", {'visitor': visitorId, 'user': user})
        if (response.status === 201) {
          this.message = "Visitante verificado con exito"
          this.showMessage = true
        }
      } catch (error) {
        if (error.response.status === 403) {
          this.message = "No tiene permisos necesarios"
          this.showMessage = true
        } else if (error.response.status === 401) {
          this.logOut()
        }

      }


    },
    async closeVisit(id) {
      try {
        const response = await this.axios.put(`/visits/close/${id}/`);
        if (response.status === 200) {
          await this.loadActiveVisits()
        }
      } catch (error) {
        if (error.response.status === 401) {
          this.logOut()
        }

      }

    },

    async loadActiveVisits() {
      try {
        const response = await this.axios.get("/visits/active/");
        if (response.status === 200) {
          this.visits = response.data;
          console.log(this.visitors)
        }
      } catch (error) {
        if (error.response.status === 401) {
          this.logOut()
        } else if (error.response.status > 401) {
          this.message = "Error en el Servidor"
          this.showMessage = true
        }

      }
    }
  },
  mounted() {
    this.loadActiveVisits();
  }

};
</script>

<style scoped>

.title-local {
  @apply mt-[60px] font-subtitle font-medium text-black text-2xl  text-center
}

.visitor-layout {
  @apply flex flex-row flex-wrap gap-x-12 gap-y-4  w-[1306px] mx-auto mt-7
}

</style>