<template>
  <div class="card">
    <div class="card-body">
      <h1 class="card-title">Visitante</h1>
      <div class="layout-content">
        <div class="card-avatar ">
          <img :src="photo" alt="">
        </div>
        <div class="info">
          <h2>{{name}} {{lastname}}</h2>
          <h2>{{ci}}</h2>
          <h2>Edif:{{building}}</h2>
          <h2>Oficina:{{office}}</h2>
          <h2>Piso: {{flat}}</h2>
        </div>
        <div class="controls-btn items-end">
          <edit-button></edit-button>
          <delete-button></delete-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import EditButton from "./EditButton.vue";
import DeleteButton from "./DeleteButton.vue";

export default {
  name: "VisitorCard",
  props:['name','lastname','ci','office','building','flat','photo'],
  components: {
    DeleteButton,
    EditButton
  }
};
</script>

<style scoped>

.card {
  @apply w-[400px] h-[180px] rounded-md bg-royal shadow-lg shadow-slate-400
}

.card-body {
  @apply pt-1.5 pb-[23px] px-[14px]
}

.card-title {
  @apply font-subtitle text-lg font-medium text-white text-center  font-medium
}

.controls-btn {
  @apply flex flex-row gap-x-3.5
}

.card-avatar {
  mix-blend-mode: normal;
  border-radius: 3px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  @apply h-[120px] w-[120px]
}

.info {
  @apply flex flex-col text-white font-content text-base
}

.layout-content {
  @apply flex flex-row flex-nowrap gap-x-4
}

</style>