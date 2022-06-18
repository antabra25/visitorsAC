<template>
  <div class="select-control">
    <label :for="name">{{ name }}</label>
    <select :name="name" :id="name" v-model="optionValue" @change="$emit('selectValue',optionValue,name)">
      <option v-for="option in options" :value="option">{{ option.name }}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: "EntrySelect",
  props: ['name', 'options'],
  emits: ['selectValue'],
  data() {
    return {
      optionValue: ""
    }
  }
}
</script>

<style scoped>

label {
  @apply font-content font-normal text-sm text-black mb-[12px] block
}

select {
  border-radius: 5px;
  @apply w-[530px] h-[40px] bg-white font-content outline-none focus:border-2 border-oran
}

option {
  @apply font-content text-sm font-bold
}

.select-control {
  @apply mb-[12px]
}

</style>