<template>
  <div class="control-form">
    <label :for="name">{{ name }}:</label>
    <input :id="name" :type="inputType" :value="modelValue" @input="$emit('update:modelValue',$event.target.value)" autocomplete="off" disabled/>
  </div>
</template>
<script>
export default {
  name: "EntrySmallOff",
  props: ['name','modelValue','inputType'],
  emits:['update:modelValue'],
  data() {
    return {}
  }
}
</script>

<style scoped>

input {
  border-radius: 5px;
  outline: none;
  @apply w-[250px] h-[40px] bg-white font-content px-1.5 focus:border-2 border-oran
}

label {
  @apply font-content font-normal text-sm text-black mb-[12px] block
}

.control-form {
  @apply mb-[18px]
}

input:disabled {
  background: rgba(196, 196, 196, 0.33);

}
</style>