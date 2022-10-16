<template>
  <div class="main-content-wrapper border-box">
    <h1 class="title my-[52px] text-center">Control de Acceso </h1>
    <section class="info-row">

      <div class="info-display relative">
        <h2 class="info-item text-4xl">Visitantes Activos : {{ activated }}</h2>
        <h3 class="info-item text-lg">Cerradas : {{ closed }}</h3>

        <div class="box-time absolute top-[262px] left-[451px] flex flex-row justify-center items-center">
          <img src="../assets/svg/watch.svg" alt="svg watch" class="icon-watch">
          <p class="text-white font-subtitle font-medium text-5xl ">{{ hour }}:{{ minutes }}:{{ seconds }}</p>
        </div>
      </div>
      <div class="brand-vector">
        <img src="../assets/carnet.png" alt="">
      </div>

    </section>
  </div>

</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      amount: null,
      closed: null,
      activated: null,
      hour: null,
      minutes: null,
      seconds: null,
    }
  },
  created() {
    this.getTime();
  },
  methods: {
    async getResume() {
      try {
        const response = await this.axios.get('/home/resume/');
        if (response.status === 200) {
          this.closed = response.data.closed;
          this.activated = response.data.activated;
        }
      } catch (error) {
        console.log(error);
      }
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
    getTime() {
      const time = setInterval(() => {
        this.hour = new Date().getHours();
        this.minutes = new Date().getMinutes();
        this.seconds = new Date().getSeconds();

      }, 1000);

    }
  },
  mounted() {
    this.getResume()
  }
}
</script>

<style scoped>

.info-row {
  @apply flex flex-row flex-nowrap justify-center items-center
}

.info-display {
  width: 730px;
  height: 400px;
  border-radius: 5px;
  mix-blend-mode: normal;
  padding-left: 48px;
  padding-top: 42px;
  @apply bg-royal shadow-md
}

.info-item {
  @apply font-subtitle font-medium text-white mb-[14px]
}

.box-time {
  width: 264px;
  height: 130px;
  border-radius: 5px;
  @apply border-2 bg-transparent border-oran mr-1
}

.brand-vector {
  width: 400px;
  height: 400px;
  border-radius: 5px;
  margin-left: 155px;
}

.icon-watch {
  height: 64px;
  width: 64px;
  margin-right: 21px;
}
</style>