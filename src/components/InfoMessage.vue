<template>
  <div class="info-tab" :class="isDisplay  ? 'fixed': 'hidden'">
    <div class="body-tab">
      <slot></slot>
      <button @click="$emit('closeTab')"><img src="../assets/svg/close-white.svg" alt=""></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoMessage",
  props: ['isDisplay'],
  emits: ['closeTab'],
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>

.info-tab {
  position: fixed;
  top: 165px;
  left: 75%;
  box-shadow: 0px 4px 4px 0px #00000040;;
  border: 1px solid white;
  border-radius: 5px;
  opacity: 74%;
  z-index: 10000;
  @apply w-[300px] h-[40px] p-[11px] font-subtitle font-bold text-sm text-white  bg-firered
}

.body-tab {

  @apply flex flex-row flex-nowrap justify-between items-center
}

</style>