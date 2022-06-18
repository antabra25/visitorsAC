<template>
  <footer>
    <div class="bg-deepblue  box-border text-white flex justify-first w-full h-32 ">
      <div class="flex-col mb-[24px] mt-[27px] ml-[49px] w-[286px] mr-[26px] ">
        <p class="text-2xl  font-title font-bold ">{{ logoName }}</p>
        <p class="text-sm font-subtitle font-bold leading-[18px]">{{ brandName }}</p>
      </div>
      <div class="flex-col font-subtitle mt-[27px] mb-[24px] ml-[36px] font-semibold text-sm leading-[18px] ">
        <p>{{ office }}</p>
        <p>{{ projectName }}</p>
        <p>{{ gerYear }} {{ address }}</p>
        <p>{{ phones }}</p>
      </div>
    </div>
  </footer>
</template>

<script>
import {computed} from "vue";

export default {
  data() {
    return {
      logoName: 'MPPEFC',
      brandName: 'Minsiterio del Poder Popular de Economía, Finanzas y Comercio Exterior',
      office: 'Oficina de Seguridad y Proteccion Integral',
      projectName: 'Control Acceso Visitantes',
      phones: 'Ext: 1040-1093-6564',
      address: ',Caracas , Venezuela'
    }

  },
  computed: {
    gerYear() {
      return new Date().getFullYear()
    }
  }
};
</script>

<style scoped>

footer {

  width: 100%;
}

</style>