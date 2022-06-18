<template>
  <div class="form-control-long relative">
    <label :for="name" class="labelField">{{name}}</label>
    <input :type="inputType" :name="name"  @input="$emit('update:modelValue',$event.target.value)" :value="modelValue" :id="name" class="inputField" />
    <slot name="default"></slot>
  </div>
</template>

<script>
export default {
  name: "EntryLong",
  props:['name','inputType','modelValue'],
  data() {
    return {}
  }
}
</script>

<style scoped>

input {
  border-radius: 5px;
  @apply w-[530px] h-[40px] bg-white font-content px-2 focus:border-2 border-oran outline-none
}

label {
  @apply font-content font-normal text-sm text-black mb-[12px] block
}


</style>