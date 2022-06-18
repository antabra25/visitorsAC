<template>
  <button>
    {{name}}
    <slot></slot>
  </button>

</template>

<script>
export default {
  name: "SmallButton",
  props:['name'],
  data (){
    return {

    }
  }
}
</script>

<style scoped>

button {
  border-radius: 15px;
  font-size: 10px;
  @apply w-16 h-8 font-bold font-title text-white bg-deepblue
}



</style>