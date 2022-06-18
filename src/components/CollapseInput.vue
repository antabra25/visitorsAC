<template>
  <div class="collapse-form">
    <div @click="setActiveCollapse" class="collapse-item">
      <h1 class=" ml-[14px] w-[65px]">
        <slot name="title">

        </slot>
      </h1>
      <img v-if="!isCollapseActive"
           src="../assets/svg/bx-plus.svg"
           alt="icon-dropdown"
           class="icon-plus"
      />
      <img v-if="isCollapseActive"
           src="../assets/svg/bx-minus.svg"
           alt="icon-dropdown"
           class="icon-plus"
      />
    </div>
    <div :class="isCollapseActive ?'collapse-body':'hidden'">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
import EntrySmall from "./EntrySmall.vue";

export default {
  name: "DropdownInput",
  components: {
    EntrySmall
  },
  data() {
    return {
      isCollapseActive: false,
    };
  },
  methods: {
    setActiveCollapse() {
      this.isCollapseActive = !this.isCollapseActive;
    }
  }
}
</script>

<style scoped>

.collapse-form {
  @apply relative w-[531px]
}

.collapse-item {
  border-radius: 5px 5px 0px 0px;
  @apply bg-dirtydark w-[531px] h-[34px] font-content text-sm font-normal flex flex-row   items-center
}

.collapse-body {

  @apply w-[531px] h-[180px] bg-dirtydark flex flex-row flex-wrap gap-x-2 px-[10px]
}

.icon-plus {

  @apply w-[24px] h-[24px] ml-[427px]
}

</style>