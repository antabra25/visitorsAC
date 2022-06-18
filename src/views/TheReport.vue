<template>

  <div class="main-content-wrapper">
    <h1 class="title">Reporte de Visitas</h1>

    <form action="sendReport" class="form">
      <entry-select name="Edificio"></entry-select>
      <entry-select name="Oficina"></entry-select>
      <entry-long name="Nombre Funcionario"></entry-long>
      <div class="flex-date">
        <entry-small name="Desde" input-type="date"></entry-small>
        <entry-small name="Hasta" input-type="date"></entry-small>
      </div>
      <base-button class="register-btn">Generar</base-button>
    </form>
  </div>
</template>

<script>
import EntryLong from "../components/EntryLong.vue";
import EntrySelect from "../components/EntrySelect.vue";
import EntrySmall from "../components/EntrySmall.vue";
import BaseButton from "../components/BaseButton.vue";

export default {
  name: "TheReport",
  components: {
    EntryLong,
    EntrySelect,
    EntrySmall,
    BaseButton


  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.flex-date {
  column-gap: 32px;
  @apply flex flex-row flex-nowrap mt-[25px];
}

.body-form {
  @apply flex flex-col flex-nowrap mx-auto
}
</style>