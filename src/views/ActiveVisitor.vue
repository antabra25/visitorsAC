<template>

  <div class="main-content-wrapper" >
    <info-message :is-display="showMessage">{{message}}</info-message>
    <h1 class="title-local">Visitantes Activos</h1>
    <search-input name="Buscar" class="ml-[78px] mt-8"></search-input>
    <div class="visitor-layout">
      <visitor-card
        v-for="visitor in visitors"
        :key="visitor.ci"
        :name="visitor.name"
        :lastname="visitor.lastname"
        :ci="visitor.ci"
        :office="visitor.office"
        :building="visitor.building"
        :flat="visitor.flat"
        :photo="visitor.photo">
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
      visitors: null,
      message:'',
      showMessage:false,
    };
  },
  methods: {
    closeTab() {
      this.showMessage = false;
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
    async loadActiveVisitors() {
      try {
        const response = await this.axios.get("/visits/active/visitors");
        if (response.status === 200) {
          this.visitors = response.data;
          console.log(this.visitors)
        }
      } catch (error) {
        if (error.response.status === 401) {
          this.releaseLocation();
        } else if (error.response.status > 401) {

        }

      }
    }
  },
  mounted() {
    this.loadActiveVisitors();
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